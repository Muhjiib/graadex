'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { GraduationCap, Zap, ArrowRight, Menu, X } from 'lucide-react'

export function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="backdrop-blur-2xl bg-black/70 border-b border-white/10 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3 sm:space-x-4 group">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-xl sm:rounded-2xl blur-md animate-glow-pulse"></div>
              <div className="relative bg-black/80 p-2 sm:p-3 rounded-xl sm:rounded-2xl border border-white/20 group-hover:border-white/40 transition-all duration-300">
                <GraduationCap className="h-6 sm:h-8 w-6 sm:w-8 text-white group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="group-hover:translate-x-1 transition-transform duration-300">
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                Graadex
              </h1>
              <p className="text-xs text-gray-400 font-mono tracking-wider hidden sm:block">ACADEMIC.SYSTEM.2024</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            <Link href="/login">
              <Button 
                variant="outline" 
                className="border-2 border-white/50 text-white bg-transparent hover:bg-white/10 hover:border-white/80 transition-all duration-300 hover:scale-105 backdrop-blur-sm px-6 py-2"
              >
                <Zap className="w-4 h-4 mr-2" />
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-white text-black hover:bg-gray-200 shadow-lg hover:shadow-white/20 transition-all duration-300 hover:scale-105 relative overflow-hidden group px-6 py-2">
                <span className="relative z-10 flex items-center font-medium">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-2xl border-b border-white/10 animate-fade-in-up">
            <div className="px-4 py-6 space-y-4">
              <Link href="/login" className="block">
                <Button 
                  variant="outline" 
                  className="w-full justify-center border-2 border-white/50 text-white bg-transparent hover:bg-white/10 hover:border-white/80 transition-all duration-300 py-3"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </Link>
              <Link href="/register" className="block">
                <Button 
                  className="w-full justify-center bg-white text-black hover:bg-gray-200 shadow-lg hover:shadow-white/20 transition-all duration-300 py-3 relative overflow-hidden group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="relative z-10 flex items-center font-medium">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}