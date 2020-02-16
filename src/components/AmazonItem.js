import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { throttle } from '../utils';

const defaultTimeLeft = 600; // 10 minutes

export default ({ site, hotSite, removeSite, fetchSite, index }) => {
    const [timeLeft, setTimeLeft] = useState(defaultTimeLeft);

    const throttledFetch = () => {
        throttle(() => {
            console.log('updating ' + site.id);
            setTimeLeft(defaultTimeLeft);
            fetchSite(site.id);
        });
    }

    useEffect(() => {
        if (timeLeft === 0) {
            setTimeLeft(-1); // execute once
            throttledFetch();
        }
        
        const timeout = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearTimeout(timeout);
    }, [timeLeft]);

    let offers = [];
    if (site.offers) offers = site.offers.length > 2 ? site.offers.slice(0, 3) : site.offers;
    const pricesClasses = [
        'col-prices',
        hotSite ? 'hot-price' : ''
    ];


    return (
        <tr class="amazon-item">
            <td>{index + 1}</td>
            
            <td>
                {offers.map((offer, index) => (
                    <div class="offer">
                        <span class={hotSite && index === 0 ? 'hot price' : 'price'}>{offer.price}</span>
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
                <button onClick={() => removeSite(site.id)}>❌</button>
            </td>
        </tr>
    )
}