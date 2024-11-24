// src/app/dashboard/page.js

'use client'

import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext'; 
import { useDashboard } from './DashboardContext'; // Import the context hook
import HeroSection from '../components/dashboard/HeroSection';
import LearningPaths from '../components/dashboard/LearningPaths';
import RecentActivity from '../components/dashboard/RecentActivity';
import { useRouter } from 'next/navigation';
import Navbar from '../components/dashboard/Navbar';
import Footer from '../components/dashboard/Footer';

export default function Dashboard() {
  const router = useRouter();
  const { user, loading } = useAuth(); // Use the Auth context
  const { userData, courseData, courseDomain } = useDashboard(); // Access context data

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin');
    }
  }, [loading, user, router]);

  // Show a loading state if data is still loading
  if (loading) {
    return <div>Loading...</div>; // Replace with your loading spinner if needed
  }

  return (
    <div className="min-h-screen bg-gray-100 relative overflow-hidden">
      <Navbar/>
      <HeroSection userName={userData?.fullName || "Guest"} userData={userData} matchedCourse={courseData} courseDomain={courseDomain}/>
      <LearningPaths courseDomain={courseDomain}/>
      <RecentActivity />
      <Footer/>
    </div>
  );
}
