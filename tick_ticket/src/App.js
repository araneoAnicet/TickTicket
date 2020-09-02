import React from 'react';
import NavBar from './components/Navbar';
import Searcher from './components/Searcher';
import SearcherNav from './components/SearcherNav';
import './App.css';

function App() {
  return (
    <div>
      <NavBar/>
      <Searcher>
      <SearcherNav/>
      </Searcher>
    </div>
  );
}

export default App;
