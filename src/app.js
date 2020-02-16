import React, { createContext, useContext } from 'react';
import HomePage from './pages/HomePage';
import Store from './Store';
import { db } from './utils';

export default () => {
    const initialState = {
        categories: db.categories.get(),
        options: db.options.get()
    };
    initialState.categories = initialState.categories.map(category => ({ id: category, sites: db.sites.get(category) }));
    
    const reducer = (state = initialState, action) => {
        switch (action.type) {
            case 'ADD_CATEGORY': {
                const newCategories = state.categories[action.data];

                return {
                    ...state,
                    categories: {
                        ...state.categories,
                        
                    }
                };
            }
            default:
            return state;
        }
    };

    return (
        <Store initialState={initialState} reducer={reducer}>
            <HomePage />
        </Store>
    );
};
