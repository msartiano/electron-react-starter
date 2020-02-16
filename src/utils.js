export const clearSites = () => localStorage.removeItem("amazonSites");

export const dbGetSites = () => JSON.parse(localStorage.getItem("amazonSites")) || {};

export const dbAddSite = site => localStorage.setItem('amazonSites', JSON.stringify([...getSites(), site]));

export const dbSetSites = sites => localStorage.setItem('amazonSites', JSON.stringify(sites));