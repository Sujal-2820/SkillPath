// src/app/components/dashboard/HeroSection.js

import { ArrowRight, BookOpen, Users, Award, Clock } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';



export default function HeroSection({ userName, matchedCourse, courseDomain }) {
  const router = useRouter();

  console.log("matchedCourse domain in Hero Section: ",courseDomain);

  const handleContinueLearning = () => {
    // Navigate to course page and pass matchedCourse name or ID
    router.push(`/dashboard/coursePage?domain=${courseDomain}&course=${matchedCourse.course_name}`);
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Welcome back, {userName}!
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Continue your learning journey and unlock new skills.
          </p>
        </div>

        {/* Course Card */}
        <div className="mt-10 flex justify-center">
          <div className="w-full lg:w-4/5 md:w-4/5 bg-white shadow-lg rounded-lg overflow-hidden">
            {matchedCourse ? (
              <>
                <Image
                  src={ matchedCourse.image }
                  alt="Course thumbnail"
                  width={300}
                  height={100}
                  className="w-full object-cover object-center"
                />
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    {matchedCourse.course_name || "Unnamed Course"}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {matchedCourse.description || "No description available."}
                  </p>
                  <div className="flex items-center text-gray-500">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>
                      Estimated time: {matchedCourse.estimated_time || "N/A"}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-6 text-center text-gray-600">
                <p>No course data available.</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-10">
          <div className="rounded-md shadow">
            <a
              onClick={handleContinueLearning}
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 md:py-4 md:text-lg md:px-10"
            >
              Continue Learning
              <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BookOpen className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Courses Completed</dt>
                    <dd className="text-lg font-medium text-gray-900">5</dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <a href="#" className="font-medium text-black hover:text-gray-900">
                  View all courses
                </a>
              </div>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Community Posts</dt>
                    <dd className="text-lg font-medium text-gray-900">28</dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <a href="#" className="font-medium text-black hover:text-gray-900">
                  View community
                </a>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Award className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Achievements</dt>
                    <dd className="text-lg font-medium text-gray-900">12</dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <a href="#" className="font-medium text-black hover:text-gray-900">
                  View achievements
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
