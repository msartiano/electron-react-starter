import React, { useState } from 'react';
import moment from 'moment';

import { useStore } from '../Store';
import { throttle } from '../utils';

const defaultTimeLeft = 600; // 10 minutes

export default ({ category }) => {
    const [store, dispatch] = useStore();
    const [timeLeft, setTimeLeft] = useState(defaultTimeLeft);
    console.log('store.sites', store.sites);
    console.log('category', category);
    console.log('store.sites[category]', store.sites[category]);
    
    const throttledFetch = () => {
        throttle(() => {
            console.log('updating ' + site.id);
            setTimeLeft(defaultTimeLeft);
            fetchSite(site.id);
        });
    }

//                                         <span class={hotSite && index === 0 ? 'hot price' : 'price'}>{offer.price}</span>


    return (
        <div class="single-category">
            SITE {category}!

            <table id="sites-table">
                {store.sites[category].map((site, index) => {
                    let offers = [];
                    if (site.offers) offers = site.offers.length > 2 ? site.offers.slice(0, 3) : site.offers;

                    return (
                        <tr class="single-site">
                            <td>{index + 1}</td>
                            
                            <td>
                                {offers.map((offer, index) => (
                                    <div class="offer">
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
                        )}
                    )}
            </table>
        </div>
    );
};