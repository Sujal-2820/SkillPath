// src/app/onboarding/page.js

'use client'

import { useState, useEffect, useRef } from 'react'
import { ArrowLeft, ArrowRight, HelpCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getAuth, updateProfile } from 'firebase/auth'
import { db } from '../../../firebase';
import { doc, setDoc } from 'firebase/firestore'
import addCourseToUser from '../components/AddCourseToUser'

const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert']

const questions = {
  initial: [
    { id: 'fullName', type: 'text', question: 'What is your full name?', tooltip: 'Write your full name correctly as this would appear on your certificate.', defaultValue: "" },
    { id: 'skillDomain', type: 'select', question: 'Which skill domain are you interested in?', options: ['Web Development', 'App Development', 'AI/ML', 'Data Analytics'], defaultValue: "Web Development" },
  ],
  'Web Development': [
    { id: 'html', type: 'range', question: 'How comfortable are you with HTML structure, elements, and attributes?', defaultValue: 5 },
    { id: 'css', type: 'range', question: 'How well do you understand CSS properties, selectors, and layout techniques?', defaultValue: 5 },
    { id: 'javascript', type: 'range', question: 'What is your experience with JavaScript syntax, DOM manipulation, and event handling?', defaultValue: 5 },
    { id: 'frameworks', type: 'range', question: 'Are you familiar with popular web frameworks like React, Angular, or Vue.js?', defaultValue: 5 },
    { id: 'versionControl', type: 'range', question: 'Do you have experience with version control systems like Git?', defaultValue: 5 },
  ],
  'App Development': [
    { id: 'platform', type: 'select', question: 'Which platform do you prefer to develop apps for?', options: ['iOS', 'Android', 'Both'] },
    { id: 'programmingLanguages', type: 'range', question: 'Are you familiar with Swift (for iOS) or Kotlin (for Android)?', defaultValue: 5 },
    { id: 'developmentTools', type: 'range', question: 'Have you used development environments like Xcode or Android Studio?', defaultValue: 5 },
    { id: 'uiuxDesign', type: 'range', question: 'Do you have experience designing user interfaces and user experiences for mobile apps?', defaultValue: 5 },
    { id: 'appStoreDeployment', type: 'range', question: 'Are you familiar with the process of submitting apps to the App Store or Google Play Store?', defaultValue: 5 },
  ],
  'AI/ML': [
    { id: 'mlAlgorithms', type: 'range', question: 'Are you familiar with common machine learning algorithms like linear regression, decision trees, or neural networks?', defaultValue: 5 },
    { id: 'python', type: 'range', question: 'Do you have experience with Python, the primary language for AI/ML development?', defaultValue: 5 },
    { id: 'dataPreprocessing', type: 'range', question: 'Are you comfortable with data cleaning, normalization, and feature engineering?', defaultValue: 5 },
    { id: 'libraries', type: 'range', question: 'Have you used popular AI/ML libraries like TensorFlow, PyTorch, or scikit-learn?', defaultValue: 5 },
    { id: 'cloudPlatforms', type: 'range', question: 'Are you familiar with cloud platforms like Google Cloud Platform or AWS for AI/ML applications?', defaultValue: 5 },
  ],
  'Data Analytics': [
    { id: 'dataVisualization', type: 'range', question: 'Do you have experience with data visualization tools or libraries like Tableau, Power BI, or Matplotlib?', defaultValue: 5 },
    { id: 'sql', type: 'range', question: 'Are you proficient in SQL for querying and manipulating databases?', defaultValue: 5 },
    { id: 'statisticalAnalysis', type: 'range', question: 'Are you comfortable with statistical concepts and methods?', defaultValue: 5 },
    { id: 'dataCleaningPreparation', type: 'range', question: 'Do you have experience with data cleaning, preprocessing, and transformation?', defaultValue: 5 },
    { id: 'dataMining', type: 'range', question: 'Are you familiar with data mining techniques like clustering, classification, and association rule mining?', defaultValue: 5 },
  ],
};

export default function onboarding() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [currentQuestions, setCurrentQuestions] = useState([...questions.initial])
  const questionRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    if (answers.skillDomain) {
      setCurrentQuestions([...questions.initial, ...questions[answers.skillDomain]])
    }
  }, [answers.skillDomain])

  const handleInputChange = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }))
  }

  const handleNavigation = (direction) => {
    if (direction === 'prev' && currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    } else if (direction === 'next' && currentStep < currentQuestions.length - 1) {
      setCurrentStep(prev => prev + 1)
    }

    if (questionRef.current) {
      questionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth(); // Get the Auth instance
    const user = auth.currentUser; // Get the current user

    if (user) {
        try {
            // Update displayName in Firebase Auth
            await updateProfile(user, {
                displayName: answers.fullName // Set the displayName
            });
            console.log('User displayName updated successfully.');

            // Save user profile data to Firestore
            const userDocRef = doc(db, 'users', user.uid);

            // Prepare the data to submit
            const dataToSubmit = {
                fullName: answers.fullName || "",
                skillDomain: answers.skillDomain || "",
                createdAt: new Date(),
            };

            const selectedDomain = answers.skillDomain;
            if (questions[selectedDomain]) {
                questions[selectedDomain].forEach((question) => {
                    const answerValue = answers[question.id] !== undefined ? answers[question.id] : question.defaultValue || null;
                    dataToSubmit[question.id] = answerValue;
                });
            }

            // Here is where you implement your course matching logic based on user responses
            const matchedCourse = matchCourseBasedOnAnswers(answers);
            dataToSubmit.matchedCourse = matchedCourse;

            // Store all answers for the selected domain and the matched course
            await setDoc(userDocRef, dataToSubmit);
            console.log('User profile data and course saved to Firestore successfully.');

           
            await addCourseToUser(user.uid, dataToSubmit.skillDomain, dataToSubmit.matchedCourse);
            router.push('/dashboard');
        } catch (error) {
            console.error('Error updating displayName or saving to Firestore:', error);
        }
    }
};

const matchCourseBasedOnAnswers = (answers) => {
  // Web Development Conditions
  if (
    answers.skillDomain === 'Web Development' &&
    answers.html >= 7 && 
    answers.css >= 7 &&
    answers.javascript >= 7 &&
    answers.frameworks >= 6 // Matching the 'frameworks' question
  ) {
    return 'Full-Stack Web Development';
  } else if (
    answers.skillDomain === 'Web Development' &&
    answers.html >= 4 && 
    answers.css >= 4 &&
    answers.javascript >= 4 &&
    answers.frameworks >= 4
  ) {
    return 'Intermediate Web Development';
  } else if (
    answers.skillDomain === 'Web Development' &&
    answers.html < 4 && 
    answers.css < 4 &&
    answers.javascript < 4 &&
    answers.frameworks <= 3
  ) {
    return 'Introduction to Web Development';
  }

  // AI/ML Conditions
  if (
    answers.skillDomain === 'AI/ML' &&
    answers.python >= 7 && 
    answers.mlAlgorithms >= 7 && // Matching the 'mlAlgorithms' question
    answers.dataPreprocessing >= 7 && // Matching the 'dataPreprocessing' question
    answers.libraries >= 6 // Matching the 'libraries' question
  ) {
    return 'Deep Learning';
  } else if (
    answers.skillDomain === 'AI/ML' &&
    answers.python >= 5 && 
    answers.mlAlgorithms >= 5 &&
    answers.dataPreprocessing >= 5 &&
    answers.libraries >= 4
  ) {
    return 'Applied Machine Learning';
  } else if (
    answers.skillDomain === 'AI/ML' &&
    answers.python < 5 && 
    answers.mlAlgorithms < 5 &&
    answers.dataPreprocessing < 5 &&
    answers.libraries <= 3
  ) {
    return 'Introduction to AI and ML';
  }

  // Data Analytics Conditions
  if (
    answers.skillDomain === 'Data Analytics' &&
    answers.sql >= 6 && // Matching the 'sql' question
    answers.dataVisualization >= 6 && // Matching the 'dataVisualization' question
    answers.statisticalAnalysis >= 6 && // Matching the 'statisticalAnalysis' question
    answers.dataCleaningPreparation >= 5 // Matching the 'dataCleaningPreparation' question
  ) {
    return 'Practical Data Analysis';
  } else if (
    answers.skillDomain === 'Data Analytics' &&
    answers.sql >= 4 && 
    answers.dataVisualization >= 4 &&
    answers.statisticalAnalysis >= 4 &&
    answers.dataCleaningPreparation >= 3
  ) {
    return 'Data Science Specialization';
  } else if (
    answers.skillDomain === 'Data Analytics' &&
    answers.sql < 4 && 
    answers.dataVisualization < 4 &&
    answers.statisticalAnalysis < 4 &&
    answers.dataCleaningPreparation <= 2
  ) {
    return 'Data Analysis Fundamentals';
  }

  // App Development Conditions
  if (
    answers.skillDomain === 'App Development' &&
    answers.programmingLanguages >= 7 && // Matching the 'programmingLanguages' question
    answers.uiuxDesign >= 7 && // Matching the 'uiuxDesign' question
    answers.developmentTools >= 6 // Matching the 'developmentTools' question
  ) {
    return 'Hands-On App Development';
  } else if (
    answers.skillDomain === 'App Development' &&
    answers.programmingLanguages >= 4 && 
    answers.uiuxDesign >= 4 &&
    answers.developmentTools >= 4
  ) {
    return 'Cross-Platform App Development';
  } else if (
    answers.skillDomain === 'App Development' &&
    answers.programmingLanguages < 4 && 
    answers.uiuxDesign < 4 &&
    answers.developmentTools <= 3
  ) {
    return 'Mobile App Development Basics';
  }

  // Fallback for unmatched cases
  return 'General Beginner Course';
};



  const currentQuestion = currentQuestions[currentStep]

  const renderInput = () => {
    switch (currentQuestion.type) {
      case 'text':
        return (
          <input
            type="text"
            id={currentQuestion.id}
            value={answers[currentQuestion.id] || ''}
            onChange={(e) => handleInputChange(currentQuestion.id, e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm h-12"
            required
          />
        )
      case 'select':
        return (
          <select
            id={currentQuestion.id}
            value={answers[currentQuestion.id] || ''}
            onChange={(e) => handleInputChange(currentQuestion.id, e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm h-12"
            required
          >
            <option value="">Select an option</option>
            {currentQuestion.options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        )
      case 'range':
        return (
          <div className="mt-4">
            <input
              type="range"
              id={currentQuestion.id}
              min="1"
              max="10"
              value={answers[currentQuestion.id] || 5}
              onChange={(e) => handleInputChange(currentQuestion.id, e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs mt-2">
              {skillLevels.map((level, index) => (
                <span key={level} className={`${index === 0 ? 'text-left' : index === skillLevels.length - 1 ? 'text-right' : 'text-center'}`}>
                  {level}
                </span>
              ))}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          We would like to know more about you
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          to provide the best learning path you need
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div ref={questionRef}>
              <label htmlFor={currentQuestion.id} className="block text-sm font-medium text-gray-700">
                {currentQuestion.question}
                {currentQuestion.tooltip && (
                  <span className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer" title={currentQuestion.tooltip}>
                    <HelpCircle className="inline-block w-4 h-4" />
                  </span>
                )}
              </label>
              {renderInput()}
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => handleNavigation('prev')}
                disabled={currentStep === 0}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </button>
              <button
                type="button"
                onClick={() => handleNavigation('next')}
                disabled={currentStep === currentQuestions.length - 1}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>

            {currentStep === currentQuestions.length - 1 && (
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Complete Onboarding
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}