import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { generateRegNumber } from '@/lib/utils'
import bcrypt from 'bcryptjs'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'TEACHER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const students = await prisma.student.findMany({
      include: { user: true }
    })

    return NextResponse.json(students.map((s: any) => ({
      id: s.id,
      regNumber: s.regNumber,
      name: s.user.name,
      level: s.level,
      department: s.department,
      user: s.user
    })))
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { name, email, department, level } = await request.json()
    
    const hashedPassword = await bcrypt.hash('password123', 12)
    const regNumber = generateRegNumber(department, new Date().getFullYear())

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'STUDENT',
        student: {
          create: {
            regNumber,
            level,
            department,
          }
        }
      },
      include: { student: true }
    })

    return NextResponse.json({ 
      message: 'Student enrolled successfully',
      regNumber: user.student?.regNumber 
    })
  } catch (error) {
    console.error('Error creating student:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}