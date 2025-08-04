'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { calculateGPA } from '@/lib/utils'

interface Result {
  course: string
  score: number
  grade: string
  units: number
  semester: number
  year: number
}

export function TranscriptGenerator({ results, studentName }: { results: Result[]; studentName: string }) {
  const [generating, setGenerating] = useState(false)

  const generatePDF = async () => {
    setGenerating(true)
    try {
      const response = await fetch('/api/transcript', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ results, studentName })
      })
      
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'transcript.pdf'
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating transcript')
    }
    setGenerating(false)
  }

  const cgpa = calculateGPA(results)
  const totalUnits = results.reduce((sum, r) => sum + r.units, 0)
  const passedCourses = results.filter(r => r.grade !== 'F').length
  const failedCourses = results.filter(r => r.grade === 'F').length

  const groupedBySemester = results.reduce((acc, result) => {
    const key = `${result.year}-${result.semester}`
    if (!acc[key]) acc[key] = []
    acc[key].push(result)
    return acc
  }, {} as Record<string, Result[]>)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{cgpa}</div>
          <div className="text-sm text-blue-600">CGPA</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{passedCourses}</div>
          <div className="text-sm text-green-600">Passed</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-red-600">{failedCourses}</div>
          <div className="text-sm text-red-600">Failed</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-gray-600">{totalUnits}</div>
          <div className="text-sm text-gray-600">Total Units</div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Semester Breakdown</h3>
        {Object.entries(groupedBySemester).map(([semesterKey, semesterResults]) => {
          const semesterGPA = calculateGPA(semesterResults)
          const [year, semester] = semesterKey.split('-')
          
          return (
            <div key={semesterKey} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">
                  {year} Academic Year - {semester === '1' ? 'First' : 'Second'} Semester
                </h4>
                <span className="text-sm font-medium">SGPA: {semesterGPA}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-sm">
                {semesterResults.map((result, idx) => (
                  <div key={idx} className="flex justify-between border-b pb-1">
                    <span>{result.course}</span>
                    <span className="font-medium">{result.grade}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <Button onClick={generatePDF} disabled={generating} className="w-full">
        {generating ? 'Generating PDF...' : 'Download Official Transcript'}
      </Button>
    </div>
  )
}