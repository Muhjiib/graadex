import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateRegNumber(department: string, year: number): string {
  const deptCode = department.substring(0, 3).toUpperCase()
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `${deptCode}/${year}/${random}`
}

export function calculateGrade(score: number): string {
  if (score >= 70) return 'A'
  if (score >= 60) return 'B'
  if (score >= 50) return 'C'
  if (score >= 45) return 'D'
  if (score >= 40) return 'E'
  return 'F'
}

export function calculateGP(grade: string): number {
  const gradePoints = { A: 5, B: 4, C: 3, D: 2, E: 1, F: 0 }
  return gradePoints[grade as keyof typeof gradePoints] || 0
}

export function calculateGPA(results: Array<{ grade: string; units: number }>): number {
  const totalPoints = results.reduce((sum, r) => sum + (calculateGP(r.grade) * r.units), 0)
  const totalUnits = results.reduce((sum, r) => sum + r.units, 0)
  return totalUnits > 0 ? Number((totalPoints / totalUnits).toFixed(2)) : 0
}