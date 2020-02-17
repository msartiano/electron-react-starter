import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { useStore } from '../Store';
import { throttle } from '../utils';

export default ({ category, site, defaultTimeLeft, hotSiteInCategory, siteIndex }) => {
    const [store, dispatch] = useStore();
    const [timeLeft, setTimeLeft] = useState(defaultTimeLeft);

    const throttledFetch = site => {
        throttle(() => {
            console.log('updating ' + site.id);
            setTimeLeft(defaultTimeLeft);
            dispatch('UPDATE_SITE', { category, site });
        });
    }

    useEffect(() => {
        if (timeLeft < 0) {
            setTimeLeft(-1);
            throttledFetch();
        }

        if (timeLeft > 0) {
            const timeout = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearTimeout(timeout);
        }
    }, [timeLeft]);

    let offers = [];
    if (site.offers) offers = site.offers.length > 2 ? site.offers.slice(0, 3) : site.offers;
    const isThisSiteHot = hotSiteInCategory.id === site.id;

    return (
        <tr class="single-site">
            <td>{siteIndex + 1}</td>

            <td class="col-prices">
                {offers.map((offer, index) => (
                    <div class="offer">
                        <span class={isThisSiteHot && index === 0 ? 'hot price' : 'price'}>{offer.price}</span>
                        {offer.condition !== 'New' && <span class="condition">&nbsp;U</span>}
                        {offer.seller === 'Amazon' && <span class="seller">&nbsp;A</span>}
                    </div>
                ))}
            </td>
            <td>
                <div>
                    Last: {moment(site.lastPing).format('HH:mm.ss')}
                </div>
                <div>
                    Next: {timeLeft >= 0 ? timeLeft : 0}
                </div>
            </td>
            <td class="col-image"><img src={site.image} /></td>
            <td>{site.id}</td>
            <td class="col-title">{site.title}</td>
            <td class="col-actions">
                <button onClick={() => window.ipcRenderer.send('OPEN_URL', site.url)}>🔗</button>
                <button onClick={throttledFetch}>🔄</button>
                <button onClick={() => dispatch('REMOVE_SITE', { category, site })}>❌</button>
            </td>
        </tr>
    );
}