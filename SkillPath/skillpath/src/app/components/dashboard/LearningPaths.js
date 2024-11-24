import { ArrowRight, BookOpen, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';
import { useEffect, useState } from 'react';

export default function LearningPaths({ courseDomain }) {

  const [recommendedPaths, setRecommendedPaths] = useState([]);
  const [loading, setLoading] = useState(true);

  const enrolledPaths = [
    { id: 1, name: 'Web Development Fundamentals', progress: 75, image: '/placeholder.svg?height=200&width=400' },
    { id: 2, name: 'Data Science Essentials', progress: 30, image: '/placeholder.svg?height=200&width=400' },
    { id: 3, name: 'Machine Learning Basics', progress: 10, image: '/placeholder.svg?height=200&width=400' },
  ]

  useEffect(() => {
    if (!courseDomain) return;

    const fetchRecommendedPaths = async () => {
      try {
        const docRef = doc(db, 'rules', 'onboarding');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const suggestions = data.onboarding_suggestions.domains;
          const normalizedDomain = courseDomain.toLowerCase().replace(/\s+/g, '_');

          if (suggestions[normalizedDomain]) {
            setRecommendedPaths(suggestions[normalizedDomain]);
          }
        }
      } catch (error) {
        console.error('Error fetching recommended paths:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedPaths();
  }, [courseDomain]);

  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">My Learning Paths</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {enrolledPaths.map((path) => (
            <div key={path.id} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="relative h-48 w-full">
                <Image
                  src={path.image}
                  alt={path.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <BookOpen className="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{path.name}</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">{path.progress}% Complete</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <a href="/dashboard/coursePage" className="font-medium text-black hover:text-gray-900 group flex items-center">
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-extrabold text-gray-900 mt-16 mb-8">Recommended Learning Paths</h2>
        {loading ? (
          <p>Loading recommended courses...</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recommendedPaths.map((path, index) => (
              <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="relative h-48 w-full">
                  <Image
                    src={path.image || '/placeholder.svg?height=200&width=400'} // Provide a fallback image
                    alt={path.course_name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-medium text-gray-900">{path.course_name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{path.description || 'Description not available'}</p>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <a href="/dashboard/coursePage" className="font-medium text-black hover:text-gray-900 group flex items-center">
                      Enroll Now
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}