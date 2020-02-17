import React from 'react';
import { useStore } from '../Store';
import CategorySites from './CategorySites';

export default () => {
    const [store, dispatch] = useStore();

    return (
        <div className="categories">
            {store.categories.map(category => (
                <div className="single-category">
                    <div className="category-header">
                        {category}
                        <div className="remove-category">
                            <button type="button" onClick={() => dispatch('REMOVE_CATEGORY_AND_SITES', { category })}>X</button>
                        </div>
                    </div>

                    <CategorySites category={category} />
                </div>
            ))}
        </div>
    );
};
