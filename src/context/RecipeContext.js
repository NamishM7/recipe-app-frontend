import React, { createContext, useReducer } from 'react';
const RecipeContext = createContext();

const initialState = {
    user: null,
    recipes: []
};
const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload };
        case 'SET_RECIPES':
            return { ...state, recipes: action.payload };
        default:
            return state;
    }
};
export const RecipeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <RecipeContext.Provider value={{ state, dispatch }}>
            {children}
        </RecipeContext.Provider>
    );
};

export default RecipeContext;