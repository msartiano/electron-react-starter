import React from 'react';
import ItemsCategories from '../components/ItemCategories';
import AddSite from '../components/AddSite';
import AddCategory from '../components/AddCategory';
import DebugTools from '../components/DebugTools';

export default () => (
    <main>
        <ItemsCategories />
        <AddSite />
        <AddCategory />
        <DebugTools />
    </main>
);