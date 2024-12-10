'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { db } from '../../../firebase';
import { doc, setDoc } from 'firebase/firestore'; 

export default function SignUp() {
  const auth = getAuth();
  const router = useRouter();
  const googleProvider = new GoogleAuthProvider();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log('User created:', user);

      // Store user information in Firestore
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, {
        email: user.email,
        createdAt: new Date(),
      });
      console.log("User successfully saved in firestore.")
      router.push('/onboarding');
    } catch (error) {
      console.error('Signup error:', error.message);
      setError(error.message.replace('Firebase: ', 'Error: '));
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('User signed in with Google:', user);

      // Store user information in Firestore
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, {
        email: user.email,
        createdAt: new Date(),
      });

      console.log("User successfully saved in firestore.")
      router.push('/onboarding');
    } catch (error) {
      console.error('Google Signin error:', error.message);
      setError(error.message.replace('Firebase: ', 'Error: '));
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row relative">
      {/* Left column (hidden on mobile) */}
      <div className="hidden md:flex md:w-1/2 bg-gray-50 justify-center items-center p-12">
        <div className="max-w-md">
          <h2 className="text-3xl font-bold mb-6">Start Your Learning Journey</h2>
          <p className="text-xl text-gray-600">
            Join SkillPath and unlock a world of structured learning paths designed to help you achieve your goals.
          </p>
        </div>
      </div>

      {/* Right column / Mobile full width */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24">
        <Link 
            href="/" 
            className="absolute top-4 right-4 md:top-8 md:right-8 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 ease-in-out shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to home
        </Link>
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center mb-8">
            <Link href="/" className="text-3xl font-bold text-black">
              SkillPath
            </Link>
            <h2 className="mt-6 text-2xl font-bold text-gray-900">Create your account</h2>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm text-black"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm text-black"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Sign up
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleGoogleSignup}
                className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                  <path fill="none" d="M1 1h22v22H1z" />
                </svg>
                Sign up with Google
              </button>
            </div>
          </div>

          <p className="mt-8 text-sm text-gray-600 text-center">
            Already have an account?{' '}
            <Link href="/signin" className="font-medium text-black hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Subtle background animation */}
      <div className="fixed inset-0 z-[-1] bg-gradient-to-br from-gray-50 to-white">
        <div className="absolute inset-0 bg-grid opacity-50 animate-pulse"></div>
      </div>

      {/* Error Popup */}
      {error && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
          <div className="fixed inset-x-0 top-1/2 transform -translate-y-1/2 z-50 mx-auto w-11/12 max-w-md">
            <div className="bg-white rounded-lg shadow-xl p-6 relative border-l-4 border-red-500">
              <button onClick={() => setError('')} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
              <h3 className="text-lg font-semibold text-red-700 mb-2">Error</h3>
              <p className="text-gray-700">{error}</p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
