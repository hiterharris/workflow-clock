import React from 'react';
import Timer from './components/Timer';
import NumberPicker from './components/NumberPicker';

import './App.css';

const App = () => {
  return (
    <div className="App">
      <NumberPicker />
      <Timer />
    </div>
  );
}

export default App;
