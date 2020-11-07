import React from 'react';

const AppContext = React.createContext({
    email: '',
    setEmail: () => {},
    token: '',
    setToken: () => {},
    searchedTickets: [],
    setSearchedTickets: () => {},
    ticketsInCart: new Set(),
    setTicketsInCart: () => {}
});

export default AppContext;
