import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { useStore } from '../Store';
import { throttle } from '../common/utils';
import SiteOffers from './SiteOffers';

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

    const isThisSiteHot = hotSiteInCategory.id === site.id;

    return (
        <tr className="single-site">
            <td>{siteIndex + 1}</td>
            <td className="col-prices">
                <SiteOffers offers={site.offers} hotSite={isThisSiteHot} />
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
