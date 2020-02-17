import React from 'react';
import HomePage from './pages/HomePage';
import { Connect } from './Store';
import { db, sortByKey } from './utils';

export default () => {
    const initialState = {
        categories: db.categories.get() || [],
        sites: {},
        options: db.options.get()
    };
    initialState.categories.map(category => initialState.sites[category] = db.sites.get(category));
    window.initialState = initialState;

    const reducer = (state = initialState, action) => {
        switch (action.type) {
            case 'ADD_CATEGORY': {
                const currentCategory = action.data.category;
                if (state.categories.includes(currentCategory)) return state;
                const newCategories = [...state.categories, currentCategory];
                const newSites = { ...state.sites };
                newSites[currentCategory] = [];

                db.categories.set(newCategories);
                db.sites.set(currentCategory, []); // init sites for this category
                return { ...state, categories: newCategories, sites: newSites };
            }
            case 'REMOVE_CATEGORY_AND_SITES': {
                const currentCategory = action.data.category;
                const newCategories = state.categories.filter(category => category !== currentCategory);
                const newSites = { ...state.sites };
                delete newSites[currentCategory];

                db.categories.set(newCategories);
                db.sites.removeByCategory(currentCategory);
                return { ...state, categories: newCategories, sites: newSites };
            }
            case 'ADD_SITE': {
                const currentCategory = action.data.category;
                const currentSite = action.data.site;
                const sitesClone = { ...state.sites };
                let sitesInCategory = [...sitesClone[currentCategory]];
                sitesInCategory.push(currentSite);
                sitesInCategory = sortByKey(sitesInCategory, 'title');

                const newState = { ...state, sites: { ...state.sites, [currentCategory]: sitesInCategory }};

                db.sites.set(currentCategory, sitesInCategory);
                return newState;
            }
            case 'REMOVE_SITE': {
                const currentCategory = action.data.category;
                let sitesInCategory = state.sites[currentCategory].filter(site => site.id !== action.data.site.id);

                const newState = { ...state, sites: { ...state.sites, [currentCategory]: sitesInCategory }};
                db.sites.set(currentCategory, sitesInCategory);
                return newState;
            }
            default:
                return state;
        }
    };

    return (
        <Connect initialState={initialState} reducer={reducer}>
            <HomePage />
        </Connect>
    );
};
