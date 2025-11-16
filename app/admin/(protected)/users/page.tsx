'use client'
import { useEffect, useState, useMemo } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
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
import { Plus, Search, Edit, Trash2, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { useUserStore } from '@/stores/userStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { useToast } from "@/hooks/use-toast"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { cn } from '@/lib/utils'

// Validation Schema
const createUserSchema = z.object({
    name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
    email: z.string().email('Invalid email').min(1, 'Email is required'),
    mobile: z.string().min(10, 'Mobile must be at least 10 digits').max(15, 'Mobile too long'),
    department_id: z.string().min(1, 'Department is required'),
    role_id: z.string().min(1, 'Role is required'),
})

const editUserSchema = createUserSchema.extend({
    isActive: z.boolean(),
})

type CreateUserForm = z.infer<typeof createUserSchema>
type EditUserForm = z.infer<typeof editUserSchema>

interface User {
    id: string
    name: string
    email: string
    mobile: string
    department: { id: string; name: string }
    role: { id: string; name: string }
    isActive: boolean
}

interface Department {
    id: string
    name: string
    is_active: number
    deleted_at: string | null
    created_at: string
    updated_at: string
}

interface Role {
    id: string
    name: string
    department_id: string
    is_active: number
    deleted_at: string | null
    created_at: string | null
    updated_at: string | null
}

export default function UsersPage() {
    const { user: authUser } = useAuthStore()
    const {
        users,
        departments,
        roles,
        isLoading,
        currentPage,
        totalPages,
        totalUsers,
        fetchUsers,
        fetchDepartments,
        fetchRolesByDepartment,
        addUser,
        updateUser,
        deleteUser,
        changeUserStatus,
    } = useUserStore()

    const [searchTerm, setSearchTerm] = useState('')
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingUser, setEditingUser] = useState<User | null>(null)
    const [selectedDepartmentId, setSelectedDepartmentId] = useState('')
    const [pageSize, setPageSize] = useState<string>('10')

    const { toast } = useToast()

    // Create Form
    const createForm = useForm<CreateUserForm>({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            name: '',
            email: '',
            mobile: '',
            department_id: '',
            role_id: '',
        },
    })

    // Edit Form
    const editForm = useForm<EditUserForm>({
        resolver: zodResolver(editUserSchema),
        defaultValues: {
            name: '',
            email: '',
            mobile: '',
            department_id: '',
            role_id: '',
            isActive: true,
        },
    })

    // Fetch departments on mount (admin only)
    useEffect(() => {
        if (authUser?.role?.name === 'Admin') {
            fetchDepartments()
        }
    }, [authUser, fetchDepartments])

    // Debounce the search term
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm)
        }, 700)
        return () => clearTimeout(timer)
    }, [searchTerm])

    // Fetch users when debounced search or pageSize changes
    useEffect(() => {
        const perPageNumber = pageSize === 'all' ? 'all' : Number(pageSize)
        fetchUsers(1, perPageNumber, debouncedSearchTerm)
    }, [debouncedSearchTerm, pageSize])

    // Fetch users when page changes (but not on initial mount or search/pageSize changes)
    useEffect(() => {
        if (currentPage > 1) {
            const perPageNumber = pageSize === 'all' ? 'all' : Number(pageSize)
            fetchUsers(currentPage, perPageNumber, debouncedSearchTerm)
        }
    }, [currentPage])

    // RBAC: Deny non-admins
    if (authUser?.role?.name !== 'Admin') {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Card className="max-w-md">
                    <CardHeader>
                        <h2 className="text-2xl font-bold">Access Denied</h2>
                        <p className="text-muted-foreground">This page is only accessible to administrators.</p>
                    </CardHeader>
                </Card>
            </div>
        )
    }

    // Filter active departments and roles
    const activeDepartments = useMemo(() =>
        departments.filter((dept: Department) => dept.is_active === 1),
        [departments]
    )

    const activeRoles = useMemo(() =>
        roles.filter((role: Role) => role.is_active === 1),
        [roles]
    )

    const handleCreateSubmit = async (data: CreateUserForm) => {
        try {
            const result = await addUser(data)
            toast({
                variant: "default",
                title: "Success",
                description: result.message,
            })
            setIsDialogOpen(false)
            createForm.reset()
            // Refetch current page after add
            const perPageNumber = pageSize === 'all' ? 'all' : Number(pageSize)
            fetchUsers(currentPage, perPageNumber, debouncedSearchTerm)
        } catch (error: any) {
            const errorMessages = error.message.split('\n')
            errorMessages.forEach((message: string) => {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: message,
                })
            })
        }
    }

    const handleEditSubmit = async (data: EditUserForm) => {
        if (!editingUser) return
        try {
            const result = await updateUser(editingUser.id, data)
            toast({
                variant: "default",
                title: "Success",
                description: result.message,
            })
            setIsDialogOpen(false)
            editForm.reset()
            setEditingUser(null)
            // Refetch current page after update
            const perPageNumber = pageSize === 'all' ? 'all' : Number(pageSize)
            fetchUsers(currentPage, perPageNumber, debouncedSearchTerm)
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message || 'Failed to update user',
            })
        }
    }

    const handleEdit = (user: User) => {
        setEditingUser(user)
        editForm.reset({
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            department_id: user.department.id,
            role_id: user.role.id,
            isActive: user.isActive,
        })
        setSelectedDepartmentId(user.department.id)
        fetchRolesByDepartment(user.department.id)
        setIsDialogOpen(true)
    }

    const handleStatusToggle = async (id: string, newStatus: boolean) => {
        try {
            const result = await changeUserStatus(id, newStatus)
            toast({
                variant: "default",
                title: "Success",
                description: result.message,
            })
            // Refetch current page to update the list
            const perPageNumber = pageSize === 'all' ? 'all' : Number(pageSize)
            fetchUsers(currentPage, perPageNumber, debouncedSearchTerm)
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message || 'Failed to update user status',
            })
        }
    }

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            const perPageNumber = pageSize === 'all' ? 'all' : Number(pageSize)
            fetchUsers(newPage, perPageNumber, debouncedSearchTerm)
        }
    }

    const isCreateMode = !editingUser

    const perPageNumber = pageSize === 'all' ? (totalUsers || users.length || 10) : Number(pageSize)
    const startItem = totalUsers === 0 ? 0 : ((currentPage - 1) * perPageNumber) + 1
    const endItem = Math.min(currentPage * perPageNumber, totalUsers)

    return (
        <div className={cn("space-y-6", "bg-white text-black dark:bg-black dark:text-white")}>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="flex gap-2 text-3xl font-bold text-pink-900">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users h-8 w-8" aria-hidden="true">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                        </svg>
                        User Management
                    </h1>
                    <p className="text-muted-foreground">Manage your organization's users, departments, and roles</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => {
                            setIsDialogOpen(true)
                            createForm.reset()
                            setSelectedDepartmentId('')
                            setEditingUser(null)
                        }}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add User
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] text-pink-950">
                        <DialogHeader>
                            <DialogTitle className='text-pink-900'>{isCreateMode ? 'Add New User' : 'Edit User'}</DialogTitle>
                            <DialogDescription>
                                {isCreateMode ? 'Enter user details below' : 'Update user information'}
                            </DialogDescription>
                        </DialogHeader>
                        <form
                            onSubmit={isCreateMode ? createForm.handleSubmit(handleCreateSubmit) : editForm.handleSubmit(handleEditSubmit)}
                            className="space-y-4"
                        >
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    {...(isCreateMode ? createForm.register('name') : editForm.register('name'))}
                                    className={cn({
                                        'focus-visible:ring-red-500': isCreateMode
                                            ? !!createForm.formState.errors.name
                                            : !!editForm.formState.errors.name,
                                    })}
                                />
                                {((isCreateMode ? createForm.formState.errors.name?.message : editForm.formState.errors.name?.message)) && (
                                    <p className="text-sm text-red-500">
                                        {isCreateMode ? createForm.formState.errors.name?.message : editForm.formState.errors.name?.message}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    {...(isCreateMode ? createForm.register('email') : editForm.register('email'))}
                                    className={cn({
                                        'focus-visible:ring-red-500': isCreateMode
                                            ? !!createForm.formState.errors.email
                                            : !!editForm.formState.errors.email,
                                    })}
                                />
                                {((isCreateMode ? createForm.formState.errors.email?.message : editForm.formState.errors.email?.message)) && (
                                    <p className="text-sm text-red-500">
                                        {isCreateMode ? createForm.formState.errors.email?.message : editForm.formState.errors.email?.message}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="mobile">Mobile</Label>
                                <Input
                                    id="mobile"
                                    type="tel"
                                    {...(isCreateMode ? createForm.register('mobile') : editForm.register('mobile'))}
                                    className={cn({
                                        'focus-visible:ring-red-500': isCreateMode
                                            ? !!createForm.formState.errors.mobile
                                            : !!editForm.formState.errors.mobile,
                                    })}
                                />
                                {((isCreateMode ? createForm.formState.errors.mobile?.message : editForm.formState.errors.mobile?.message)) && (
                                    <p className="text-sm text-red-500">
                                        {isCreateMode ? createForm.formState.errors.mobile?.message : editForm.formState.errors.mobile?.message}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="department">Department</Label>
                                <Select
                                    onValueChange={(value) => {
                                        if (isCreateMode) {
                                            createForm.setValue('department_id', value, { shouldValidate: true })
                                            createForm.setValue('role_id', '', { shouldValidate: false })
                                        } else {
                                            editForm.setValue('department_id', value, { shouldValidate: true })
                                            editForm.setValue('role_id', '', { shouldValidate: false })
                                        }
                                        setSelectedDepartmentId(value)
                                        fetchRolesByDepartment(value)
                                    }}
                                    value={isCreateMode ? createForm.watch('department_id') : editForm.watch('department_id')}
                                >
                                    <SelectTrigger id="department" className={cn({
                                        'border-red-500': isCreateMode
                                            ? !!createForm.formState.errors.department_id
                                            : !!editForm.formState.errors.department_id,
                                    })}>
                                        <SelectValue placeholder="Select department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {activeDepartments.map((dept: Department) => (
                                            <SelectItem key={dept.id} value={dept.id}>
                                                {dept.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {((isCreateMode ? createForm.formState.errors.department_id : editForm.formState.errors.department_id)) && (
                                    <p className="text-sm text-red-500">
                                        Please select a department
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role">Role</Label>
                                <Select
                                    value={isCreateMode ? createForm.watch('role_id') : editForm.watch('role_id')}
                                    onValueChange={(value) => {
                                        if (isCreateMode) {
                                            createForm.setValue('role_id', value, { 
                                                shouldValidate: true, 
                                                shouldDirty: true, 
                                                shouldTouch: true 
                                            })
                                        } else {
                                            editForm.setValue('role_id', value, { 
                                                shouldValidate: true, 
                                                shouldDirty: true, 
                                                shouldTouch: true 
                                            })
                                        }
                                    }}
                                    disabled={!selectedDepartmentId && (isCreateMode ? !createForm.watch('department_id') : !editForm.watch('department_id'))}
                                >
                                    <SelectTrigger id="role" className={cn({
                                        'border-red-500': isCreateMode
                                            ? !!createForm.formState.errors.role_id
                                            : !!editForm.formState.errors.role_id,
                                    })}>
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {activeRoles.length === 0 ? (
                                            <div className="p-2 text-sm text-muted-foreground">
                                                No roles available for this department
                                            </div>
                                        ) : (
                                            activeRoles.map((role: Role) => (
                                                <SelectItem key={role.id} value={role.id}>
                                                    {role.name}
                                                </SelectItem>
                                            ))
                                        )}
                                    </SelectContent>
                                </Select>
                                {((isCreateMode ? createForm.formState.errors.role_id : editForm.formState.errors.role_id)) && (
                                    <p className="text-sm text-red-500">
                                        Please select a role
                                    </p>
                                )}
                            </div>
                            {!isCreateMode && (
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="isActive" className="flex items-center gap-2">
                                            Active
                                        </Label>
                                        <Switch
                                            id="isActive"
                                            checked={editForm.watch('isActive')}
                                            onCheckedChange={(checked) => {
                                                editForm.setValue('isActive', checked, { shouldValidate: true })
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? 'Processing...' : (isCreateMode ? 'Add' : 'Update')} User
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="text-sm text-muted-foreground">Show</div>
                            <Select
                                value={pageSize}
                                onValueChange={(val) => setPageSize(val)}
                            >
                                <SelectTrigger className="w-[80px] h-9 text-gray-900">
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
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search users by name, email, or mobile..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                                aria-label="Search users"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <img
                                src="/loader.svg"
                                alt="Loading icon"
                                className="w-20 h-20 mb-2"
                            />
                            <div className="text-lg text-gray-700">
                                Loading Users...
                            </div>
                        </div>
                    ) : users.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            {searchTerm ? 'No users match your search.' : 'No users found.'}
                        </div>
                    ) : (
                        <>
                            <div className="border rounded-lg overflow-hidden">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Mobile</TableHead>
                                            <TableHead>Department</TableHead>
                                            <TableHead>Role</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {users.map((user: User) => (
                                            <TableRow key={user.id}>
                                                <TableCell className="font-medium">{user.name}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>{user.mobile || '-'}</TableCell>
                                                <TableCell>{user.department.name}</TableCell>
                                                <TableCell>{user.role.name}</TableCell>
                                                <TableCell>
                                                    <span className={cn('px-2 py-1 rounded-full text-xs', user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800')}>
                                                        {user.isActive ? 'Active' : 'Inactive'}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2 items-center">
                                                        {user.isActive && (
                                                            <Button
                                                                variant="default"
                                                                size="icon"
                                                                onClick={() => handleEdit(user)}
                                                                aria-label={`Edit ${user.name}`}
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                            </Button>
                                                        )}
                                                        <Switch
                                                            className='w-[60px]'
                                                            checked={user.isActive}
                                                            onCheckedChange={(checked) =>
                                                                handleStatusToggle(user.id, checked)
                                                            }
                                                            aria-label={`Toggle status for ${user.name}`}
                                                        />
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                            {/* Pagination Controls */}
                            {pageSize !== 'all' && totalPages > 1 && (
                                <div className="flex items-center justify-between mt-4">
                                    <div className="text-sm text-muted-foreground">
                                        Showing {startItem} to {endItem} of {totalUsers} results
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handlePageChange(1)}
                                            disabled={currentPage === 1 || isLoading}
                                        >
                                            <ChevronsLeft className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1 || isLoading}
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                        </Button>
                                        <Select value={String(currentPage)} onValueChange={(val) => handlePageChange(Number(val))}>
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
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages || isLoading}
                                        >
                                            <ChevronRight className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handlePageChange(totalPages)}
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