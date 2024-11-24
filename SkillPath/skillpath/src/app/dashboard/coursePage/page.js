// dashboard/coursePage/page.js

'use client';

import React, { useState, useEffect } from 'react';
import CourseProgressBar from '../../components/course/CourseProgressBar';
import CourseCarousel from '../../components/course/CourseCarousel';
import Popup from '../../components/course/Popup';
import { useSearchParams } from 'next/navigation';
import { useDashboard } from '../DashboardContext';
import { useRouter } from "next/navigation";
import CourseCertificate from '../../components/course/CourseCertificate';

const similarCourses = [
  { id: 1, title: "Advanced CSS Techniques", description: "Take your CSS skills to the next level", image: "/placeholder.svg?height=150&width=256" },
  { id: 2, title: "JavaScript Frameworks", description: "Explore popular JS frameworks", image: "/placeholder.svg?height=150&width=256" },
  { id: 3, title: "Backend Development with Node.js", description: "Learn server-side programming", image: "/placeholder.svg?height=150&width=256" },
  { id: 4, title: "Full Stack Web Development", description: "Become a full stack developer", image: "/placeholder.svg?height=150&width=256" },
  { id: 5, title: "Web Security Fundamentals", description: "Secure your web applications", image: "/placeholder.svg?height=150&width=256" },
];

export default function CoursePage() {
  const searchParams = useSearchParams();
  const course_name = searchParams.get('course');
  const domain_name = searchParams.get('domain');
  const router = useRouter();
  const { userData } = useDashboard();
  const [unlockedModules, setUnlockedModules] = useState([]);
  const [lockedModules, setLockedModules] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isCertificatePopOpen, setIsCertificatePopupOpen] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false); 
  const [activeModule, setActiveModule] = useState(null);
  const [progress, setProgress] = useState(0); 

  useEffect(() => {
    const fetchModules = () => {
      console.log("Course name passed through URL: ",course_name);
      console.log("User data in context: ", userData);
      if (userData && userData.courseDetails && userData.courseDetails[course_name]) {
        const courseDetailsData = userData.courseDetails[course_name];

        setUnlockedModules(courseDetailsData.unlockedModules || []);
        setLockedModules(courseDetailsData.lockedModules || []);

        console.log("unlockedModules: ", unlockedModules);
        console.log("lockedModules: ", lockedModules);
      } else {
        console.error("No progress found for the specified course or user data is not available.");
      }
    };

    fetchModules();
  }, [course_name, userData]);

  useEffect(() => {
    // Calculate progress when unlocked and locked modules change
    const totalModules = unlockedModules.length + lockedModules.length;
    const completedModules = unlockedModules.filter(module => module.isComplete).length; // Updated condition

    // Calculate progress as a percentage and round to nearest 10
    const calculatedProgress = totalModules ? Math.round((completedModules / totalModules) * 100 / 10) * 10 : 0;
    setProgress(calculatedProgress);
  }, [unlockedModules, lockedModules]);

  const handleGetCertificate = () => {
    const allModulesComplete = [...unlockedModules, ...lockedModules].every(module => module.isComplete); // Updated condition
    if (!allModulesComplete) {
      setIsCertificatePopupOpen(true);
    }else{
      setShowCertificate(true);
    }
  };

  const handleModuleClick = (module) => {
    // Show popup for locked modules
    if (lockedModules.some(lockedModule => lockedModule.name === module.name)) { // Updated to check the name
      setActiveModule(module.name);
      setIsPopupOpen(true);
    } else {
      // Handle starting the module (if unlocked)
      const moduleName = module.name;
      router.push(`/dashboard/coursePage/${moduleName}?domain=${domain_name}&course=${course_name}&module=${moduleName}&difficulty=${module.difficulty}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{course_name}</h1>
          <button
            onClick={handleGetCertificate}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
          >
            Get Certificate
          </button>
        </div>

        {showCertificate && (
          <CourseCertificate courseNAME={course_name} userNAME={userData.fullName} />
        )}


        
        <h2>Course Progress → {progress}%</h2>
        <CourseProgressBar progress={progress} />
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Course Modules</h2>
          <div className="space-y-4">
            {unlockedModules.map((module, index) => (
              <div key={index} className="p-4 bg-white rounded shadow-md relative">
                <h3 className="text-xl font-semibold">{module.name}</h3>
                <span className={`absolute top-2 right-2 ${module.isComplete ? 'text-base font-bold text-green-500' : 'text-sm text-red-500'}`}>
                  {module.isComplete ? 'Complete' : 'Incomplete'}
                </span>
                <button
                  onClick={() => handleModuleClick(module)}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Start
                </button>
              </div>
            ))}
            {lockedModules.map((module, index) => (
              <div
                key={index}
                className="p-4 bg-gray-200 rounded shadow-md relative cursor-not-allowed"
                onClick={() => handleModuleClick(module)} // Pass the whole module object
              >
                <h3 className="text-xl font-semibold">{module.name}</h3>
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-25" />
                <span className="absolute top-2 right-2 text-sm text-red-500">Incomplete</span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">Similar Courses</h2>
          <CourseCarousel courses={similarCourses} />
        </div>
      </div>

      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        message="Please complete the previous module first."
      />

      <Popup
        isOpen={isCertificatePopOpen}
        onClose={() => setIsCertificatePopupOpen(false)}
        message="Please complete all the modules first."
      />

    </div>
  );
}
