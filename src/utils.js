export const clearSites = () => localStorage.removeItem("amazonSites");

export const dbGetSites = () => JSON.parse(localStorage.getItem("amazonSites")) || [];

export const dbAddSite = site => localStorage.setItem('amazonSites', JSON.stringify([...getSites(), site]));

export const dbSetSites = sites => localStorage.setItem('amazonSites', JSON.stringify(sites));

const createSite = ({ id, title, image, url, prices}) => ({
    id,
    title,
    url,
    image,
    prices,
    lastPing: Date.now()
});

export const parseSite = (id, url, html) => {
    var dom = new DOMParser().parseFromString(html, 'text/html');

    const titleSelector = 'h1.a-size-large.a-spacing-none';
    const imgSelector = 'a.a-link-normal img[alt="Return to product information"]';
    const pricesSelector = '.a-size-large.a-color-price.olpOfferPrice.a-text-bold';

    const title = dom.querySelector(titleSelector).innerText.trim();
    const image = dom.querySelector(imgSelector).src;
    const prices = [...dom.querySelectorAll(pricesSelector)].map(el => el.innerHTML.trim());

    return createSite({ id, title, image, url, prices });
};

export const getLowestPrice = (sites) => {
    let leastPriceSite = { prices: [9999999] };
    let currentLowestPrice = 9999999;

    sites.forEach(site => {
        site.prices.forEach(price => {
            const thisPrice = parseFloat(price.replace(/£|€|\$/gi, ''), 10);
            if (thisPrice < currentLowestPrice) {
                currentLowestPrice = thisPrice;
                leastPriceSite = site;
            }
        });
    });

    return leastPriceSite;
}

const throttleBy = 10000; // 10 seconds
let lastExecutedFn = Date.now()
export const throttle = fn => {
    const now = Date.now();
    if (now >= lastExecutedFn) lastExecutedFn = now + throttleBy;
    else lastExecutedFn = lastExecutedFn + throttleBy;
    const relativeTimeFromNow = Math.abs(lastExecutedFn - now);

    setTimeout(() => {
        console.log('[throttle] fn executed!');
        fn();
    }, relativeTimeFromNow);
    console.log('[throttle] called, setting next to ', lastExecutedFn);
}
