import React from 'react';
import { useStore } from '../Store';
import CategorySites from './CategorySites';

export default () => {
    const [store, dispatch] = useStore();

    return (
        <div class="categories">
            {store.categories.map(category => (
                <div class="single-category">
                    <div class="category-header">
                        {category}
                        <div class="remove-category">
                            <button onClick={() => dispatch('REMOVE_CATEGORY_AND_SITES', { category })}>X</button>
                        </div>
                    </div>

                    <CategorySites category={category} />
                </div>
            ))}
        </div>
    );
};