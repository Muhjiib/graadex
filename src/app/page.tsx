"use client"
import './style/animation.css'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MobileHeader } from '@/components/mobile-header'
import Link from 'next/link'
import { BookOpen, Users, GraduationCap, BarChart3, FileText, Shield, ArrowRight, Sparkles } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Advanced Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] animate-pulse"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-white/10 to-gray-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-gray-300/10 to-white/10 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse-slow"></div>
        
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
        
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent animate-scan-horizontal"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent animate-scan-horizontal-reverse"></div>
          <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent animate-scan-vertical"></div>
          <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent animate-scan-vertical-reverse"></div>
        </div>
      </div>

      <div className="relative z-10">
        <MobileHeader />

        {/* Hero Section */}
        <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-8 sm:mb-12 animate-float">
              <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/5 border border-white/20 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 group">
                <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-white mr-2 sm:mr-3 group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-sm sm:text-base text-white font-medium tracking-wide">Modern Academic Management Platform</span>
                <div className="ml-2 sm:ml-3 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <div className="mb-8 sm:mb-12">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-2 sm:mb-4 leading-tight">
                <span className="inline-block animate-fade-in-up bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent" style={{ animationDelay: '0.2s' }}>
                  Modern Academic
                </span>
              </h2>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold leading-tight">
                <span className="inline-block animate-fade-in-up bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent" style={{ animationDelay: '0.4s' }}>
                  Management System
                </span>
              </h2>
            </div>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 sm:mb-16 max-w-4xl mx-auto leading-relaxed animate-fade-in-up px-4" style={{ animationDelay: '0.6s' }}>
              Streamline your school's academic operations with Graadex - a comprehensive platform for 
              student enrollment, grade management, and academic record keeping.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center animate-fade-in-up px-4" style={{ animationDelay: '0.8s' }}>
              <Link href="/register" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 bg-white text-black hover:bg-gray-200 shadow-2xl hover:shadow-white/20 transform hover:scale-105 sm:hover:scale-110 transition-all duration-500 relative overflow-hidden group font-semibold"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Create Account
                    <ArrowRight className="w-5 sm:w-6 h-5 sm:h-6 ml-2 sm:ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </Button>
              </Link>
              <Link href="/login" className="w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 border-2 border-white/50 text-white bg-transparent hover:bg-white/10 hover:border-white/80 transform hover:scale-105 sm:hover:scale-110 transition-all duration-500 backdrop-blur-sm font-semibold"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                Everything You Need for Academic Management
              </h3>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed px-4">
                Powerful features designed for students, teachers, and administrators
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  icon: Users,
                  title: "Student Management",
                  description: "Effortlessly enroll students, assign departments and levels, with auto-generated registration numbers."
                },
                {
                  icon: BarChart3,
                  title: "Grade Management", 
                  description: "Record and manage student results with automatic CGPA calculation and semester tracking."
                },
                {
                  icon: FileText,
                  title: "Academic Transcripts",
                  description: "Generate and download official academic transcripts with comprehensive grade summaries."
                },
                {
                  icon: BookOpen,
                  title: "Course Tracking",
                  description: "Track course progress, identify carryovers, and monitor academic performance over time."
                },
                {
                  icon: Shield,
                  title: "Role-Based Access",
                  description: "Secure system with different access levels for administrators, teachers, and students."
                },
                {
                  icon: GraduationCap,
                  title: "Academic Analytics",
                  description: "Comprehensive reporting and analytics to track institutional academic performance."
                }
              ].map((feature, index) => (
                <Card key={index} className="bg-white/5 border border-white/20 backdrop-blur-2xl hover:bg-white/10 hover:border-white/40 transition-all duration-700 group hover:scale-105 hover:shadow-2xl hover:shadow-white/10">
                  <CardHeader className="pb-4">
                    <div className="relative mb-4 sm:mb-6">
                      <div className="relative w-16 sm:w-20 h-16 sm:h-20 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/20 to-white/5 p-4 sm:p-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border border-white/20">
                        <feature.icon className="h-8 sm:h-10 w-8 sm:w-10 text-white group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    <CardTitle className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-gray-100 transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 leading-relaxed text-base sm:text-lg group-hover:text-gray-200 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* User Roles Section */}
        <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Built for Every User
              </h3>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-400 leading-relaxed px-4">
                Tailored experiences for different roles in your institution
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
              {[
                {
                  icon: Shield,
                  title: "Administrators",
                  features: ["Enroll and manage students", "Assign teachers to departments", "Promote students to next levels", "Generate institutional reports"]
                },
                {
                  icon: BookOpen,
                  title: "Teachers",
                  features: ["View department students", "Record course results and grades", "Track student progress", "Export academic data"]
                },
                {
                  icon: GraduationCap,
                  title: "Students",
                  features: ["View semester results and grades", "Track CGPA and academic progress", "Download official transcripts", "Monitor course performance"]
                }
              ].map((role, index) => (
                <div key={index} className="relative group">
                  <div className="relative p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-white/5 border border-white/20 backdrop-blur-2xl group-hover:bg-white/10 group-hover:border-white/40 transition-all duration-700 hover:scale-105">
                    <div className="text-center mb-6 sm:mb-8 md:mb-10">
                      <div className="relative w-20 sm:w-24 h-20 sm:h-24 mx-auto rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/20 to-white/10 p-5 sm:p-6 mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border border-white/30">
                        <role.icon className="h-10 sm:h-12 w-10 sm:w-12 text-white" />
                      </div>
                      <h4 className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-gray-100 transition-colors duration-300">
                        {role.title}
                      </h4>
                    </div>
                    <ul className="space-y-3 sm:space-y-4">
                      {role.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-300 text-base sm:text-lg group-hover:text-gray-200 transition-colors duration-300">
                          <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-white/60 mr-3 sm:mr-4 flex-shrink-0 group-hover:bg-white group-hover:scale-125 transition-all duration-300"></div>
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
        <section className="py-20 sm:py-24 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 backdrop-blur-3xl"></div>
          <div className="relative max-w-5xl mx-auto text-center">
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Ready to Transform Your Academic Management?
            </h3>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mb-12 sm:mb-16 leading-relaxed max-w-4xl mx-auto px-4">
              Join thousands of institutions already using Graadex to streamline their academic operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center px-4">
              <Link href="/register" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto text-xl sm:text-2xl px-12 sm:px-16 py-6 sm:py-8 bg-white text-black hover:bg-gray-200 shadow-2xl hover:shadow-white/30 transform hover:scale-110 sm:hover:scale-125 transition-all duration-500 relative overflow-hidden group font-bold"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Start Free Today
                    <ArrowRight className="w-6 sm:w-7 h-6 sm:h-7 ml-3 sm:ml-4 group-hover:translate-x-3 transition-transform duration-300" />
                  </span>
                </Button>
              </Link>
              <Link href="/login" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto text-xl sm:text-2xl px-12 sm:px-16 py-6 sm:py-8 border-2 border-white/60 text-white bg-transparent hover:bg-white/10 hover:border-white/90 transform hover:scale-110 sm:hover:scale-125 transition-all duration-500 backdrop-blur-sm font-bold"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/20 backdrop-blur-2xl bg-black/80 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6 sm:mb-8 group">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-2xl blur-lg animate-glow-pulse"></div>
                <div className="relative bg-black/80 p-2.5 sm:p-3 rounded-2xl border border-white/30 group-hover:border-white/50 transition-all duration-300">
                  <GraduationCap className="h-8 sm:h-10 w-8 sm:w-10 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <div className="group-hover:translate-x-2 transition-transform duration-300 text-center sm:text-left">
                <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  Graadex
                </span>
                <div className="text-xs sm:text-sm text-gray-400 font-mono tracking-wider">MODERN ACADEMIC MANAGEMENT SYSTEM</div>
              </div>
            </div>
            <p className="text-gray-400 text-base sm:text-lg tracking-wide px-4">
              Built for Excellence • Streamlining Education for the Future
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}