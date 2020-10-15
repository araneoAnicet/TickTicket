import React from 'react';

const AppContext = React.createContext({
    token: '',
    setToken: () => {}
});

export default AppContext;
