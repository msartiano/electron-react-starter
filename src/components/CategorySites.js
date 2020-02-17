import React from 'react';

import { useStore } from '../Store';
import { getLowestPriceInCategory } from '../utils';
import CategorySite from './CategorySite';

export default ({ category }) => {
    const [store, dispatch] = useStore();

    const defaultTimeLeft = 600; // 10 minutes
    const hotSiteInCategory = getLowestPriceInCategory(category);

    return (
        <div class="single-category">
            <table id="sites-table">
                {store.sites[category].map((site, index) => (
                    <CategorySite
                        category={category}
                        site={site}
                        hotSiteInCategory={hotSiteInCategory}
                        defaultTimeLeft={defaultTimeLeft}
                        siteIndex={index}
                    />
                ))}
            </table>
        </div>
    );
};