"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { BookOpen, Users, GraduationCap, BarChart3, FileText, Shield, ArrowRight, Sparkles, Zap } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Advanced Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] animate-pulse"></div>
        
        {/* Moving Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-white/10 to-gray-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-gray-300/10 to-white/10 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse-slow"></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-float-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${10 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>
        
        {/* Scanning Lines */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent animate-scan-horizontal"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent animate-scan-horizontal-reverse"></div>
          <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent animate-scan-vertical"></div>
          <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent animate-scan-vertical-reverse"></div>
        </div>
      </div>

      {/* Custom Animations Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-20px) translateX(10px); }
          66% { transform: translateY(10px) translateX(-10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(15px) translateX(-15px); }
          66% { transform: translateY(-10px) translateX(15px); }
        }
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) opacity(0.2); }
          50% { transform: translateY(-100px) opacity(0.8); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes scan-horizontal {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100vw); }
        }
        @keyframes scan-horizontal-reverse {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100vw); }
        }
        @keyframes scan-vertical {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes scan-vertical-reverse {
          0% { transform: translateY(100%); }
          100% { transform: translateY(-100vh); }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(255,255,255,0.1); }
          50% { box-shadow: 0 0 40px rgba(255,255,255,0.3), 0 0 60px rgba(255,255,255,0.1); }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 10s ease-in-out infinite; }
        .animate-float-particle { animation: float-particle linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-scan-horizontal { animation: scan-horizontal 8s linear infinite; }
        .animate-scan-horizontal-reverse { animation: scan-horizontal-reverse 10s linear infinite; }
        .animate-scan-vertical { animation: scan-vertical 12s linear infinite; }
        .animate-scan-vertical-reverse { animation: scan-vertical-reverse 9s linear infinite; }
        .animate-glow-pulse { animation: glow-pulse 3s ease-in-out infinite; }
      `}</style>

      <div className="relative z-10">
        {/* Futuristic Header */}
        <header className="backdrop-blur-2xl bg-black/70 border-b border-white/10 sticky top-0 z-50 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 rounded-2xl blur-md animate-glow-pulse"></div>
                  <div className="relative bg-black/80 p-3 rounded-2xl border border-white/20 group-hover:border-white/40 transition-all duration-300">
                    <GraduationCap className="h-8 w-8 text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
                <div className="group-hover:translate-x-1 transition-transform duration-300">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                    Graadex
                  </h1>
                  <p className="text-xs text-gray-400 font-mono tracking-wider">ACADEMIC.SYSTEM.2024</p>
                </div>
              </div>
              <div className="flex space-x-4">
                <Link href="/login">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                    <Zap className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-white text-black hover:bg-gray-200 shadow-lg hover:shadow-white/20 transition-all duration-300 hover:scale-105 relative overflow-hidden group">
                    <span className="relative z-10 flex items-center">
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-28 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-6xl mx-auto text-center">
            {/* Floating Badge */}
            <div className="mb-12 animate-float">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/5 border border-white/20 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 group">
                <Sparkles className="w-5 h-5 text-white mr-3 group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-white font-medium tracking-wide">Modern Academic Management Platform</span>
                <div className="ml-3 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            {/* Main Title with Staggered Animation */}
            <div className="mb-12">
              <h2 className="text-6xl md:text-8xl font-bold mb-4 leading-none">
                <span className="inline-block animate-fade-in-up bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent" style={{ animationDelay: '0.2s' }}>
                  Modern Academic
                </span>
              </h2>
              <h2 className="text-6xl md:text-8xl font-bold leading-none">
                <span className="inline-block animate-fade-in-up bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent" style={{ animationDelay: '0.4s' }}>
                  Management System
                </span>
              </h2>
            </div>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              Streamline your school's academic operations with Graadex - a comprehensive platform for 
              student enrollment, grade management, and academic record keeping.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <Link href="/register">
                <Button size="lg" className="text-xl px-12 py-6 bg-white text-black hover:bg-gray-100 shadow-2xl hover:shadow-white/20 transform hover:scale-110 transition-all duration-500 relative overflow-hidden group">
                  <span className="relative z-10 flex items-center font-semibold">
                    Create Account
                    <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="text-xl px-12 py-6 border-2 border-white/40 text-white hover:bg-white/10 hover:border-white transform hover:scale-110 transition-all duration-500 backdrop-blur-sm">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h3 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                Everything You Need for Academic Management
              </h3>
              <p className="text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
                Powerful features designed for students, teachers, and administrators
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: "Student Management",
                  description: "Effortlessly enroll students, assign departments and levels, with auto-generated registration numbers.",
                  delay: "0s"
                },
                {
                  icon: BarChart3,
                  title: "Grade Management",
                  description: "Record and manage student results with automatic CGPA calculation and semester tracking.",
                  delay: "0.2s"
                },
                {
                  icon: FileText,
                  title: "Academic Transcripts",
                  description: "Generate and download official academic transcripts with comprehensive grade summaries.",
                  delay: "0.4s"
                },
                {
                  icon: BookOpen,
                  title: "Course Tracking",
                  description: "Track course progress, identify carryovers, and monitor academic performance over time.",
                  delay: "0.6s"
                },
                {
                  icon: Shield,
                  title: "Role-Based Access",
                  description: "Secure system with different access levels for administrators, teachers, and students.",
                  delay: "0.8s"
                },
                {
                  icon: GraduationCap,
                  title: "Academic Analytics",
                  description: "Comprehensive reporting and analytics to track institutional academic performance.",
                  delay: "1s"
                }
              ].map((feature, index) => (
                <Card key={index} className="bg-white/5 border border-white/20 backdrop-blur-2xl hover:bg-white/10 hover:border-white/40 transition-all duration-700 group hover:scale-105 hover:shadow-2xl hover:shadow-white/10 animate-fade-in-up" style={{ animationDelay: feature.delay }}>
                  <CardHeader className="pb-4">
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-white/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-white/20 to-white/5 p-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border border-white/20">
                        <feature.icon className="h-10 w-10 text-white group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-white mb-4 group-hover:text-gray-100 transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 leading-relaxed text-lg group-hover:text-gray-200 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* User Roles Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h3 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Built for Every User
              </h3>
              <p className="text-2xl text-gray-400 leading-relaxed">
                Tailored experiences for different roles in your institution
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  icon: Shield,
                  title: "Administrators",
                  features: ["Enroll and manage students", "Assign teachers to departments", "Promote students to next levels", "Generate institutional reports"],
                  delay: "0s"
                },
                {
                  icon: BookOpen,
                  title: "Teachers",
                  features: ["View department students", "Record course results and grades", "Track student progress", "Export academic data"],
                  delay: "0.3s"
                },
                {
                  icon: GraduationCap,
                  title: "Students",
                  features: ["View semester results and grades", "Track CGPA and academic progress", "Download official transcripts", "Monitor course performance"],
                  delay: "0.6s"
                }
              ].map((role, index) => (
                <div key={index} className="relative group animate-fade-in-up" style={{ animationDelay: role.delay }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="relative p-10 rounded-3xl bg-white/5 border border-white/20 backdrop-blur-2xl group-hover:bg-white/10 group-hover:border-white/40 transition-all duration-700 hover:scale-105">
                    <div className="text-center mb-10">
                      <div className="relative w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-white/20 to-white/10 p-6 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border border-white/30">
                        <role.icon className="h-12 w-12 text-white" />
                        <div className="absolute inset-0 bg-white/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <h4 className="text-3xl font-bold text-white mb-2 group-hover:text-gray-100 transition-colors duration-300">
                        {role.title}
                      </h4>
                    </div>
                    <ul className="space-y-4">
                      {role.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-300 text-lg group-hover:text-gray-200 transition-colors duration-300">
                          <div className="w-3 h-3 rounded-full bg-white/60 mr-4 flex-shrink-0 group-hover:bg-white group-hover:scale-125 transition-all duration-300"></div>
                          <span className="group-hover:translate-x-1 transition-transform duration-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 backdrop-blur-3xl"></div>
          <div className="relative max-w-5xl mx-auto text-center">
            <h3 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent animate-glow-pulse">
              Ready to Transform Your Academic Management?
            </h3>
            <p className="text-2xl md:text-3xl text-gray-300 mb-16 leading-relaxed max-w-4xl mx-auto">
              Join thousands of institutions already using Graadex to streamline their academic operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <Link href="/register">
                <Button size="lg" className="text-2xl px-16 py-8 bg-white text-black hover:bg-gray-100 shadow-2xl hover:shadow-white/30 transform hover:scale-125 transition-all duration-500 relative overflow-hidden group">
                  <span className="relative z-10 flex items-center font-bold">
                    Start Free Today
                    <ArrowRight className="w-7 h-7 ml-4 group-hover:translate-x-3 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="text-2xl px-16 py-8 border-2 border-white/50 text-white hover:bg-white/10 hover:border-white transform hover:scale-125 transition-all duration-500 backdrop-blur-sm">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Modern Footer */}
        <footer className="border-t border-white/20 backdrop-blur-2xl bg-black/80 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <div className="flex items-center justify-center space-x-4 mb-8 group">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-2xl blur-lg animate-glow-pulse"></div>
                <div className="relative bg-black/80 p-3 rounded-2xl border border-white/30 group-hover:border-white/50 transition-all duration-300">
                  <GraduationCap className="h-10 w-10 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <div className="group-hover:translate-x-2 transition-transform duration-300">
                <span className="text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  Graadex
                </span>
                <div className="text-sm text-gray-400 font-mono tracking-wider">MODERN ACADEMIC MANAGEMENT SYSTEM</div>
              </div>
            </div>
            <p className="text-gray-400 text-lg tracking-wide">
              Built for Excellence • Streamlining Education for the Future
            </p>
          </div>
        </footer>
      </div>

      {/* CSS for fade-in-up animation */}
      <style jsx>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          opacity: 0;
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  )
}