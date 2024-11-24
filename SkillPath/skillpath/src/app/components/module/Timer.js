// src/app/components/module/Timer.js

import React, { useEffect, useState } from 'react';

const Timer = ({ initialTime, onTimeout }) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      onTimeout();
    }
  }, [timeRemaining, onTimeout]);

  return (
    <div className="mt-4 text-gray-600 dark:text-gray-400">
      Time remaining: {timeRemaining}s
    </div>
  );
};

export default Timer;
