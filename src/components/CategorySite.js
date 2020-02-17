import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { useStore } from '../Store';
import { throttle } from '../common/utils';

export default ({ category, site, defaultTimeLeft, hotSiteInCategory, siteIndex }) => {
    const [store, dispatch] = useStore();
    const [timeLeft, setTimeLeft] = useState(defaultTimeLeft);

    const throttledFetch = () => {
        throttle(() => {
            console.log(`updating ${site.id}`);
            // TODO set the time only after the site has been updated
            setTimeLeft(defaultTimeLeft);
            window.ipcRenderer.send('UPDATE_SITE', { category, site: { id: site.id }});
        });
    };

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
        return () => {};
    });

    let offers = [];
    if (site.offers) offers = site.offers.length > 2 ? site.offers.slice(0, 3) : site.offers;
    const isThisSiteHot = hotSiteInCategory.id === site.id;

    return (
        <tr className="single-site">
            <td>{siteIndex + 1}</td>

            <td className="col-prices">
                {offers.map((offer, index) => (
                    <div className="offer">
                        <span className={isThisSiteHot && index === 0 ? 'hot price' : 'price'}>{offer.price}</span>
                        {offer.condition !== 'New' && <span className="condition">&nbsp;U</span>}
                        {offer.seller === 'Amazon' && <span className="seller">&nbsp;A</span>}
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
            <td className="col-image"><img alt="product" src={site.image} /></td>
            <td>{site.id}</td>
            <td className="col-title">{site.title}</td>
            <td className="col-actions">
                <button type="button" onClick={() => window.ipcRenderer.send('OPEN_URL', site.url)}>🔗</button>
                <button type="button" onClick={throttledFetch}>🔄</button>
                <button type="button" onClick={() => dispatch('REMOVE_SITE', { category, site })}>❌</button>
            </td>
        </tr>
    );
};
