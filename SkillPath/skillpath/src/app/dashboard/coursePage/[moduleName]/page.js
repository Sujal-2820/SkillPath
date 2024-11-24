'use client'

import React, { useState, useRef, useEffect } from 'react';
import { BookmarkIcon, ArrowLeft, ThumbsUp, ThumbsDown, Meh } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ScoreCalculator from '../../../components/module/scoreCalculator';
import NextModuleInference from '../../../components/module/NextModuleInference';
import { doc, arrayUnion, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../../../../firebase";
import { useDashboard } from '../../DashboardContext';
import { useRouter } from "next/navigation";


export default function ModulePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [bookmarked, setBookmarked] = useState(false);
  const [moduleData, setModuleData] = useState(null);
  const { userData } = useDashboard();
  const { userId } = useDashboard();
  const domain_name = searchParams.get('domain');
  const course_name = searchParams.get('course');
  const module_name = searchParams.get('module');
  const module_difficulty = searchParams.get('difficulty');
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState({});
  const [quizAttempts, setQuizAttempts] = useState({});
  const [showQuizFeedback, setShowQuizFeedback] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [showReview, setShowReview] = useState(false);
  const [review, setReview] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [scoreResult, setScoreResult] = useState(null);
  const [nextModule, setNextModule] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false); 
  const sectionRefs = useRef({});


  useEffect(() => {
    const loadModuleData = async () => {
      try {
        const filePath = `${domain_name}/${course_name}/${module_name}/${module_difficulty}/content.json`;
        const response = await fetch(`/api/fetchContent?filePath=${encodeURIComponent(filePath)}`);
        const data = await response.json();
        if (data && Array.isArray(data.content)) {
          setModuleData(data);

           // Check if there are no quiz questions
           const hasQuizQuestions = data.content.some(section => section.mcq_questions?.length > 0);
           if (!hasQuizQuestions) {
             setShowReview(true); // Directly show review if no quiz questions are present
           }
          
          // Initialize refs for each section
          data.content.forEach((section, index) => {
            sectionRefs.current[index] = React.createRef();
          });
        } else {
          console.error("Unexpected data structure:", data);
        }
      } catch (error) {
        console.error("Error fetching module data:", error);
      }
    }

    loadModuleData();

    // Reset state variables when the module changes
    setSelectedQuizAnswers({});
    setQuizAttempts({});
    setShowQuizFeedback(false);
    setActiveQuiz(null);
    setShowReview(false);
    setReview(null);
    setScoreResult(null);
    setNextModule(null);
  }, [domain_name, course_name, module_name, module_difficulty]);

  useEffect(() => {
    if (moduleData) {
      console.log("Module Data:", moduleData);
    }
  }, [moduleData]);

  const scrollToSection = (index) => {
    sectionRefs.current[index].current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const handleQuizStart = (index) => {
    setActiveQuiz(index);
  };

  const handleQuizAnswer = (sectionIndex, questionIndex, answerIndex) => {
    const quizKey = `${sectionIndex}-${questionIndex}`;
    if (!quizAttempts[quizKey]) {
      setQuizAttempts(prev => ({ ...prev, [quizKey]: true }));
      setSelectedQuizAnswers(prev => ({
        ...prev,
        [quizKey]: answerIndex
      }));
      setShowQuizFeedback(true);
      setActiveQuiz(null);

      // Check if all MCQs have been attempted
      const allMCQsAttempted = moduleData.content.every((section, sIndex) => 
        !section.mcq_questions ||
        section.mcq_questions?.every((_, qIndex) => 
          quizAttempts[`${sIndex}-${qIndex}`] || (sIndex === sectionIndex && qIndex === questionIndex)
        )
      );

      if (allMCQsAttempted) {
        setShowReview(true);
      }
    }
  };

  const handleReview = (value) => {
    setReview(value);
    setShowReview(false);
  };


  // Function to handle progression to the next module
const handleNextModule = async () => {
  const allMCQsAttempted = moduleData.content.every((section, sIndex) =>
    section.mcq_questions?.every((_, qIndex) => quizAttempts[`${sIndex}-${qIndex}`] || false)
  );

  if (!review) {
    setShowWarning(true);
  } else {
    const result = allMCQsAttempted
      ? ScoreCalculator({ selectedQuizAnswers, moduleData })
      : "averageOrAboveAverageScore"; // Default score when MCQs don't exist

    setScoreResult(result);

    const nextModuleAction = NextModuleInference({ score: result, Review: review, difficulty: module_difficulty });
    setNextModule(nextModuleAction);

    console.log("Next module action:", nextModuleAction);

    // Fetch user id and course details
    // Fetch user data from Firestore
    const userDocRef = doc(db, "users", userId); // Assuming userId is available
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
        console.error("User document does not exist!");
        return; // Exit if user data does not exist
    }

  const userDataUpdated = userDoc.data(); // Get user data
  console.log("User Data:", userDataUpdated); // Log the entire user data for debugging
  const courseDetailsData = userDataUpdated.courseDetails[course_name];

  console.log("course details till now: ", courseDetailsData)
  
    let currentModuleIndex = null;
    for (let i = 0; i < courseDetailsData.unlockedModules.length; i++) {
      const moduleName = courseDetailsData.unlockedModules[i].name.trim().normalize();
      if (moduleName === module_name.trim().normalize()) {
        currentModuleIndex = i;
        break; // Stop the loop once we find the match
      }
    }


    // Check if the module was found
    if (currentModuleIndex !== null) {
      console.log("Current module index:", currentModuleIndex);
      // Proceed with actions for the current module
    } else if (courseDetailsData.unlockedModules.length === 0) {
      console.log("Error: unlockedModules array is empty.");
      // Handle empty array case if necessary
    } else {
      console.log(`Error: Module "${module_name}" not found in unlockedModules.`);
      // Optional: log available module names for troubleshooting
      console.log("Available modules:", courseDetailsData.unlockedModules.map(mod => mod.name));
      // Additional fallback or error handling logic can go here
    }


    if (nextModuleAction === "next_module") {
      console.log("nextModuleAction: ", nextModuleAction);

      // Mark the current module as complete in a copy of unlockedModules
      const updatedUnlockedModules = [...courseDetailsData.unlockedModules];
      console.log("Initial unlockedModules:", updatedUnlockedModules);
      
      // Update the current module's 'isComplete' status
      updatedUnlockedModules[currentModuleIndex] = {
        ...updatedUnlockedModules[currentModuleIndex],
        isComplete: true, // Mark as complete
      };
      console.log(`Updated unlockedModules at index ${currentModuleIndex}:`, updatedUnlockedModules);

    
      // Retrieve the next module from lockedModules to unlock
      const [nextUnlockedModule, ...remainingLockedModules] = courseDetailsData.lockedModules;
      console.log("Next module to unlock from lockedModules:", nextUnlockedModule);
      console.log("Remaining lockedModules after unlocking the next module:", remainingLockedModules);
    
      // Add the next module to unlockedModules if available
      if (nextUnlockedModule) {
        updatedUnlockedModules.push({
          ...nextUnlockedModule, // Ensure to include all properties of the next module
          isComplete: false, // Explicitly set isComplete to false for the new module
        });
        console.log("Updated unlockedModules after adding the next module:", updatedUnlockedModules);
      } else {
        console.log("No more modules to unlock.");
      }
    
    
      // Update the completedModules array with the current module's name
      const updatedCompletedModules = arrayUnion(updatedUnlockedModules[currentModuleIndex].name);
      console.log("Updated completedModules with current module name:", updatedCompletedModules);

      // Navigate to the new module if there's one to unlock
      const newModuleName = nextUnlockedModule ? nextUnlockedModule.name : null;
      const newDifficultyParam = "standard";
    
      // Log the new module name and the new URL for debugging
      if (newModuleName) {
        console.log("new module name: ", newModuleName);
        console.log(`New URL: /dashboard/coursePage/${newModuleName}?domain=${domain_name}&course=${course_name}&module=${newModuleName}&difficulty=${newDifficultyParam}`);
      }
    
      // Firestore update
      await updateDoc(userDocRef, {
        [`courseDetails.${course_name}.completedModules`]: updatedCompletedModules,
        [`courseDetails.${course_name}.unlockedModules`]: updatedUnlockedModules,
        [`courseDetails.${course_name}.lockedModules`]: remainingLockedModules,
      });

      if(remainingLockedModules.length === 0){
        console.log("All modules unlocked. Redirecting to /dashboard.");
        router.push("/dashboard"); 
      }else{
        // Redirect to the new module page if available
        if (newModuleName) {
        router.push(`/dashboard/coursePage/${newModuleName}?domain=${domain_name}&course=${course_name}&module=${newModuleName}&difficulty=${newDifficultyParam}`);
      }
      }
    
      
    } else if (nextModuleAction === "easy" || nextModuleAction === "easiest") {
      // Get the new difficulty level
      const newDifficulty = nextModuleAction;
    
      // Copy the unlockedModules array and update only the current module's difficulty
      const updatedUnlockedModules = [...courseDetailsData.unlockedModules];
      
      updatedUnlockedModules[currentModuleIndex] = {
        ...updatedUnlockedModules[currentModuleIndex], // Preserve other properties
        difficulty: newDifficulty // Update only the difficulty property
      };
    
      // Update the entire array in Firestore to ensure no data is lost
      await updateDoc(userDocRef, {
        [`courseDetails.${course_name}.unlockedModules`]: updatedUnlockedModules
      });

      setPopupVisible(true);
    
      // Redirect to the updated module page with the new difficulty
      router.push(`
        /dashboard/coursePage/${updatedUnlockedModules[currentModuleIndex].name}?domain=${domain_name}&course=${course_name}&module=${updatedUnlockedModules[currentModuleIndex].name}&difficulty=${newDifficulty}
      `);
    } 

    console.log("Navigating to next module");
  }
};
  

const handlePopupClose = () => {
  setPopupVisible(false);
};

  const mapCorrectAnswer = (answer) => {
    const answerMap = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
    return answerMap[answer];
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow fixed top-0 left-0 right-0 z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href={`/dashboard/coursePage?domain=${domain_name}&course=${course_name}`} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="ml-4 text-xl font-bold text-gray-900 dark:text-white truncate">
              {moduleData ? moduleData.title : 'Loading...'}
            </h1>
          </div>
          <button
            onClick={handleBookmark}
            className={`p-2 rounded-full ${bookmarked ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'} hover:bg-blue-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600`}
          >
            <BookmarkIcon className="h-6 w-6" />
          </button>
        </div>
      </header>

      <main className="pt-16 pb-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Table of Contents */}
          <nav className="my-8">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Table of Contents</h2>
            <ul className="space-y-2">
              {moduleData && moduleData.content.map((section, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(index)}
                    className="text-left text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                  >
                    {section.subheading}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Module Content */}
          {moduleData && moduleData.content.map((section, sectionIndex) => (
            <div key={sectionIndex} ref={sectionRefs.current[sectionIndex]} className="mb-12 shadow-lg border rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">{section.subheading}</h2>
              <div className="prose dark:prose-invert max-w-none mb-6">
                <p>{section.text}</p>
              </div>

              {section.code_example && (
  <div className="bg-gray-800 rounded-lg p-4 mb-6">
    {Array.isArray(section.code_example) ? (
      // If code_example is an array of strings
      typeof section.code_example[0] === "string" ? (
        section.code_example.map((line, lineIndex) => (
          <pre key={lineIndex} className="text-white overflow-x-auto">
            <code>{line}</code>
          </pre>
        ))
      ) : (
        // If code_example is an array of objects
        section.code_example.map((file, fileIndex) => (
          <div key={fileIndex} className="mb-4">
            <h3 className="text-lg font-medium text-gray-200 mb-2">{file.filename}</h3>
            <pre className="text-white overflow-x-auto">
              <code>{file.code}</code>
            </pre>
          </div>
        ))
      )
    ) : (
      // If code_example is a string
      <pre className="text-white overflow-x-auto">
        <code>{section.code_example}</code>
      </pre>
    )}
  </div>
)}


              {section.video_link && typeof section.video_link === 'string' && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Video Tutorial</h3>
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      src={section.video_link.replace('watch?v=', 'embed/')}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-96 rounded-lg" // Increased height here
                    ></iframe>
                  </div>
                </div>
              )}

              {section.additional_text && (
                <div className="prose dark:prose-invert max-w-none mb-6">
                  <p>{section.additional_text}</p>
                </div>
              )}

              {section.mcq_questions && section.mcq_questions.map((quiz, quizIndex) => (
                <div key={quizIndex} className="mt-6 bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Quiz</h3>
                  {!quizAttempts[`${sectionIndex}-${quizIndex}`] ? (
                    activeQuiz === `${sectionIndex}-${quizIndex}` ? (
                      <div>
                        <p className="mb-4 text-gray-700 dark:text-gray-300">{quiz.question}</p>
                        <div className="space-y-2">
                          {quiz.options.map((option, optionIndex) => (
                            <button
                              key={optionIndex}
                              onClick={() => handleQuizAnswer(sectionIndex, quizIndex, optionIndex)}
                              className="w-full text-left p-2 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-150 ease-in-out"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleQuizStart(`${sectionIndex}-${quizIndex}`)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-150 ease-in-out"
                      >
                        Start Quiz
                      </button>
                    )
                  ) : (
                    <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded">
                      <p className="text-gray-900 dark:text-white">
                        {selectedQuizAnswers[`${sectionIndex}-${quizIndex}`] === mapCorrectAnswer(quiz.correct_answer)
                          ? "Correct! Well done."
                          : `Incorrect. The correct answer was: ${quiz.options[mapCorrectAnswer(quiz.correct_answer)]}`}
                      </p>
                    </div>
                  )}
                </div>
              ))}

              {/* Render key points as a fallback */}
          {section.key_points && section.key_points.length > 0 && (
            <ul>
              {section.key_points.map((point, idx) => (
                <li key={idx}>
                  {/* Render category if it exists */}
                  {point.category && <strong>{point.category}:</strong>}
                  {/* Render technologies only if available */}
                  {point.technologies && point.technologies.length > 0 && (
                    <ul>
                      {point.technologies.map((tech, techIndex) => (
                        <li key={techIndex}>{tech}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}

              {/* Steps */}
              {section.steps && (
                <ol className="list-decimal pl-6 space-y-4">
                  {section.steps.map((step, idx) => (
                    <li key={idx}>
                      <p className="font-semibold text-gray-900 dark:text-white mb-1">
                        {step.step}
                      </p>
                      {step.description && (
                        <p className="text-gray-700 dark:text-gray-300 mb-2">
                          {step.description}
                        </p>
                      )}
                      {step.code_example && (
                        <pre className="bg-gray-800 text-white p-3 rounded mb-2">
                          <code>{step.code_example}</code>
                        </pre>
                      )}
                      {step.additional_text && (
                        <p className="text-gray-600 dark:text-gray-400">
                          {step.additional_text}
                        </p>
                      )}
                    </li>
                  ))}
                </ol>
              )}
            </div>
          ))}

          

        {/* Conclusion */}
        {moduleData?.content?.some((section) => section.key_points) && (
          <section className="my-8">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Conclusion
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              {moduleData.content
                .filter((section) => section.key_points)
                .map((section, idx) =>
                  section.key_points.map((point, subIdx) => (
                    <li key={`${idx}-${subIdx}`} className="text-gray-700 dark:text-gray-300">
                      {point}
                    </li>
                  ))
                )}
            </ul>
          </section>
        )}


          {showReview && (
            <div className="mt-12 bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">How would you rate this module?</h3>
              <div className="flex justify-center space-x-8">
                <button onClick={() => handleReview('happy')} className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">
                  <ThumbsUp className="h-8 w-8" />
                </button>
                <button onClick={() => handleReview('neutral')} className="text-gray-600 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400">
                  <Meh className="h-8 w-8" />
                </button>
                <button onClick={() => handleReview('sad')} className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400">
                  <ThumbsDown className="h-8 w-8" />
                </button>
              </div>
            </div>
          )}

          {popupVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white dark:bg-gray-800 rounded shadow-lg p-6 max-w-sm">
              <h4 className="font-bold text-lg text-gray-900 dark:text-white">Notice</h4>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                Based on your answers and review, we shall be providing you an easier level module before moving on...
              </p>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handlePopupClose}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}

          {showWarning && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Warning</h2>
                <p className="mb-4">Please complete all quizzes and provide a review before proceeding to the next module.</p>
                <button onClick={() => setShowWarning(false)} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-150 ease-in-out">
                  Okay
                </button>
              </div>
            </div>
          )}

          <div className="fixed bottom-4 right-4">
            <button
              onClick={handleNextModule}
              className="p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-150 ease-in-out"
            >
              Next Module
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}