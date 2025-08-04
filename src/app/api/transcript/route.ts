import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { results, studentName } = await request.json()

    const pdfContent = generateSimplePDF(results, studentName || session.user.name)
    
    return new NextResponse(pdfContent, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="transcript.pdf"'
      }
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

function generateSimplePDF(results: any[], studentName: string): Buffer {
  const content = `
ACADEMIC TRANSCRIPT
Student: ${studentName}
Date: ${new Date().toLocaleDateString()}

RESULTS:
${results.map(r => `${r.course}: ${r.score} (${r.grade}) - ${r.units} units`).join('\n')}

Total Courses: ${results.length}
  `
  
  return Buffer.from(content, 'utf-8')
}