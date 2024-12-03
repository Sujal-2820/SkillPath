'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Menu, X } from 'lucide-react'

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="fixed top-0 left-0 right-0 bg-white z-50">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            SkillPath
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link href="/dashboard" className="hover:text-gray-600 transition-colors">
              Dashboard
            </Link>
            <Link href="#pricing" className="hover:text-gray-600 transition-colors">
              Pricing
            </Link>
            <Link href="/about" className="hover:text-gray-600 transition-colors">
              About
            </Link>
          </div>
          <div className="hidden md:flex space-x-4">
            <Link href="/signin" className="px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">
              Log in
            </Link>
            <Link href="/signup" className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
              Sign up
            </Link>
          </div>
          <button className="md:hidden" onClick={toggleMobileMenu} aria-label="Toggle mobile menu">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white py-4 px-4 shadow-lg">
            <div className="flex flex-col space-y-4">
              <Link href="/dashboard" className="hover:text-gray-600 transition-colors" onClick={toggleMobileMenu}>
                Dashboard
              </Link>
              <Link href="/pricing" className="hover:text-gray-600 transition-colors" onClick={toggleMobileMenu}>
                Pricing
              </Link>
              <Link href="/about" className="hover:text-gray-600 transition-colors" onClick={toggleMobileMenu}>
                About
              </Link>
              <Link href="/signin" className="px-4 py-2 rounded-md hover:bg-gray-100 transition-colors" onClick={toggleMobileMenu}>
                Log in
              </Link>
              <Link href="/signup" className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors" onClick={toggleMobileMenu}>
                Sign up
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="pt-20">
        <section className="bg-grid bg-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Master Any Skill with Structured Learning
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              SkillPath provides curated learning paths to help you achieve your goals faster and more efficiently.
            </p>
            <Link href="/dashboard" className="inline-flex items-center px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </section>

        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Why Choose SkillPath?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Curated Learning Paths", description: "Expert-designed courses to guide your learning journey" },
                { title: "Progress Tracking", description: "Monitor your advancement with detailed analytics" },
                { title: "Community Support", description: "Connect with peers and mentors for guidance" },
              ].map((feature, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-black text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Learning Journey?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of learners who have accelerated their careers with SkillPath.
            </p>
            <Link href="/signup" className="inline-flex items-center px-6 py-3 bg-white text-black rounded-md hover:bg-gray-200 transition-colors">
              Sign Up Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">SkillPath</h3>
              <p className="text-sm text-gray-600">Empowering learners worldwide with structured paths to success.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-gray-600 hover:text-black">Features</Link></li>
                <li><Link href="#" className="text-sm text-gray-600 hover:text-black">Pricing</Link></li>
                <li><Link href="#" className="text-sm text-gray-600 hover:text-black">Use Cases</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-gray-600 hover:text-black">About Us</Link></li>
                <li><Link href="#" className="text-sm text-gray-600 hover:text-black">Careers</Link></li>
                <li><Link href="#" className="text-sm text-gray-600 hover:text-black">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-gray-600 hover:text-black">Privacy Policy</Link></li>
                <li><Link href="#" className="text-sm text-gray-600 hover:text-black">Terms of Service</Link></li>
                <li><Link href="#" className="text-sm text-gray-600 hover:text-black">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">&copy; 2024 SkillPath. Developed by Sujal Soni🧑🏻‍💻</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
