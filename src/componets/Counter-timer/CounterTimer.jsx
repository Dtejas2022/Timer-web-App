import React, { useEffect, useRef, useState } from "react";

const CounterTimer = () => {
  const [time, setTime] = useState(0);
  const [isActive, setActive] = useState(false);
  const [isPause, setPause] = useState(false);
  const [inputValue, setInputValue] = useState(""); // New state for input
  const intervalRef = useRef(null);

  const handleInput = (e) => {
    const value = e.target.value;
    setInputValue(value); // Update input field
    setTime(value > 0 ? Number(value) * 60 : 0);
  };

  const formatTime = () => {
    const min = String(Math.floor(time / 60)).padStart(2, "0");
    const sec = String(time % 60).padStart(2, "0");
    return `${min} : ${sec}`;
  };

  const handleStart = () => {
    if (time > 0) {
      clearInterval(intervalRef.current);
      setActive(true);
      setPause(false);
    }
  };

  useEffect(() => {
    if (isActive && !isPause && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    } else if (time === 0 && isActive) {
      clearInterval(intervalRef.current);
      setActive(false);
      alert("Time is up");
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, isPause, time]);

  const handlePause = () => {
    setPause(!isPause);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setActive(false);
    setPause(false);
    setTime(0);
    setInputValue(""); // Reset input field
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6 bg-gray-100 p-4">
      <p className="text-3xl font-semibold">Counter Timer</p>
      <input
        type="number"
        className="border p-3 rounded-md w-52 text-center text-lg"
        placeholder="Enter time in minutes"
        value={inputValue} // Controlled input
        onChange={handleInput}
        min="0"
      />
      <div className="text-4xl font-bold">{formatTime()}</div>
      <div className="flex space-x-4">
        <button
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 disabled:opacity-50"
          onClick={handleStart}
          disabled={time === 0 || isActive}
        >
          Start
        </button>
        <button
          className={`px-6 py-3 rounded-lg shadow-md text-white ${
            isPause ? "bg-blue-500 hover:bg-blue-600" : "bg-yellow-500 hover:bg-yellow-600"
          }`}
          onClick={handlePause}
          disabled={!isActive}
        >
          {isPause ? "Resume" : "Pause"}
        </button>
        <button
          className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default CounterTimer;
