import React, { useState, useEffect, useRef } from 'react';
import AmazonItem from './AmazonItem';
import { dbSetSites, dbGetSites } from '../utils';

export default () => {
    // pass object, store object with site detail, last update
    // avoid passing existing sites

    const [sites, setSites] = useState(dbGetSites() || {});
    const siteText = useRef('');

    const addSite = () => {
        // if exists, block
        //if (sites.find());

        let site = siteText.current.value;
        if (site.indexOf('https://') > -1) {
            let found = site.match(/dp\/(.*)\/ref/g) + "";
            if (found.length > 0) {
                found = found.substr(3);
                site = found.substr(0, found.length - 4);
            }
            console.log('site new:', site);
        }
        console.log('site new2:', site);

        setSites([...sites, site]);
        siteText.current.value = '';
        siteText.current.focus();
    }

    const removeSite = amazonId => setSites(sites.filter(site => site !== amazonId));

    useEffect(() => {
        dbSetSites(sites);
    });

    const renderSites = () => (
        <table id="amazon-items-table">
            {sites.map((el, index) => (
                <AmazonItem id={el} removeSite={removeSite} />
            ))}
        </table>
    );

    return (
        <div>
            {renderSites()}
            <input ref={siteText} type="text" />
            <button onClick={addSite}>add site</button>
        </div>
    );
};