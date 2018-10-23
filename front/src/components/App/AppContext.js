import React from 'react';

export const globals = {
    a : 1,
    b: "2"
};

export const AppContext = React.createContext(
    globals.b // default value
);