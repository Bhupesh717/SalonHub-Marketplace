'use client'

import { useEffect, useState } from 'react'
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
import { Plus, Search, Edit, Trash2 } from 'lucide-react'
import { useSchoolStore } from '@/stores/schoolStore'
import { useAuthStore } from '@/stores/useAuthStore'

import { toast } from 'sonner'

export default function SchoolsPage() {
    const { user } = useAuthStore()
    const { schools, isLoading, fetchSchools, addSchool, updateSchool, deleteSchool } = useSchoolStore()
    const [searchTerm, setSearchTerm] = useState('')
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingSchool, setEditingSchool] = useState<any>(null)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
    })

    useEffect(() => {
        if (user?.role?.name === 'Admin') {
            toast.error('Access denied. Admin only.')
            return
        }
        fetchSchools()
    }, [user, fetchSchools])

    if (user?.role?.name != 'Admin') {
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

    const filteredSchools = schools.filter(
        (school) =>
            school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            school.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            if (editingSchool) {
                await updateSchool(editingSchool.id, formData)
                toast.success('School updated successfully')
            } else {
                await addSchool(formData)
                toast.success('School added successfully')
            }
            setIsDialogOpen(false)
            resetForm()
        } catch (error: any) {
            toast.error(error.message || 'Operation failed')
        }
    }

    const handleEdit = (school: any) => {
        setEditingSchool(school)
        setFormData({
            name: school.name,
            email: school.email,
            address: school.address || '',
            phone: school.phone || '',
        })
        setIsDialogOpen(true)
    }

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this school?')) {
            try {
                await deleteSchool(id)
                toast.success('School deleted successfully')
            } catch (error: any) {
                toast.error(error.message || 'Failed to delete school')
            }
        }
    }

    const resetForm = () => {
        setFormData({ name: '', email: '', address: '', phone: '' })
        setEditingSchool(null)
    }

    const handleDialogClose = (open: boolean) => {
        setIsDialogOpen(open)
        if (!open) {
            resetForm()
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Schools</h1>
                    <p className="text-muted-foreground">Manage partner schools and institutions</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Add School
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingSchool ? 'Edit School' : 'Add New School'}</DialogTitle>
                            <DialogDescription>
                                {editingSchool ? 'Update school information' : 'Enter school details below'}
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">School Name</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    id="address"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                {editingSchool ? 'Update' : 'Add'} School
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search schools..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="text-center py-8">Loading schools...</div>
                    ) : filteredSchools.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            No schools found
                        </div>
                    ) : (
                        <div className="border rounded-lg">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Address</TableHead>
                                        <TableHead>Phone</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredSchools.map((school) => (
                                        <TableRow key={school.id}>
                                            <TableCell className="font-medium">{school.name}</TableCell>
                                            <TableCell>{school.email}</TableCell>
                                            <TableCell>{school.address || '-'}</TableCell>
                                            <TableCell>{school.phone || '-'}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleEdit(school)}
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleDelete(school.id)}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
