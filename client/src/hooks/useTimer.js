import { useState, useEffect } from 'react';

export const useTimer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval = null;
    
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    } else if (!isRunning && seconds !== 0) {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = (taskName = 'General Task') => {
    setCurrentTask(taskName);
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
    // Here you would typically save the time entry
    console.log(`Stopped timer for ${currentTask}: ${formatTime(seconds)}`);
  };

  const resetTimer = () => {
    setSeconds(0);
    setIsRunning(false);
    setCurrentTask(null);
  };

  return {
    isRunning,
    currentTask,
    duration: formatTime(seconds),
    seconds,
    startTimer,
    stopTimer,
    resetTimer
  };
};