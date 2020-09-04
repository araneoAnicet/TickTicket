import React from 'react';
import NavBar from './components/Navbar';
import SearchersContainer from './components/SearchersContainer';
import AppBackground from './components/AppBackground';
import './App.css';

function App() {
  return (
    <div>
      <AppBackground>
      <NavBar/>
      <SearchersContainer/>
      </AppBackground>
    </div>
  );
}

export default App;
