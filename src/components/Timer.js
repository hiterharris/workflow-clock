import React, { useState, useEffect } from 'react';
import './timer.css';
import alert from '../assets/alert.wav';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [renderStart, setRenderStart] = useState('');
  const [audio] = useState(new Audio(alert));
  const [playing, setPlaying] = useState(false);

  const toggleActive = () => {
    setIsActive(!isActive);
  }

  const handleMinutes = (e) => {
    e.preventDefault();
    setMinutes(e.target.value);
  }

  const handleSeconds = (e) => {
    e.preventDefault();
    setSeconds(e.target.value);
  }

  const showZero = () => {
    if (seconds < 10) {
      return '0';
    }
  }

  const showInput = () => {
    if (!isActive) {
      return (
        <>
          <input type="text" placeholder='Minutes' onChange={handleMinutes} />
          <input type="text" placeholder='Seconds' onChange={handleSeconds} />
        </>
      );
    } else {
      return null
    }
  }

  const reset = () => {
    setSeconds(0);
    setMinutes(0);
    setIsActive(false);
    setPlaying(false);
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
    if (isActive && seconds === 0) {
        setMinutes(minutes - 1);
    }
    if (isActive && minutes === 0 && seconds === 0) {
        setPlaying(true);
        setSeconds(0);
        setMinutes(0);
        setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, audio]);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing, audio]);

  useEffect(() => {
    if (playing) {
      setRenderStart('hide');
    } else {
      setRenderStart('');
    }
  }, [playing])

  return (
    <div className="app">
      {showInput()}
      <div className="time">{minutes}:{showZero()}{seconds}</div>
      <div className="row">
        <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'} ${renderStart} `} onClick={toggleActive}>
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
