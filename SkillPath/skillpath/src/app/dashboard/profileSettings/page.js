'use client'

import React, { useState } from 'react'
import { Eye, EyeOff, Plus, Trash2, Save, MapPin, Lock } from 'lucide-react'
import Navbar from '@/app/components/dashboard/Navbar'
import Footer from '@/app/components/dashboard/Footer'
import { useRouter } from 'next/navigation'

const avatars = [
  'https://cdn-icons-png.flaticon.com/128/1354/1354202.png',
  'https://cdn-icons-png.flaticon.com/128/3344/3344255.png',
  'https://cdn-icons-png.flaticon.com/128/781/781152.png',
  'https://cdn-icons-png.flaticon.com/128/1995/1995515.png',
  'https://cdn-icons-png.flaticon.com/128/3476/3476159.png',
  'https://cdn-icons-png.flaticon.com/128/10296/10296460.png',
]

const initialUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://cdn-icons-png.flaticon.com/128/1354/1354202.png',
  socialLinks: {
    linkedin: '',
    github: '',
    twitter: '',
  },
  location: {
    city: 'New York',
    country: 'USA',
    coordinates: { lat: 40.7128, lng: -74.0060 },
  },
  skills: [
    { name: 'JavaScript', value: 80 },
    { name: 'React', value: 75 },
    { name: 'Node.js', value: 70 },
  ],
  bio: '',
  interests: [],
  notifications: {
    email: true,
    push: false,
  },
  password: '********',
}

const ProfileSettings = () => {
  const router = useRouter();
  const [user, setUser] = useState(initialUser)
  const [newSkill, setNewSkill] = useState('')
  const [newInterest, setNewInterest] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showAvatars, setShowAvatars] = useState(false)
  const [publicSections, setPublicSections] = useState({
    basicInfo: false,
    socialLinks: false,
    location: false,
    skills: false,
  })
  const [showWarning, setShowWarning] = useState(false)
  const [warningMessage, setWarningMessage] = useState('')
  const [showMap, setShowMap] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false)

  const handleChange = (e, section) => {
    const { name, value, type, checked } = e.target
    if (section === 'avatar') {
      setUser(prevUser => ({ ...prevUser, avatar: value }))
      setShowAvatars(false)
      return
    }
    setUser(prevUser => ({
      ...prevUser,
      [section]: type === 'checkbox' ? { ...prevUser[section], [name]: checked } : { ...prevUser[section], [name]: value }
    }))
  }

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...user.skills]
    updatedSkills[index].value = parseInt(value)
    setUser(prevUser => ({ ...prevUser, skills: updatedSkills }))
  }

  const addSkill = () => {
    if (newSkill) {
      setUser(prevUser => ({
        ...prevUser,
        skills: [...prevUser.skills, { name: newSkill, value: 50 }]
      }))
      setNewSkill('')
    }
  }

  const removeSkill = (index) => {
    setUser(prevUser => ({
      ...prevUser,
      skills: prevUser.skills.filter((_, i) => i !== index)
    }))
  }

  const addInterest = () => {
    if (newInterest) {
      setUser(prevUser => ({
        ...prevUser,
        interests: [...prevUser.interests, newInterest]
      }))
      setNewInterest('')
    }
  }

  const removeInterest = (index) => {
    setUser(prevUser => ({
      ...prevUser,
      interests: prevUser.interests.filter((_, i) => i !== index)
    }))
  }

  const handleSave = () => {
    console.log('Saving user data:', user)
    setShowSaveConfirmation(true)
    router.push('/dashboard')
    setTimeout(() => setShowSaveConfirmation(false), 3000)
  }

  const handlePublicToggle = (section, title) => {
    setPublicSections(prev => {
      const newState = { ...prev, [section]: !prev[section] }
      if (newState[section]) {
        setWarningMessage(`Your ${title} will be publicly visible.`)
        setShowWarning(true)
      }
      return newState
    })
  }

  const handleLocationPick = () => {
    setShowMap(true)
    setTimeout(() => {
      setUser(prevUser => ({
        ...prevUser,
        location: {
          ...prevUser.location,
          coordinates: { lat: 40.7128, lng: -74.0060 }
        }
      }))
      setShowMap(false)
    }, 2000)
  }

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      setWarningMessage("Passwords don't match!")
      setShowWarning(true)
      return
    }
    setUser(prevUser => ({ ...prevUser, password: newPassword }))
    setShowChangePassword(false)
    setNewPassword('')
    setConfirmPassword('')
    setWarningMessage("Password changed successfully!")
    setShowWarning(true)
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Profile Settings</h1>

          <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={(e) => handleChange(e, 'name')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black h-12 text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={(e) => handleChange(e, 'email')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black h-12 text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Avatar</label>
                <div className="flex items-center space-x-4">
                  <img src={user.avatar} alt="Current Avatar" className="w-20 h-20 rounded-full" />
                  <button
                    onClick={() => setShowAvatars(!showAvatars)}
                    className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                  >
                    {showAvatars ? 'Hide Avatars' : 'Choose Avatar'}
                  </button>
                </div>
                {showAvatars && (
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {avatars.map((avatar, index) => (
                      <div
                        key={index}
                        className="cursor-pointer border-1 rounded-full overflow-hidden ${
                          user.avatar === avatar ? 'border-black' : 'border-transparent'
                        }"
                        onClick={() => {
                          setUser(prevUser => ({ ...prevUser, avatar }))
                          setShowAvatars(false)
                        }}
                      >
                        <img src={avatar} alt="Avatar ${index + 1}" className="w-20 h-20 object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="mt-4">
                <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">
                  Profile Image
                  <span className="ml-1 text-gray-500 text-xs" title="You can either put your image or your avatar">
                    (?)
                  </span>
                </label>
                <input
                  type="file"
                  id="profileImage"
                  name="profileImage"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        setUser(prevUser => ({ ...prevUser, avatar: e.target.result }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-black file:text-white
                    hover:file:bg-gray-800 h-12"
                />
              </div>
              {user.avatar && user.avatar.startsWith('data:image') && (
                <div className="mt-2 flex items-center">
                  <img src={user.avatar} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
                  <button
                    onClick={() => setUser(prevUser => ({ ...prevUser, avatar: avatars[0] }))}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    Delete Image
                  </button>
                </div>
              )}
            </div>

            <h2 className="text-2xl font-semibold mb-6 mt-12">Social Links</h2>
            <div className="space-y-4">
              {Object.entries(user.socialLinks).map(([platform, link]) => (
                <div key={platform}>
                  <label className="block text-sm font-medium text-gray-700 capitalize">{platform}</label>
                  <input
                    type="url"
                    name={platform}
                    value={link}
                    onChange={(e) => handleChange(e, 'socialLinks')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black h-12 text-black"
                    placeholder={`https://${platform}.com/yourusername`}
                  />
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-semibold mb-6 mt-12">Location</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  name="city"
                  value={user.location.city}
                  onChange={(e) => handleChange(e, 'location')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black h-12"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Country</label>
                <input
                  type="text"
                  name="country"
                  value={user.location.country}
                  onChange={(e) => handleChange(e, 'location')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black h-12"
                />
              </div>
              <div>
                <button
                  onClick={handleLocationPick}
                  className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors flex items-center"
                >
                  <MapPin size={20} className="mr-2" />
                  Pick Exact Location
                </button>
                {showMap && (
                  <div className="mt-2 p-4 bg-gray-100 rounded-md">
                    Loading Google Maps...
                  </div>
                )}
                {user.location.coordinates && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected coordinates: {user.location.coordinates.lat}, {user.location.coordinates.lng}
                  </p>
                )}
              </div>
            </div>

            <h2 className="text-2xl font-semibold mb-6 mt-12">Skills</h2>
            <div className="space-y-4">
              {user.skills.map((skill, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => {
                      const updatedSkills = [...user.skills]
                      updatedSkills[index].name = e.target.value
                      setUser(prevUser => ({ ...prevUser, skills: updatedSkills }))
                    }}
                    className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black h-12"
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={skill.value}
                    onChange={(e) => handleSkillChange(index, e.target.value)}
                    className="w-32"
                  />
                  <span className="w-8 text-center">{skill.value}%</span>
                  <button onClick={() => removeSkill(index)} className="text-red-500">
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a new skill"
                  className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black h-12"
                />
                <button onClick={addSkill} className="bg-black text-white p-2 rounded-md">
                  <Plus size={20} />
                </button>
              </div>
            </div>

            <h2 className="text-2xl font-semibold mb-6 mt-12">Other Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  name="bio"
                  value={user.bio}
                  onChange={(e) => setUser(prevUser => ({ ...prevUser, bio: e.target.value }))}
                  rows="3"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black h-12"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Interests</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {user.interests.map((interest, index) => (
                    <span key={index} className="bg-gray-200 px-2 py-1 rounded-full text-sm flex items-center">
                      {interest}
                      <button onClick={() => removeInterest(index)} className="ml-1 text-red-500">
                        <Trash2 size={14} />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    placeholder="Add a new interest"
                    className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black h-12"
                  />
                  <button onClick={addInterest} className="bg-black text-white p-2 rounded-md">
                    <Plus size={20} />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notifications</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="email"
                      checked={user.notifications.email}
                      onChange={(e) => handleChange(e, 'notifications')}
                      className="rounded border-gray-300 text-black focus:ring-black h-12"
                    />
                    <span className="ml-2">Email notifications</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="push"
                      checked={user.notifications.push}
                      onChange={(e) => handleChange(e, 'notifications')}
                      className="rounded border-gray-300 text-black focus:ring-black h-12"
                    />
                    <span className="ml-2">Push notifications</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Current Password</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={user.password}
                    onChange={(e) => setUser(prevUser => ({ ...prevUser, password: e.target.value }))}
                    className="block w-full pr-10 rounded-md border-gray-300 focus:border-black focus:ring-black h-12"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <button
                  onClick={() => setShowChangePassword(true)}
                  className="mt-2 text-sm text-black hover:underline flex items-center"
                >
                  <Lock size={16} className="mr-1" />
                  Change Password
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSave}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors inline-flex items-center h-12"
            >
              <Save size={20} className="mr-2" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>

        {/* Modals and Popups */}
        {showWarning && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <h3 className="text-lg font-bold mb-4">Warning</h3>
              <p>{warningMessage}</p>
              <button
                onClick={() => setShowWarning(false)}
                className="mt-4 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                Okay
              </button>
            </div>
          </div>
        )}

        {showChangePassword && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <h3 className="text-lg font-bold mb-4">Change Password</h3>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                className="block w-full mt-2 rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black h-12"
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm New Password"
                className="block w-full mt-2 rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black h-12"
              />
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => setShowChangePassword(false)}
                  className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleChangePassword}
                  className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        )}

        {showSaveConfirmation && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
            Profile details saved successfully!
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}

export default ProfileSettings
