import React from 'react';
import NavBar from './components/Navbar';
import SearchersContainer from './components/SearchersContainer';
import AppBackground from './components/AppBackground';
import TicketsContainer from './components/TicketsContainer';
import './App.css';

function App() {
  return (
    <div>
      <AppBackground>
      <NavBar/>
      <SearchersContainer/>
      <hr/>
      <h2 className="text-center">
        Recommended tickets
      </h2>
      <TicketsContainer/>
      </AppBackground>
    </div>
  );
}

export default App;
