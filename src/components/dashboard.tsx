'use client'

import { useState, useEffect } from 'react'
import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TranscriptGenerator } from '@/components/transcript'
import { calculateGPA } from '@/lib/utils'

interface User {
  id: string
  email: string
  name: string
  role: string
}

interface Student {
  id: string
  regNumber: string
  name: string
  level: number
  department: string
  user?: { name: string; email: string }
}

interface Result {
  id: string
  course: string
  score: number
  grade: string
  semester: number
  year: number
  units: number
  student?: { user: { name: string }; regNumber: string }
}

export function Dashboard({ user }: { user: User }) {
  const [students, setStudents] = useState<Student[]>([])
  const [results, setResults] = useState<Result[]>([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    level: '100',
    studentId: '',
    course: '',
    score: '',
    semester: '1',
    year: new Date().getFullYear().toString(),
    units: '3'
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      if (user.role === 'ADMIN' || user.role === 'TEACHER') {
        const studentsRes = await fetch('/api/students')
        if (studentsRes.ok) {
          const studentsData = await studentsRes.json()
          setStudents(studentsData)
        }
      }
      
      const resultsRes = await fetch('/api/results')
      if (resultsRes.ok) {
        const resultsData = await resultsRes.json()
        setResults(resultsData)
      }
    } catch (error) {
      console.error('Error loading data:', error)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const enrollStudent = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          department: formData.department,
          level: parseInt(formData.level)
        })
      })
      
      if (response.ok) {
        const result = await response.json()
        alert(`Student enrolled successfully! Reg Number: ${result.regNumber}`)
        setFormData(prev => ({ ...prev, name: '', email: '', department: '' }))
        loadData()
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error('Error enrolling student:', error)
      alert('Error enrolling student')
    }
    
    setLoading(false)
  }

  const addResult = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch('/api/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: formData.studentId,
          course: formData.course,
          score: parseFloat(formData.score),
          semester: parseInt(formData.semester),
          year: parseInt(formData.year),
          units: parseInt(formData.units)
        })
      })
      
      if (response.ok) {
        alert('Result added successfully!')
        setFormData(prev => ({ 
          ...prev, 
          studentId: '', 
          course: '', 
          score: '',
          units: '3'
        }))
        loadData()
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error('Error adding result:', error)
      alert('Error adding result')
    }
    
    setLoading(false)
  }

  const promoteStudents = async () => {
    if (!confirm('Are you sure you want to promote all students to the next level?')) return
    
    setLoading(true)
    try {
      // This would be implemented in a real app
      alert('Student promotion feature would be implemented here')
    } catch (error) {
      console.error('Error promoting students:', error)
    }
    setLoading(false)
  }

  const exportResults = () => {
    const csv = [
      ['Course', 'Student', 'Reg Number', 'Score', 'Grade', 'Units', 'Semester', 'Year'],
      ...results.map(r => [
        r.course,
        r.student?.user?.name || 'N/A',
        r.student?.regNumber || 'N/A',
        r.score,
        r.grade,
        r.units,
        r.semester,
        r.year
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'results.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const getStudentResults = () => {
    return results.filter(r => !r.student || user.role === 'STUDENT')
  }

  const getStudentStats = () => {
    const studentResults = getStudentResults()
    const cgpa = calculateGPA(studentResults)
    const totalUnits = studentResults.reduce((sum, r) => sum + r.units, 0)
    const passedCourses = studentResults.filter(r => r.grade !== 'F').length
    const failedCourses = studentResults.filter(r => r.grade === 'F').length

    return { cgpa, totalUnits, passedCourses, failedCourses }
  }

  const tabsConfig = () => {
    const tabs = []
    if (user.role === 'ADMIN') {
      tabs.push({ value: 'enroll', label: 'Enroll Students' })
      tabs.push({ value: 'manage', label: 'Manage Students' })
    }
    if (user.role === 'ADMIN' || user.role === 'TEACHER') {
      tabs.push({ value: 'results', label: 'Manage Results' })
    }
    tabs.push({ value: 'view', label: 'View Results' })
    if (user.role === 'STUDENT') {
      tabs.push({ value: 'transcript', label: 'Transcript' })
    }
    return tabs
  }

  const stats = user.role === 'STUDENT' ? getStudentStats() : null

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Graadex Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">Academic Management System</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
              <Button onClick={() => signOut()} variant="outline" size="sm">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {user.role === 'STUDENT' && stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold">{stats.cgpa}</div>
                <p className="text-xs text-muted-foreground">CGPA</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold">{stats.totalUnits}</div>
                <p className="text-xs text-muted-foreground">Total Units</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">{stats.passedCourses}</div>
                <p className="text-xs text-muted-foreground">Passed</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-red-600">{stats.failedCourses}</div>
                <p className="text-xs text-muted-foreground">Failed</p>
              </CardContent>
            </Card>
          </div>
        )}

        <Tabs defaultValue={tabsConfig()[0]?.value || 'view'} className="space-y-4">
          <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${tabsConfig().length}, 1fr)` }}>
            {tabsConfig().map(tab => (
              <TabsTrigger key={tab.value} value={tab.value}>{tab.label}</TabsTrigger>
            ))}
          </TabsList>

          {user.role === 'ADMIN' && (
            <TabsContent value="enroll">
              <Card>
                <CardHeader>
                  <CardTitle>Enroll New Student</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={enrollStudent} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Student Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="department">Department</Label>
                        <Input
                          id="department"
                          value={formData.department}
                          onChange={(e) => handleInputChange('department', e.target.value)}
                          placeholder="e.g., Computer Science"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="level">Level</Label>
                        <Select value={formData.level} onValueChange={(value) => handleInputChange('level', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="100">100 Level</SelectItem>
                            <SelectItem value="200">200 Level</SelectItem>
                            <SelectItem value="300">300 Level</SelectItem>
                            <SelectItem value="400">400 Level</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button type="submit" disabled={loading}>
                      {loading ? 'Enrolling...' : 'Enroll Student'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {user.role === 'ADMIN' && (
            <TabsContent value="manage">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Enrolled Students ({students.length})</CardTitle>
                    <div className="space-x-2">
                      <Button onClick={promoteStudents} variant="outline" disabled={loading}>
                        Promote All Students
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Reg Number</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Department</TableHead>
                          <TableHead>Level</TableHead>
                          <TableHead>Email</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {students.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell className="font-medium">{student.regNumber}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{student.department}</TableCell>
                            <TableCell>{student.level} Level</TableCell>
                            <TableCell className="text-sm text-gray-500">{student.user?.email || 'N/A'}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {(user.role === 'ADMIN' || user.role === 'TEACHER') && (
            <TabsContent value="results">
              <Card>
                <CardHeader>
                  <CardTitle>Add Student Result</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={addResult} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="studentId">Student</Label>
                        <Select value={formData.studentId} onValueChange={(value) => handleInputChange('studentId', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select student" />
                          </SelectTrigger>
                          <SelectContent>
                            {students.map((student) => (
                              <SelectItem key={student.id} value={student.id}>
                                {student.regNumber} - {student.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="course">Course Code</Label>
                        <Input
                          id="course"
                          value={formData.course}
                          onChange={(e) => handleInputChange('course', e.target.value)}
                          placeholder="e.g., CSC101"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="score">Score</Label>
                        <Input
                          id="score"
                          type="number"
                          min="0"
                          max="100"
                          value={formData.score}
                          onChange={(e) => handleInputChange('score', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="semester">Semester</Label>
                        <Select value={formData.semester} onValueChange={(value) => handleInputChange('semester', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select semester" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">First Semester</SelectItem>
                            <SelectItem value="2">Second Semester</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="year">Academic Year</Label>
                        <Input
                          id="year"
                          type="number"
                          value={formData.year}
                          onChange={(e) => handleInputChange('year', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="units">Credit Units</Label>
                        <Select value={formData.units} onValueChange={(value) => handleInputChange('units', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select units" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Unit</SelectItem>
                            <SelectItem value="2">2 Units</SelectItem>
                            <SelectItem value="3">3 Units</SelectItem>
                            <SelectItem value="4">4 Units</SelectItem>
                            <SelectItem value="5">5 Units</SelectItem>
                            <SelectItem value="6">6 Units</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button type="submit" disabled={loading || !formData.studentId || !formData.course || !formData.score}>
                      {loading ? 'Adding Result...' : 'Add Result'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          <TabsContent value="view">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>
                    Academic Results ({results.length})
                    {user.role === 'STUDENT' && stats && (
                      <span className="text-sm font-normal text-gray-500 ml-2">
                        CGPA: {stats.cgpa}
                      </span>
                    )}
                  </CardTitle>
                  {(user.role === 'ADMIN' || user.role === 'TEACHER') && (
                    <Button onClick={exportResults} variant="outline" size="sm">
                      Export CSV
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course</TableHead>
                        {user.role !== 'STUDENT' && <TableHead>Student</TableHead>}
                        {user.role !== 'STUDENT' && <TableHead>Reg Number</TableHead>}
                        <TableHead>Score</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Units</TableHead>
                        <TableHead>Semester</TableHead>
                        <TableHead>Year</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {results.map((result) => (
                        <TableRow key={result.id}>
                          <TableCell className="font-medium">{result.course}</TableCell>
                          {user.role !== 'STUDENT' && (
                            <TableCell>{result.student?.user?.name || 'N/A'}</TableCell>
                          )}
                          {user.role !== 'STUDENT' && (
                            <TableCell>{result.student?.regNumber || 'N/A'}</TableCell>
                          )}
                          <TableCell>{result.score}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              result.grade === 'A' ? 'bg-green-100 text-green-800' :
                              result.grade === 'B' ? 'bg-blue-100 text-blue-800' :
                              result.grade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                              result.grade === 'D' ? 'bg-orange-100 text-orange-800' :
                              result.grade === 'E' ? 'bg-red-100 text-red-800' :
                              'bg-red-200 text-red-900'
                            }`}>
                              {result.grade}
                            </span>
                          </TableCell>
                          <TableCell>{result.units}</TableCell>
                          <TableCell>{result.semester}</TableCell>
                          <TableCell>{result.year}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {user.role === 'STUDENT' && (
            <TabsContent value="transcript">
              <Card>
                <CardHeader>
                  <CardTitle>Academic Transcript</CardTitle>
                </CardHeader>
                <CardContent>
                  <TranscriptGenerator results={getStudentResults()} studentName={user.name} />
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  )
}