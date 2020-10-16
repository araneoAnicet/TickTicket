import React from 'react';

const AppContext = React.createContext({
    email: '',
    setEmail: () => {},
    token: '',
    setToken: () => {}
});

export default AppContext;
