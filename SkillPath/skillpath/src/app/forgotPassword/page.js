//src/app/forgotPassword/page.js

'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, ArrowLeft, Mail, AlertCircle } from 'lucide-react'

export default function ForgotPassword() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      // TODO: Implement actual email submission logic
      // This is a mock API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (email === 'error@example.com') {
            reject(new Error('Email not found'))
          } else {
            resolve(true)
          }
        }, 1000)
      })
      setStep(2)
    } catch (err) {
      setError('Failed to send reset link. Please try again.')
    }
  }

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      if (nextInput) nextInput.focus()
    }

    if (newOtp.every(digit => digit !== '')) {
      verifyOtp(newOtp.join(''))
    }
  }

  const verifyOtp = async (otpString) => {
    setError('')
    try {
      // TODO: Implement actual OTP verification logic
      // This is a mock API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (otpString === '000000') {
            reject(new Error('Invalid OTP'))
          } else {
            resolve(true)
          }
        }, 1000)
      })
      setStep(3)
    } catch (err) {
      setError('Invalid OTP. Please try again.')
    }
  }

  const handlePasswordReset = async (e) => {
    e.preventDefault()
    setError('')
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    try {
      // TODO: Implement actual password reset logic
      // This is a mock API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (newPassword.length < 8) {
            reject(new Error('Password too short'))
          } else {
            resolve(true)
          }
        }, 1000)
      })
      alert('Password reset successfully!')
    } catch (err) {
      setError('Failed to reset password. Please ensure it meets the requirements.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-grid">
      <div className="bg-background p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-foreground">Reset Your Password</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <div className="flex items-center">
              <AlertCircle className="mr-2" size={18} />
              <span>{error}</span>
            </div>
          </div>
        )}
        {step === 1 && (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="relative">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10"
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <Button type="submit" className="w-full">
              Send Reset Link <ArrowRight className="ml-2" size={18} />
            </Button>
          </form>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-4">Enter the 6-digit code sent to your email</p>
            <div className="flex justify-between">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-12 h-12 text-center text-lg"
                />
              ))}
            </div>
            <Button onClick={() => setStep(1)} variant="outline" className="w-full mt-4">
              <ArrowLeft className="mr-2" size={18} /> Back
            </Button>
          </div>
        )}
        {step === 3 && (
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <Input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={8}
            />
            <Input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
            />
            <Button type="submit" className="w-full">
              Reset Password <ArrowRight className="ml-2" size={18} />
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}