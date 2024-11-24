import React from 'react'

const Popup = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Notice</h2>
        <p className="mb-6">{message}</p>
        <button
          onClick={onClose}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default Popup