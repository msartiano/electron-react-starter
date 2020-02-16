import React, { useState, useEffect } from 'react';

export default ({ id, removeSite }) => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [prices, setPrices] = useState([]);

    const parseHtml = htmlPassed => {
        var dom = new DOMParser().parseFromString(htmlPassed, 'text/html');

        const titleSelector = 'h1.a-size-large.a-spacing-none';
        const imgSelector = 'a.a-link-normal img[alt="Return to product information"]';
        const pricesSelector = '.a-size-large.a-color-price.olpOfferPrice.a-text-bold';

        setTitle(dom.querySelector(titleSelector).innerText);
        setImage(dom.querySelector(imgSelector).src);
        const prices = [...dom.querySelectorAll(pricesSelector)].map(el => el.innerHTML.trim());
        setPrices(prices);
    };

    useEffect(() => {
        if (prices.length === 0) {
            window.ipcRenderer.send('PING_URL', id);
        }
        window.ipcRenderer.on('PING_URL_REPLY', (_, { id: resultId, result: html }) => resultId === id ? parseHtml(html) : null);
    }, prices);
    
    return (
        <tr class="amazon-item">
            <td class="col-prices">{prices.map(el => <div>{el}</div>)}</td>
            <td class="col-image"><img src={image} /></td>
            <td>{id}</td>
            <td class="col-title">{title}</td>
            <td><button onClick={() => removeSite(id)}>Remove this</button></td>
        </tr>
    )
}