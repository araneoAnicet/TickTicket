import React, {useState} from 'react';
import NavBar from './components/Navbar';
import AppBackground from './components/AppBackground';
import AppContext from './components/Context';
import './App.css';


function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [email, setEmail] = useState();
  
  fetch('http://localhost:8000/api/check_token', {
    method: 'POST',
            mode: 'cors',
            dataType: 'json',
            contentType: 'application/json',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorize': `Token ${localStorage.getItem('token')}`
            }
  }).then((response) => {
    return response.json();
  }).then((data) => {
    if (data.email) {
      setEmail(data.email);
    } else {
      localStorage.setItem('token', '');
    }
  })

  return (
    <AppContext.Provider
      value={{
        email: email,
        setEmail: (email) => {
          localStorage.setItem('email', email);
          setEmail(email);
        },
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
