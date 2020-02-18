import React, { useRef, useEffect } from 'react';
import { useStore } from '../Store';
import { parseSite } from '../common/utils';

export default () => {
    const [store, dispatch] = useStore();
    const siteText = useRef('');
    const defaultSite = store.categories.length > 0 ? store.categories[0] : '';
    const siteCategory = useRef(defaultSite);

    const cleanTextForm = () => {
        siteText.current.value = '';
        siteText.current.focus();
    };

    const isSitePresent = (siteId, cat) => store.sites[cat].find(site => site.id === siteId);
    const fetchSite = (siteId, category) => window.ipcRenderer.send('ADD_SITE', { category, site: { id: siteId }});
    const processSiteToAdd = () => {
        let siteId = siteText.current.value;
        const category = siteCategory.current.value;
        if (siteId.indexOf('https://') > -1) {
            let found = siteId.match(/dp\/(.*)\/ref/g) + '';
            if (found.length > 0) {
                found = found.substr(3);
                siteId = found.substr(0, found.length - 4);
            }
        }

        if (siteId.trim().length < 1) {
            siteText.current.value = 'Error. Copy URL from Amazon UK Search.';
            return;
        }
        if (isSitePresent(siteId, category)) {
            cleanTextForm();
            return;
        }

        fetchSite(siteId, category);
    };

    const addSite = ({ id, url, html, category }) => {
        console.log('==ADDSITE==', id, category);
        // TODO: siteCategory.current.value may have changed while it fetches the record ..
        if (!isSitePresent(id, category)) {
            dispatch('ADD_SITE', { category, site: parseSite(id, url, html) });
            cleanTextForm();
        }
    };
    const updateSite = ({ id, url, html, category }) => dispatch('UPDATE_SITE', { category, site: parseSite(id, url, html) });

    useEffect(() => {
        const pingUrlReply = (_, { id, url, html, category }) => addSite({ id, url, html, category });
        window.ipcRenderer.on('ADD_SITE_REPLY', pingUrlReply);
        const updateSiteReply = (_, { id, url, html, category }) => updateSite({ id, url, html, category });
        window.ipcRenderer.on('UPDATE_SITE_REPLY', updateSiteReply);

        return () => {
            window.ipcRenderer.removeListener('ADD_SITE_REPLY', pingUrlReply);
            window.ipcRenderer.removeListener('UPDATE_SITE', pingUrlReply);
        };
    });

    return (
        <section className="add-site">
            <input ref={siteText} type="text" placeholder="Amazon URL" />
            <select ref={siteCategory}>
                {store.categories.map(category => <option value={category}>{category}</option>)}
            </select>
            <button type="button" onClick={processSiteToAdd} disabled={store.categories.length < 1}>{store.categories.length > 0 ?'ADD SITE':'ADD A CATEGORY FIRST'}</button>
        </section>
    );
};
