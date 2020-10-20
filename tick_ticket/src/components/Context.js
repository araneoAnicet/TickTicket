import React from 'react';

const AppContext = React.createContext({
    email: '',
    setEmail: () => {},
    token: '',
    setToken: () => {},
    searchedTickets: [],
    setSearchedTickets: () => {}
});

export default AppContext;
