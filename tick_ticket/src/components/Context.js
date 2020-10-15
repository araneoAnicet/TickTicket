import React, {useContext, useState} from 'react';

const [token, setToken] = useState('');

function updateToken(token) {
    setToken(token);
    localStorage.setItem('token', token);
}

const AppContext = useContext({
    token: token,
    setToken: updateToken
});

export default AppContext;
