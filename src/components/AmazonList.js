import React, { useState, useEffect, useRef } from 'react';
import AmazonItem from './AmazonItem';
import { parseSite, dbSetSites, dbGetSites, getLowestPrice } from '../utils';

export default () => {
    const [categories, setSites] = useState(dbGetCategories() || []);
    const [sites, setSites] = useState(dbGetSites(categories) || []);

    const [hotSite, setHotSite] = useState(getLowestPrice(sites));
    window.hotSite = hotSite;
    const siteText = useRef('');
    const siteCategory = useRef('');
    const categoryText = useRef(''); // add a new category

    const categories = [
        'RX 5700',
        'RTX 2080 Super',
        'Macbook Pro'
    ];

    const fetchSite = siteId => window.ipcRenderer.send('PING_URL', siteId);

    const cleanTextForm = () => {
        siteText.current.value = '';
        siteText.current.focus();
    };

    const addSite = (id, url, html) => {
        const newSites = [...sites.filter(site => site.id !== id), parseSite(id, url, html)];

        updateSites(newSites);
        cleanTextForm();
    };
    const removeSite = amazonId => updateSites(sites.filter(site => site.id !== amazonId));
    const updateSites = newSitesPassed => {
        const newSites = newSitesPassed.sort((a, b) => {
            if (a.title < b.title) return -1;
            else if (a.title > b.title) return 1;
            return 0;
        });

        dbSetSites(newSites);
        setSites(newSites);
    };

    const processSiteToAdd = () => {
        let siteId = siteText.current.value;
        if (siteId.indexOf('https://') > -1) {
            let found = siteId.match(/dp\/(.*)\/ref/g) + "";
            if (found.length > 0) {
                found = found.substr(3);
                siteId = found.substr(0, found.length - 4);
            }
        }

        if (sites.find(site => site.id === siteId)) return cleanTextForm();
        fetchSite(siteId);
    }

    const addCategory = () => {
        console.log('added' , categoryText.current.value);
    }

    useEffect(() => {
        window.ipcRenderer.on('PING_URL_REPLY', (_, { id, url, html }) => addSite(id, url, html));

        const lowestPriceSite = getLowestPrice(sites);
        if (hotSite.id !== lowestPriceSite) setHotSite(lowestPriceSite);
    });

    return (
        <div>            
            <table id="amazon-items-table">
                {sites.map((site, i) => <AmazonItem index={i} site={site} removeSite={removeSite} hotSite={site.id === hotSite.id} fetchSite={fetchSite} />)}
            </table>

            <div class="add-site">
                <input ref={siteText} type="text" placeholder="Amazon URL" />
                <select ref={siteCategory}>
                    {categories.map(category => <option value={category}>{category}</option>)}
                </select>
                <button onClick={processSiteToAdd}>ADD SITE</button>
            </div>


            <div class="add-category">
                <input ref={categoryText} type="text" placeholder="Category Name, f.e. MACBOOK" />
                <button onClick={addCategory}>ADD CATEGORY</button>
            </div>
        </div>
    );
};