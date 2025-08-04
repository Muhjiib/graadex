# Graadex - School Academic Management System

A simple MVP for school academic management built with Next.js 14, TypeScript, and Prisma.

## Features

- **User Authentication**: Email/password login with NextAuth.js
- **Role-based Access**: Admin, Teacher, and Student roles
- **Student Management**: Enroll students with auto-generated reg numbers
- **Results Management**: Add/view academic results
- **GPA Calculation**: Auto-calculate SGPA/CGPA
- **PDF Transcripts**: Download academic transcripts

## Quick Setup

1. **Clone and Install**
```bash
git clone <repo-url>
cd graadex
npm install
```

2. **Environment Setup**
```bash
cp .env.example .env.local
# Edit .env.local with your database URL and secrets
```

3. **Database Setup**
```bash
npx prisma db push
```

4. **Create Admin User** (Run in browser console or create seed script)
```sql
INSERT INTO "User" (id, email, password, name, role) 
VALUES ('admin1', 'admin@school.com', '$2a$12$hashedpassword', 'Admin User', 'ADMIN');
```

5. **Run Development Server**
```bash
npm run dev
```

Visit `http://localhost:3000`

## Default Login
- **Admin**: admin@school.com / password123
- **Students**: Auto-generated accounts when enrolled

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- NextAuth.js
- shadcn/ui

## Deployment
1. Set up PostgreSQL database
2. Set environment variables
3. Run `npm run build`
4. Deploy to Vercel/Railway/etc.

## Project Structure
- `/app` - Next.js pages and API routes
- `/components` - React components
- `/lib` - Utilities and configurations
- `/prisma` - Database schema