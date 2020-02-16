import React from 'react';
import CategoryList from '../components/CategoryList';
import AddSite from '../components/AddSite';
import AddCategory from '../components/AddCategory';
import DebugTools from '../components/DebugTools';

export default () => (
    <main>
        <CategoryList />
        <AddSite />
        <AddCategory />
        <DebugTools />
    </main>
);