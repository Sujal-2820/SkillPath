import React from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const CourseCarousel = ({ courses }) => {
  const scrollLeft = () => {
    document.getElementById('course-carousel').scrollLeft -= 200
  }

  const scrollRight = () => {
    document.getElementById('course-carousel').scrollLeft += 200
  }

  return (
    <div className="relative">
      <div 
        id="course-carousel" 
        className="flex overflow-x-auto space-x-4 scrollbar-hide scroll-smooth"
      >
        {courses.map((course) => (
          <div key={course.id} className="flex-none w-64">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image 
                src={course.image || '/placeholder.svg?height=150&width=256'} 
                alt={course.title} 
                width={256} 
                height={150} 
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                <p className="text-sm text-gray-600">{course.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button 
        onClick={scrollLeft} 
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={scrollRight} 
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  )
}

export default CourseCarousel