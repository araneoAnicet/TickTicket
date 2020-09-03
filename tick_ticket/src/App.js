import React from 'react';
import NavBar from './components/Navbar';
import SearcherModeSelector from './components/SearcherModeSelector';
import './App.css';

function App() {
  return (
    <div>
      <NavBar/>
      <SearcherModeSelector/>
    </div>
  );
}

export default App;
