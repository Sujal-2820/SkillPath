// components/course/CourseCertificate.js

'use client'

import React from 'react';
import { usePDF } from 'react-to-pdf';
import { Download } from 'lucide-react';

export default function CourseCertificate({ courseNAME, userNAME}) {
  const { toPDF, targetRef } = usePDF({ filename: 'course-certificate.pdf' });

  return (
    <div className="flex flex-col items-center space-y-4">
      <div 
        ref={targetRef}
        className="relative w-[1056px] h-[816px] bg-white shadow-lg mx-auto"
      >

        {/* Certificate Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-16 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-8">Certificate of Completion</h1>
          <p className="text-2xl text-gray-600 mb-8">This is to certify that</p>
          <h2 className="text-4xl font-bold text-blue-600 mb-8">{userNAME}</h2>
          <p className="text-2xl text-gray-600 mb-8">has successfully completed the course</p>
          <h3 className="text-3xl font-bold text-gray-800 mb-12">{courseNAME}</h3>
          <p className="text-xl text-gray-600 mb-8">
            demonstrating exceptional dedication and acquiring valuable skills in the field.
          </p>
          <p className="text-xl text-gray-600">
            This achievement represents a significant milestone in professional development
            and a commitment to excellence in the pursuit of knowledge.
          </p>
        </div>
      </div>
      <button
        onClick={() => toPDF()}
        className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
      >
        <Download size={20} />
        <span>Download Certificate as PDF</span>
      </button>
    </div>
  );
}
