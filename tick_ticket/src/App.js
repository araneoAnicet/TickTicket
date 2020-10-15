import React, {useState} from 'react';
import NavBar from './components/Navbar';
import AppBackground from './components/AppBackground';
import AppContext from './components/Context';
import './App.css';


function App() {

  const [token, setToken] = useState(localStorage.getItem('token'));
  return (
    <AppContext.Provider
      value={{
        token: token,
        setToken: (token) => {
          localStorage.setItem('token', token);
          setToken(token);
        }
      }}
      >
      <AppBackground>
      <NavBar/>
      </AppBackground>
    </AppContext.Provider>
  );
}

export default App;
