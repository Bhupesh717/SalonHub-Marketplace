'use client'

import { useEffect, useState, useMemo } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import {
  Plus,
  Search,
  Edit,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import { Service, useServiceStore } from '@/stores/serviceStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// 1. Validation schemas (service-specific)
// ---------------------------------------------------------------------------
const serviceSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  description: z.string().min(1, 'Description is required'),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Enter a valid price'),
  duration_minutes: z.string().regex(/^\d+$/, 'Enter minutes as a number'),
  salon_id: z.string().min(1, 'Salon is required'),
})

type ServiceForm = z.infer<typeof serviceSchema>

// ---------------------------------------------------------------------------
// 2. Component
// ---------------------------------------------------------------------------
export default function ServicesPage() {
  const { user: authUser } = useAuthStore()
  const {
    services,
    isLoading,
    currentPage,
    totalPages,
    totalServices,
    fetchServices,
    addService,
    updateService,
    changeServiceStatus,
  } = useServiceStore()

  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [pageSize, setPageSize] = useState<string>('10')
  const { toast } = useToast()

  // -----------------------------------------------------------------------
  // Forms
  // -----------------------------------------------------------------------
  const form = useForm<ServiceForm>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      duration_minutes: '',
      salon_id: '',
    },
  })

  // -----------------------------------------------------------------------
  // Debounce search
  // -----------------------------------------------------------------------
  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearchTerm(searchTerm), 700)
    return () => clearTimeout(id)
  }, [searchTerm])

  // -----------------------------------------------------------------------
  // Fetch on search / page-size change
  // -----------------------------------------------------------------------
  useEffect(() => {
    const perPage = pageSize === 'all' ? 'all' : Number(pageSize)
    fetchServices(1, perPage, debouncedSearchTerm)
  }, [debouncedSearchTerm, pageSize, fetchServices])

  // -----------------------------------------------------------------------
  // Fetch on page change (skip first render)
  // -----------------------------------------------------------------------
  useEffect(() => {
    if (currentPage > 1) {
      const perPage = pageSize === 'all' ? 'all' : Number(pageSize)
      fetchServices(currentPage, perPage, debouncedSearchTerm)
    }
  }, [currentPage, fetchServices, pageSize, debouncedSearchTerm])

  // -----------------------------------------------------------------------
  // RBAC – only Admins can see this page
  // -----------------------------------------------------------------------
  if (authUser?.role?.name !== 'Admin') {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="max-w-md">
          <CardHeader>
            <h2 className="text-2xl font-bold">Access Denied</h2>
            <p className="text-muted-foreground">
              This page is only accessible to administrators.
            </p>
          </CardHeader>
        </Card>
      </div>
    )
  }

  // -----------------------------------------------------------------------
  // Handlers
  // -----------------------------------------------------------------------
  const handleSubmit = async (data: ServiceForm) => {
    try {
      const result = editingService
        ? await updateService(editingService.id, data)
        : await addService(data)

      toast({
        variant: 'default',
        title: 'Success',
        description: result.message,
      })

      closeDialog()
      refetchCurrentPage()
    } catch (err: any) {
      const msg =
        err.response?.data?.errors
          ? Object.values(err.response.data.errors).flat().join('\n')
          : err.message || 'Operation failed'
      toast({ variant: 'destructive', title: 'Error', description: msg })
    }
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
    form.reset()
    setEditingService(null)
  }

  const openEdit = (svc: Service) => {
    setEditingService(svc)
    form.reset({
      name: svc.name,
      description: svc.description,
      price: svc.price,
      duration_minutes: String(svc.duration_minutes),
      salon_id: svc.salon.id,
    })
    setIsDialogOpen(true)
  }

  const toggleStatus = async (id: string, newStatus: boolean) => {
    try {
      const res = await changeServiceStatus(id, newStatus)
      toast({ variant: 'default', title: 'Success', description: res.message })
      refetchCurrentPage()
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: err.message || 'Failed to toggle status',
      })
    }
  }

  const refetchCurrentPage = () => {
    const perPage = pageSize === 'all' ? 'all' : Number(pageSize)
    fetchServices(currentPage, perPage, debouncedSearchTerm)
  }

  const changePage = (p: number) => {
    if (p >= 1 && p <= totalPages) {
      const perPage = pageSize === 'all' ? 'all' : Number(pageSize)
      fetchServices(p, perPage, debouncedSearchTerm)
    }
  }

  // -----------------------------------------------------------------------
  // Pagination helpers
  // -----------------------------------------------------------------------
  const perPageNumber = pageSize === 'all' ? totalServices || 10 : Number(pageSize)
  const startItem = totalServices === 0 ? 0 : (currentPage - 1) * perPageNumber + 1
  const endItem = Math.min(currentPage * perPageNumber, totalServices)

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------
  return (
    <div className={cn('space-y-6', 'bg-white text-black dark:bg-black dark:text-white')}>
      {/* Header + Add button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex gap-2 text-3xl font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-scissors"
            >
              <circle cx="6" cy="6" r="3" />
              <circle cx="18" cy="6" r="3" />
              <path d="M10 12h4" />
              <path d="M8 18h8" />
            </svg>
            Service Management
          </h1>
          <p className="text-muted-foreground">
            Manage your organization’s services, pricing and availability.
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingService(null)
                form.reset()
                setIsDialogOpen(true)
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingService ? 'Edit Service' : 'Add New Service'}</DialogTitle>
              <DialogDescription>
                {editingService ? 'Update service details' : 'Enter service details below'}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              {/* Name */}
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...form.register('name')} />
                {form.formState.errors.name && (
                  <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-1">
                <Label htmlFor="description">Description</Label>
                <Input id="description" {...form.register('description')} />
                {form.formState.errors.description && (
                  <p className="text-sm text-red-500">{form.formState.errors.description.message}</p>
                )}
              </div>

              {/* Price */}
              <div className="space-y-1">
                <Label htmlFor="price">Price ($)</Label>
                <Input id="price" placeholder="45.00" {...form.register('price')} />
                {form.formState.errors.price && (
                  <p className="text-sm text-red-500">{form.formState.errors.price.message}</p>
                )}
              </div>

              {/* Duration */}
              <div className="space-y-1">
                <Label htmlFor="duration_minutes">Duration (minutes)</Label>
                <Input id="duration_minutes" placeholder="60" {...form.register('duration_minutes')} />
                {form.formState.errors.duration_minutes && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.duration_minutes.message}
                  </p>
                )}
              </div>

              {/* Salon – you can replace with real salon list if needed */}
              <div className="space-y-1">
                <Label htmlFor="salon_id">Salon</Label>
                <Select
                  value={form.watch('salon_id')}
                  onValueChange={(v) => form.setValue('salon_id', v, { shouldValidate: true })}
                >
                  <SelectTrigger id="salon_id">
                    <SelectValue placeholder="Select a salon" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Example static salons – replace with API fetch if needed */}
                    <SelectItem value="1">Glow Spa</SelectItem>
                    <SelectItem value="2">Luxury Lounge</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.salon_id && (
                  <p className="text-sm text-red-500">{form.formState.errors.salon_id.message}</p>
                )}
              </div>

              {/* Submit */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Processing...' : editingService ? 'Update' : 'Add'} Service
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            {/* Page size */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Show</span>
              <Select value={pageSize} onValueChange={setPageSize}>
                <SelectTrigger className="w-[80px] h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search services by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <img src="/loader.svg" alt="Loading" className="w-20 h-20 mb-2" />
              <div className="text-lg text-gray-700">Loading Services...</div>
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm ? 'No services match your search.' : 'No services found.'}
            </div>
          ) : (
            <>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Salon</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {services.map((svc) => (
                      <TableRow key={svc.id}>
                        <TableCell className="font-medium">{svc.name}</TableCell>
                        <TableCell>{svc.description}</TableCell>
                        <TableCell>${svc.price}</TableCell>
                        <TableCell>{svc.duration_minutes} min</TableCell>
                        <TableCell>{svc.salon.name}</TableCell>
                        <TableCell>
                          <span
                            className={cn(
                              'px-2 py-1 rounded-full text-xs',
                              svc.isActive
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            )}
                          >
                            {svc.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2 items-center">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEdit(svc)}
                              aria-label={`Edit ${svc.name}`}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>

                            <Switch
                              checked={svc.isActive}
                              onCheckedChange={(c) => toggleStatus(svc.id, c)}
                              aria-label={`Toggle ${svc.name} status`}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {pageSize !== 'all' && totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-muted-foreground">
                    Showing {startItem} to {endItem} of {totalServices} results
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => changePage(1)}
                      disabled={currentPage === 1 || isLoading}
                    >
                      <ChevronsLeft className="w-4 h-4" />
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => changePage(currentPage - 1)}
                      disabled={currentPage === 1 || isLoading}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>

                    <Select
                      value={String(currentPage)}
                      onValueChange={(v) => changePage(Number(v))}
                    >
                      <SelectTrigger className="w-[60px] h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                          <SelectItem key={p} value={String(p)}>
                            {p}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => changePage(currentPage + 1)}
                      disabled={currentPage === totalPages || isLoading}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => changePage(totalPages)}
                      disabled={currentPage === totalPages || isLoading}
                    >
                      <ChevronsRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}