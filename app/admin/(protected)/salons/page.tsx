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
import { Switch } from '@/components/ui/switch'
import {
  Plus,
  Search,
  Edit,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Store,
} from 'lucide-react'
import { useSalonStore } from '@/stores/salonStore'   // <-- renamed store
import { useAuthStore } from '@/stores/useAuthStore'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import Image from 'next/image'
import { cn } from '@/lib/utils'

// ---------- Validation ----------
const createSalonSchema = z.object({
  name: z.string().min(1, 'Salon name is required').max(100),
  description: z.string().min(5, 'Description is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Phone ≥ 10 digits').max(15),
  address: z.string().min(5, 'Address is required'),
  bannerImage: z.string().url('Invalid URL'),
})

const editSalonSchema = createSalonSchema.extend({
  isActive: z.boolean(),
})

type CreateSalonForm = z.infer<typeof createSalonSchema>
type EditSalonForm = z.infer<typeof editSalonSchema>

interface Salon {
  id: string
  name: string
  description: string
  email: string
  phone: string
  address: string
  bannerImage: string
  isActive: boolean
}

// -------------------------------------------------
export default function SalonsPage() {
  const { user: authUser } = useAuthStore()
  const {
    salons,
    isLoading,
    currentPage,
    totalPages,
    totalSalons,
    fetchSalons,
    addSalon,
    updateSalon,
    changeSalonStatus,
  } = useSalonStore()

  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSalon, setEditingSalon] = useState<Salon | null>(null)
  const [pageSize, setPageSize] = useState<string>('10')
  const { toast } = useToast()

  // ---------- Forms ----------
  const createForm = useForm<CreateSalonForm>({
    resolver: zodResolver(createSalonSchema),
    defaultValues: { name: '', description: '', email: '', phone: '', address: '', bannerImage: '' },
  })

  const editForm = useForm<EditSalonForm>({
    resolver: zodResolver(editSalonSchema),
    defaultValues: { name: '', description: '', email: '', phone: '', address: '', bannerImage: '', isActive: true },
  })

  // ---------- Debounce search ----------
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearchTerm(searchTerm), 700)
    return () => clearTimeout(t)
  }, [searchTerm])

  // ---------- Load on search / pageSize ----------
  useEffect(() => {
    const per = pageSize === 'all' ? 'all' : Number(pageSize)
    fetchSalons(1, per, debouncedSearchTerm)
  }, [debouncedSearchTerm, pageSize, fetchSalons])

  // ---------- Load on page change ----------
  useEffect(() => {
    if (currentPage > 1) {
      const per = pageSize === 'all' ? 'all' : Number(pageSize)
      fetchSalons(currentPage, per, debouncedSearchTerm)
    }
  }, [currentPage, fetchSalons])

  // ---------- RBAC ----------
  if (authUser?.role?.name !== 'Admin') {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="max-w-md">
          <CardHeader>
            <h2 className="text-2xl font-bold">Access Denied</h2>
            <p className="text-muted-foreground">
              Only administrators can manage salons.
            </p>
          </CardHeader>
        </Card>
      </div>
    )
  }

  // ---------- Helpers ----------
  const refetchCurrent = () => {
    const per = pageSize === 'all' ? 'all' : Number(pageSize)
    fetchSalons(currentPage, per, debouncedSearchTerm)
  }

  const showError = (e: any) => {
    const msgs = (e.message || 'Operation failed').split('\n')
    msgs.forEach((m: string) =>
      toast({ variant: 'destructive', title: 'Error', description: m })
    )
  }

  const handleCreate = async (data: CreateSalonForm) => {
    try {
      const r = await addSalon(data)
      toast({ variant: 'default', title: 'Success', description: r.message })
      setIsDialogOpen(false)
      createForm.reset()
      refetchCurrent()
    } catch (e: any) { showError(e) }
  }

  const handleEdit = async (data: EditSalonForm) => {
    if (!editingSalon) return
    try {
      const r = await updateSalon(editingSalon.id, data)
      toast({ variant: 'default', title: 'Success', description: r.message })
      setIsDialogOpen(false)
      editForm.reset()
      setEditingSalon(null)
      refetchCurrent()
    } catch (e: any) { showError(e) }
  }

  const openEdit = (salon: Salon) => {
    setEditingSalon(salon)
    editForm.reset({
      name: salon.name,
      description: salon.description,
      email: salon.email,
      phone: salon.phone,
      address: salon.address,
      bannerImage: salon.bannerImage,
      isActive: salon.isActive,
    })
    setIsDialogOpen(true)
  }

  const toggleStatus = async (id: string, on: boolean) => {
    try {
      const r = await changeSalonStatus(id, on)
      toast({ variant: 'default', title: 'Success', description: r.message })
      refetchCurrent()
    } catch (e: any) { showError(e) }
  }

  const changePage = (p: number) => {
    if (p >= 1 && p <= totalPages) {
      const per = pageSize === 'all' ? 'all' : Number(pageSize)
      fetchSalons(p, per, debouncedSearchTerm)
    }
  }

  const isCreate = !editingSalon
  const perPage = pageSize === 'all' ? (totalSalons || salons.length || 10) : Number(pageSize)
  const start = totalSalons === 0 ? 0 : (currentPage - 1) * perPage + 1
  const end = Math.min(currentPage * perPage, totalSalons)

  // -------------------------------------------------
  return (
    <div className={cn('space-y-6', 'bg-white text-black dark:bg-black dark:text-white')}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex gap-2 text-3xl font-bold">
            <Store className="h-8 w-8" />
            Salon Management
          </h1>
          <p className="text-muted-foreground">Add, edit and control salon branches.</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setIsDialogOpen(true)
                createForm.reset()
                setEditingSalon(null)
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Salon
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{isCreate ? 'Add New Salon' : 'Edit Salon'}</DialogTitle>
              <DialogDescription>
                {isCreate ? 'Enter salon details' : 'Update salon information'}
              </DialogDescription>
            </DialogHeader>

            <form
              onSubmit={isCreate ? createForm.handleSubmit(handleCreate) : editForm.handleSubmit(handleEdit)}
              className="space-y-4"
            >
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Salon Name</Label>
                <Input
                  id="name"
                  {...(isCreate ? createForm.register('name') : editForm.register('name'))}
                  className={cn({
                    'focus-visible:ring-red-500':
                      isCreate
                        ? !!createForm.formState.errors.name
                        : !!editForm.formState.errors.name,
                  })}
                />
                {(isCreate ? createForm.formState.errors.name?.message : editForm.formState.errors.name?.message) && (
                  <p className="text-sm text-red-500">
                    {isCreate ? createForm.formState.errors.name?.message : editForm.formState.errors.name?.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  {...(isCreate ? createForm.register('description') : editForm.register('description'))}
                  className={cn({
                    'focus-visible:ring-red-500':
                      isCreate
                        ? !!createForm.formState.errors.description
                        : !!editForm.formState.errors.description,
                  })}
                />
                {(isCreate ? createForm.formState.errors.description?.message : editForm.formState.errors.description?.message) && (
                  <p className="text-sm text-red-500">
                    {isCreate ? createForm.formState.errors.description?.message : editForm.formState.errors.description?.message}
                  </p>
                )}
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...(isCreate ? createForm.register('email') : editForm.register('email'))}
                    className={cn({
                      'focus-visible:ring-red-500':
                        isCreate
                          ? !!createForm.formState.errors.email
                          : !!editForm.formState.errors.email,
                    })}
                  />
                  {(isCreate ? createForm.formState.errors.email?.message : editForm.formState.errors.email?.message) && (
                    <p className="text-sm text-red-500">
                      {isCreate ? createForm.formState.errors.email?.message : editForm.formState.errors.email?.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...(isCreate ? createForm.register('phone') : editForm.register('phone'))}
                    className={cn({
                      'focus-visible:ring-red-500':
                        isCreate
                          ? !!createForm.formState.errors.phone
                          : !!editForm.formState.errors.phone,
                    })}
                  />
                  {(isCreate ? createForm.formState.errors.phone?.message : editForm.formState.errors.phone?.message) && (
                    <p className="text-sm text-red-500">
                      {isCreate ? createForm.formState.errors.phone?.message : editForm.formState.errors.phone?.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  {...(isCreate ? createForm.register('address') : editForm.register('address'))}
                  className={cn({
                    'focus-visible:ring-red-500':
                      isCreate
                        ? !!createForm.formState.errors.address
                        : !!editForm.formState.errors.address,
                  })}
                />
                {(isCreate ? createForm.formState.errors.address?.message : editForm.formState.errors.address?.message) && (
                  <p className="text-sm text-red-500">
                    {isCreate ? createForm.formState.errors.address?.message : editForm.formState.errors.address?.message}
                  </p>
                )}
              </div>

              {/* Banner Image */}
              <div className="space-y-2">
                <Label htmlFor="bannerImage">Banner Image</Label>
                <Input
                  id="bannerImage"
                  type="file"
                  {...(isCreate ? createForm.register('bannerImage') : editForm.register('bannerImage'))}
                  className={cn({
                    'focus-visible:ring-red-500':
                      isCreate
                        ? !!createForm.formState.errors.bannerImage
                        : !!editForm.formState.errors.bannerImage,
                  })}
                />
                {(isCreate ? createForm.formState.errors.bannerImage?.message : editForm.formState.errors.bannerImage?.message) && (
                  <p className="text-sm text-red-500">
                    {isCreate ? createForm.formState.errors.bannerImage?.message : editForm.formState.errors.bannerImage?.message}
                  </p>
                )}
              </div>

              {/* Active toggle – only edit */}
              {!isCreate && (
                <div className="flex items-center justify-between">
                  <Label htmlFor="isActive" className="flex items-center gap-2">
                    Active
                  </Label>
                  <Switch
                    id="isActive"
                    checked={editForm.watch('isActive')}
                    onCheckedChange={(c) => editForm.setValue('isActive', c)}
                  />
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Processing...' : isCreate ? 'Add' : 'Update'} Salon
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
              <div className="text-sm text-muted-foreground">Show</div>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value)}
                className="h-9 w-[80px] rounded border px-2 text-sm"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="all">All</option>
              </select>
            </div>

            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, phone..."
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
              <div className="text-lg text-gray-700">Loading Salons...</div>
            </div>
          ) : salons.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm ? 'No salons match your search.' : 'No salons found.'}
            </div>
          ) : (
            <>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Banner Image</TableHead>
                      <TableHead>Salon Name</TableHead>
                      {/* <TableHead>Description</TableHead> */}
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salons.map((s) => (
                      <TableRow key={s.id}>
                       
                        <TableCell> <Image src={s.bannerImage} alt={s.name} width={50} height={50} /></TableCell>
                        <TableCell className="font-medium">{s.name}</TableCell>
                        {/* <TableCell>{s.description}</TableCell> */}
                        <TableCell>{s.email}</TableCell>
                        <TableCell>{s.phone || '-'}</TableCell>
                        <TableCell className="max-w-xs truncate">{s.address}</TableCell>
                        <TableCell>
                          <span
                            className={cn(
                              'px-2 py-1 rounded-full text-xs',
                              s.isActive
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            )}
                          >
                            {s.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2 items-center">
                            {s.isActive && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openEdit(s)}
                                aria-label={`Edit ${s.name}`}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                            )}
                            <Switch
                              checked={s.isActive}
                              onCheckedChange={(c) => toggleStatus(s.id, c)}
                              aria-label={`Toggle ${s.name}`}
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
                    Showing {start} to {end} of {totalSalons} results
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => changePage(1)}
                      disabled={currentPage === 1}
                    >
                      <ChevronsLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => changePage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>

                    <select
                      value={currentPage}
                      onChange={(e) => changePage(Number(e.target.value))}
                      className="h-9 w-[60px] rounded border px-2 text-sm"
                    >
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => changePage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => changePage(totalPages)}
                      disabled={currentPage === totalPages}
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