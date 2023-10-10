
import React, { createContext, useContext, useReducer } from 'react';

const DataContext = createContext();

const initialState = {
    vehicles: [], // Initialize with your data
    deals: [], // Initialize with your data
};

const dataReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_VEHICLES':
            return { ...state, vehicles: action.payload };
        case 'UPDATE_DEALS':
            return { ...state, deals: action.payload };
        default:
            return state;
    }
};

export const DataProvider = ({ children }) => {
    const [state, dispatch] = useReducer(dataReducer, initialState);

    return (
        <DataContext.Provider value={{ state, dispatch }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    return useContext(DataContext);
};
