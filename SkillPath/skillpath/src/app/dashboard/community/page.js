'use client'

// You need to create this file again

import React, { useState } from 'react'
import { MapPin, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import Navbar from '@/app/components/dashboard/Navbar'
import Footer from '@/app/components/dashboard/Footer'

const students = [
  {
    id: 1,
    name: 'Alice Johnson',
    avatar: '/placeholder.svg?height=100&width=100',
    description: 'Web Development enthusiast. Currently learning React and Node.js.',
    distance: 2.5,
    location: { lat: 40.7128, lng: -74.0060 },
  },
  {
    id: 2,
    name: 'Bob Smith',
    avatar: '/placeholder.svg?height=100&width=100',
    description: 'Data Science student with a passion for machine learning algorithms.',
    distance: 3.7,
    location: { lat: 40.7282, lng: -73.7949 },
  },
  {
    id: 3,
    name: 'Charlie Brown',
    avatar: '/placeholder.svg?height=100&width=100',
    description: 'Aspiring mobile app developer focusing on iOS development.',
    distance: 1.8,
    location: { lat: 40.7589, lng: -73.9851 },
  },
]

const CommunityPage = () => {
  const [proximity, setProximity] = useState(5)

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">Community</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="w-full md:w-1/2 mb-4 md:mb-0">
              <label htmlFor="proximity" className="block text-sm font-medium text-gray-700 mb-2">
                Proximity (km): {proximity}
              </label>
              
            </div>
            
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {students.map((student) => (
            <div 
              key={student.id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Image
                    src={student.avatar}
                    alt={student.name}
                    width={50}
                    height={50}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">{student.name}</h2>
                    <p className="text-sm text-gray-500">
                      <MapPin className="inline-block w-4 h-4 mr-1" />
                      {student.distance} km away
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{student.description}</p>
                <div className="mb-4 h-40 bg-gray-200 rounded-lg overflow-hidden">
                  {/* Replace with actual map component */}
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Map Placeholder
                  </div>
                </div>
                
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle background pattern */}
      <div className="fixed inset-0 z-[-1] opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500" style={{ mixBlendMode: 'multiply' }}></div>
        <div className="absolute inset-0 bg-grid"></div>
      </div>
    </div>

    <Footer /> 
    </>
  )
}

export default CommunityPage