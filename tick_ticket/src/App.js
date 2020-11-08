import React, {useState} from 'react';
import NavBar from './components/Navbar';
import AppBackground from './components/AppBackground';
import AppContext from './components/Context';
import './App.css';


function App() {
  const [searchedTickets, setSearchedTickets] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [email, setEmail] = useState('');
  const [ticketsInCart, setTicketsInCart] = useState(new Set());
  

  return (
    <AppContext.Provider
      value={{
        email: email,
        setEmail: setEmail,
        token: token,
        setToken: (token) => {
          localStorage.setItem('token', token);
          setToken(token);
        },
        searchedTickets: searchedTickets,
        setSearchedTickets: setSearchedTickets,
        ticketsInCart: ticketsInCart,
        setTicketsInCart: setTicketsInCart
      }}
      >
      <AppBackground>
      <NavBar/>
      </AppBackground>
    </AppContext.Provider>
  );
}

export default App;
