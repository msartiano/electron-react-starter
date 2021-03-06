const get = (key, defaultValue) => {
    const value = localStorage.getItem(key);
    if (!value) return defaultValue;
    return JSON.parse(value);
};
const set = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const remove = key => localStorage.removeItem(key);

export const getSiteKey = key => `${key}-sites`;

export const db = {
    categories: {
        get: () => get('categories', []),
        set: value => set('categories', value),
    },
    sites: {
        get: category => get(getSiteKey(category), {}),
        set: (category, value) => set(getSiteKey(category), value),
        removeByCategory: (category) => remove(getSiteKey(category))
    },
    options: {
        get: () => get('options', {}),
        set: value => set('options', value),
    }
};

export const getLowestPriceInCategory = category => {
    const sites = db.sites.get(category);

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
};

export const sortByKey = (arr, key) => arr.sort((a, b) => {
    if (a[key] < b[key]) return -1;
    if (a[key] > b[key]) return 1;
    return 0;
});

const createSite = ({
    id,
    title,
    image,
    url,
    prices,
    offers
}) => ({
    id,
    title,
    url,
    image,
    prices,
    offers,
    lastPing: Date.now()
});

const trim = str => str.replace(/\s\s+/g, ' ').trim();

export const parseSite = (id, url, html) => {
    const dom = new DOMParser().parseFromString(html, 'text/html');

    const titleSelector = 'h1.a-size-large.a-spacing-none';
    const imgSelector = 'a.a-link-normal img[alt="Return to product information"]';

    const offerSelector = '.a-row.a-spacing-mini.olpOffer';
    const pricesSelector = '.a-size-large.a-color-price.olpOfferPrice.a-text-bold';
    const conditionSelector = '.a-size-medium.olpCondition.a-text-bold';
    const sellerSelector = '.a-spacing-none.olpSellerName';
    const primeSelector = '.supersaver';

    // querySelectors
    const title = dom.querySelector(titleSelector).innerText.trim();
    const image = dom.querySelector(imgSelector).src;

    const offersHtml = [...dom.querySelectorAll(offerSelector)];
    const offers = [];
    offersHtml.forEach(offer => {
        const price = trim(offer.querySelector(pricesSelector).innerHTML);
        const condition = trim(offer.querySelector(conditionSelector).innerHTML);
        const prime = offer.querySelector(primeSelector) !== null;
        let seller = trim(offer.querySelector(sellerSelector).innerText);
        if (seller.length < 1) seller = 'Amazon';

        offers.push({ price, condition, seller, prime });
    });
    const prices = [...dom.querySelectorAll(pricesSelector)].map(el => el.innerHTML.trim());

    return createSite({
        id,
        title,
        image,
        url,
        offers,
        prices
    });
};

const throttleBy = 10000; // 10 seconds
let lastExecutedFn = Date.now();
export const throttle = fn => {
    const now = Date.now();
    if (now >= lastExecutedFn) lastExecutedFn = now + throttleBy;
    else lastExecutedFn += throttleBy;
    const relativeTimeFromNow = Math.abs(lastExecutedFn - now);

    setTimeout(() => {
        console.log('[throttle] fn executed!');
        fn();
    }, relativeTimeFromNow);
    console.log('[throttle] called, setting next to ', lastExecutedFn);
};
