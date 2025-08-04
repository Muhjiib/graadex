import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { calculateGrade } from '@/lib/utils'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let results
    if (session.user.role === 'STUDENT') {
      const student = await prisma.student.findFirst({
        where: { userId: session.user.id }
      })
      
      if (!student) {
        return NextResponse.json([])
      }

      results = await prisma.result.findMany({
        where: { studentId: student.id },
        orderBy: { createdAt: 'desc' }
      })
    } else {
      results = await prisma.result.findMany({
        include: { 
          student: { include: { user: true } },
          teacher: { include: { user: true } }
        },
        orderBy: { createdAt: 'desc' }
      })
    }

    return NextResponse.json(results)
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'TEACHER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { studentId, course, score, semester, year, units } = await request.json()
    
    let teacherId
    if (session.user.role === 'TEACHER') {
      const teacher = await prisma.teacher.findFirst({
        where: { userId: session.user.id }
      })
      teacherId = teacher?.id
    } else {
      const firstTeacher = await prisma.teacher.findFirst()
      teacherId = firstTeacher?.id
    }

    if (!teacherId) {
      return NextResponse.json({ error: 'No teacher found' }, { status: 400 })
    }

    const grade = calculateGrade(score)

    const result = await prisma.result.create({
      data: {
        studentId,
        teacherId,
        course,
        score,
        grade,
        semester,
        year,
        units,
      }
    })

    return NextResponse.json({ 
      message: 'Result added successfully',
      result 
    })
  } catch (error) {
    console.error('Error creating result:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}