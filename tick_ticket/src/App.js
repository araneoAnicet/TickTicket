import React from 'react';
import NavBar from './components/Navbar';
import SearchersContainer from './components/SearchersContainer';
import AppBackground from './components/AppBackground';
import Ticket from './components/Ticket';
import './App.css';

function App() {
  return (
    <div>
      <AppBackground>
      <NavBar/>
      <SearchersContainer/>
      <Ticket
      id={3831749}
      departureDate={'18:00'}
      arriveDate={'5:23'}
      price={19}
      currencyName={'USD'}
      departureCityName={'Berlin'}
      arriveCityName={'Warsaw'}
      />
      </AppBackground>
    </div>
  );
}

export default App;
