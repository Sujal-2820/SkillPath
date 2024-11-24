'use client'
// app/dashboard/layout.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import Navbar from '../components/dashboard/Navbar';
import Footer from '../components/dashboard/Footer';
import DashboardContext from './DashboardContext'; 

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth();
  const [userData, setUserData] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [courseDomain, setCourseDomain] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUserData(userData);

            const matchedCourse = userData.matchedCourse;
            const domain = userData.skillDomain;

            const docRef = doc(db, "rules", "onboarding");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              const data = docSnap.data();
              const suggestions = data.onboarding_suggestions.domains;
              const normalizedDomain = domain.toLowerCase().replace(/\s+/g, '_');
              setCourseDomain(normalizedDomain);
              if (suggestions[normalizedDomain]) {
                const courseDetails = suggestions[normalizedDomain].find(
                  (course) => course.course_name === matchedCourse
                );
                setCourseData(courseDetails);
              }
            }
          }
        } catch (error) {
          console.error("Error fetching user/course data: ", error);
        }
      }
    };

    if (!loading) {
      fetchUserData();
    }
  }, [user, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardContext.Provider value={{ userId: user?.uid, userData, courseData, courseDomain}}>
      <div>{children}</div>
    </DashboardContext.Provider>
  );
}
