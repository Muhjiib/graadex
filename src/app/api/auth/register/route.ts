import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { generateRegNumber } from '@/lib/utils'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role, department, level } = await request.json()

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists with this email' }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user with role-specific data
    if (role === 'STUDENT') {
      const regNumber = generateRegNumber(department, new Date().getFullYear())
      
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role,
          student: {
            create: {
              regNumber,
              level: parseInt(level),
              department,
            }
          }
        }
      })

      return NextResponse.json({ 
        message: 'Student account created successfully',
        regNumber 
      })
    } else if (role === 'TEACHER') {
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role,
          teacher: {
            create: {
              department,
            }
          }
        }
      })

      return NextResponse.json({ message: 'Teacher account created successfully' })
    } else if (role === 'ADMIN') {
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role,
        }
      })

      return NextResponse.json({ message: 'Admin account created successfully' })
    } else {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
    }

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
  }
}