import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { throttle } from '../utils';

const defaultTimeLeft = 3600;

export default ({ site, hotSite, removeSite, fetchSite, index }) => {
    const [timeLeft, setTimeLeft] = useState(defaultTimeLeft);

    useEffect(() => {
        if (timeLeft === 0) {
            setTimeLeft(-1); // execute once

            throttle(() => {
                console.log('updating ' + site.id);
                setTimeLeft(defaultTimeLeft);
                fetchSite(site.id);
            });
        }

        /*
        let timeout;
        if (timeLeft === defaultTimeLeft) { // if time was reset, I start a new timeout
        }*/

        const timeout = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearInterval(timeout);
    });

    const prices = site.prices.length > 2 ? site.prices.slice(0, 3) : site.prices;
    const pricesClasses = [
        'col-prices',
        hotSite ? 'hot-price' : ''
    ];

    return (
        <tr class="amazon-item">
            <td>{index + 1}</td>
            <td class={pricesClasses.join(' ')}>
                {prices.map(el => <div>{el}</div>)}
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
            <td>
                <button onClick={() => window.ipcRenderer.send('OPEN_URL', site.url)}>🔗</button>
                <button onClick={() => fetchSite(site.id)}>🔄</button>
                <button onClick={() => removeSite(site.id)}>❌</button>
            </td>
        </tr>
    )
}