import React, { useState, useEffect } from 'react';
import './timer.css';
import alert from '../assets/alert.wav';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [audio] = useState(new Audio(alert));
  const [playing] = useState(false);

  // const togglePlay = () => setPlaying(!playing);

  useEffect(() => {
      playing ? audio.play() : audio.pause();
    },
    [playing, audio]
  );

  const toggle = () => {
    setIsActive(!isActive);
  }

  const reset = () => {
    setSeconds(0);
    setMinutes(0);
    setIsActive(false);
    audio.pause();
  }

  const handleChange = (e) => {
    e.preventDefault();
    setMinutes(e.target.value);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    }
    if (isActive && seconds === 0) {
        setSeconds(59);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  useEffect(() => {
    let interval = null;
    if (isActive && seconds === 0) {
        setMinutes(minutes - 1);
    }
    if (isActive && minutes === 0 && seconds === 0) {
        audio.play();
        setSeconds(0);
        setMinutes(0);
        setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, audio]);

  const zero = () => {
    if (seconds < 10) {
      return '0';
    }
  }

  const showTime = () => {
    if (isActive && (minutes > 0 || seconds > 0)) {
      return <div className="time">{minutes}:{zero()}{seconds}</div>
    } else {
      return null
    }
  }

  const showInput = () => {
    if (!isActive) {
      return <input type="text" onChange={handleChange} />
    } else {
      return null
    }
  }

  return (
    <div className="app">
        {showInput()}
        {showTime()}
      <div className="row">
        <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button className="button" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;