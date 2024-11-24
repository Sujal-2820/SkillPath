// components/AddCourseToUser.js

import { doc, getDoc, updateDoc, arrayUnion, collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

export default async function addCourseToUser(userId, skillDomain, matchedCourse) {
  try {
    console.log("matchedCourse: ", matchedCourse);
    // Format matchedCourse for Firestore path
    const skillDomainFormatted = skillDomain.toLowerCase().replace(/\s+/g, "_");

    // Step 1: Get the course document reference
    const courseDocRef = doc(db, "courses", skillDomainFormatted, "course_names", matchedCourse);

    // Step 2: Access the 'modules' subcollection and retrieve module names
    const modulesCollectionRef = collection(courseDocRef, "modules");
    const modulesSnapshot = await getDocs(modulesCollectionRef);
    const modules = modulesSnapshot.docs.map((doc) => doc.id);

    if (modules.length === 0) {
      console.error("No modules found for this course.");
      return;
    }

    // Step 3: Create initial progress object with isComplete and difficulty for each module
    const unlockedModulesList = [{
      name: modules[0],
      isComplete: false,
      difficulty: "standard"
    }];

    const lockedModulesList = modules.slice(1).map(module => ({
      name: module,
      isComplete: false,
      difficulty: "standard"
    }));

    const initialProgress = {
      courseDomain: skillDomainFormatted,
      isActive: true,
      totalModules: modules.length,
      completedModules: [],
      unlockedModules: unlockedModulesList, // Use the updated unlockedModules array
      progress: 0,
      lockedModules: lockedModulesList, // Use the updated lockedModules array
    };

    // Step 4: Update the user's enrolledCourses and courseProgress subcollections
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, {
      enrolledCourses: arrayUnion(matchedCourse),
      [`courseDetails.${matchedCourse}`]: initialProgress,
    });

    console.log("Course successfully added to user's profile.");
  } catch (error) {
    console.error("Error adding course to user:", error);
  }
}