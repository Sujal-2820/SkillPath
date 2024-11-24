import React from 'react';
import { Lock } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ModuleList = ({ unlockedModules=[], lockedModules=[] }) => {
  console.log("unlockedModules passed to ModuleList.js: ", unlockedModules);
  console.log("lockedModules passed to ModuleList.js: ", lockedModules);

  const router = useRouter();

  return (
    <div className="space-y-4">
      {unlockedModules.map((module, index) => (
        <div 
          key={`unlocked-${module}-${index}`}
          className={`relative bg-white rounded-lg shadow-md overflow-hidden ${index === 0 ? '' : 'filter blur-sm'}`}
        >
          <div className="flex items-center p-4">
            <div className="flex-shrink-0 h-20 w-16 mr-4">
              <Image 
                src={module.poster || '/placeholder.svg?height=64&width=64'} 
                alt={module.title} 
                width={64} 
                height={64} 
                className="rounded"
              />
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-semibold">{module.title}</h3>
              <p className="text-sm text-gray-500">{module.description}</p>
            </div>
            {index === 0 ? (
              <button onClick={() => router.push(`/dashboard/coursePage/${module.id}`)} className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                Start
              </button>
            ) : (
              <div className="relative group">
                <Lock className="text-gray-400 w-6 h-6" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  Please complete previous module to continue
                </div>
              </div>
            )}
          </div>
          {module.status !== "Complete" && (
            <div className="absolute bottom-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
              Incomplete
            </div>
          )}
        </div>
      ))}
      {/* Render locked modules, blurred */}
      {lockedModules.map((module) => (
        <div key={`locked-${module}-${index}`} className="relative bg-white rounded-lg shadow-md overflow-hidden filter blur-sm">
          <div className="flex items-center p-4">
            <div className="flex-shrink-0 h-20 w-16 mr-4">
              <Image 
                src={module.poster || '/placeholder.svg?height=64&width=64'} 
                alt={module.title} 
                width={64} 
                height={64} 
                className="rounded"
              />
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-semibold">{module.title}</h3>
              <p className="text-sm text-gray-500">{module.description}</p>
            </div>
            <div className="relative group">
              <Lock className="text-gray-400 w-6 h-6" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                This module is locked.
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ModuleList;
