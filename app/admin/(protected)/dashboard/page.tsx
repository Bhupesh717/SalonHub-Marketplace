'use client'

import { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, School, BookOpen, TrendingUp } from 'lucide-react'
import { useAuthStore } from '@/stores/useAuthStore'
import { useStudentStore } from '@/stores/studentStore'
import { useSchoolStore } from '@/stores/schoolStore'

export default function DashboardPage() {
    const { user } = useAuthStore()
    console.log('Dashboard user:', user) // Debug log
    const { students, fetchStudents } = useStudentStore()
    const { schools, fetchSchools } = useSchoolStore()





    useEffect(() => {
        if (user?.role?.name === 'Admin') {
            fetchSchools()
        }
        fetchStudents()
    }, [user, fetchSchools, fetchStudents])

    const stats = [
        {
            title: 'Total Students',
            value: students.length.toString(),
            icon: Users,
            description: 'Enrolled students',
            show: true,
        },
        {
            title: 'Total Schools',
            value: schools.length.toString(),
            icon: School,
            description: 'Partner schools',
            show: user?.role?.name === 'Admin',
        },
        {
            title: 'Active Courses',
            value: '24',
            icon: BookOpen,
            description: 'Available courses',
            show: true,
        },
        {
            title: 'Completion Rate',
            value: '87%',
            icon: TrendingUp,
            description: 'Average completion',
            show: true,
        },
    ]

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                <p className="text-muted-foreground">
                    Welcome back, {user?.name || user?.email}! {user?.role?.name === 'Admin' ? '(Administrator)' : '(School)'}
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.filter(stat => stat.show).map((stat) => {
                    const Icon = stat.icon
                    return (
                        <Card key={stat.title}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {stat.title}
                                </CardTitle>
                                <Icon className="w-4 h-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {stat.description}
                                </p>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Students</CardTitle>
                        <CardDescription>Latest student enrollments</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {students.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No students found</p>
                        ) : (
                            <div className="space-y-4">
                                {students.slice(0, 5).map((student) => (
                                    <div key={student.id} className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium">{student.name}</p>
                                            <p className="text-xs text-muted-foreground">{student.email}</p>
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            Grade {student.grade}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {user?.role?.name === 'Admin' && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Partner Schools</CardTitle>
                            <CardDescription>Registered educational institutions</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {schools.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No schools found</p>
                            ) : (
                                <div className="space-y-4">
                                    {schools.slice(0, 5).map((school) => (
                                        <div key={school.id} className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium">{school.name}</p>
                                                <p className="text-xs text-muted-foreground">{school.email}</p>
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {school.address}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
