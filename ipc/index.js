const { ipcMain, shell } = require('electron');
const axios = require('axios');

const getAmazonUrl = amazonId => `https://www.amazon.co.uk/gp/offer-listing/${amazonId}/ref=olp_twister_all?ie=UTF8&mv_style_name=all&qid=1581776702&sr=8-21`;

let numRequests = 1;

const fetchAmazonUrl = async (EVENT_NAME_TO_REPLY, event, { category, site: { id: amazonId } }) => {
    let html;
    try {
        const superAxios = axios.create();
        superAxios.defaults.headers.common['User-Agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10 7 4) AppleWebKit/537.13 (KHTML, like Gecko) Chrome/24.0.1290.1 Safari/537.13';

        const url = getAmazonUrl(amazonId);
        html = (await superAxios.get(url)).data;
        event.reply(EVENT_NAME_TO_REPLY, {
            category,
            id: amazonId,
            url,
            html
        });

        console.log(`HTTP Requests: ${numRequests} [${amazonId}]`);
        numRequests += 1;
    } catch (e) {
        console.log('error while fetching url', e);
    }
};

ipcMain.on('ADD_SITE', async (event, { category, site }) => {
    fetchAmazonUrl('ADD_SITE_REPLY', event, { category, site });
});

ipcMain.on('UPDATE_SITE', async (event, { category, site }) => {
    fetchAmazonUrl('UPDATE_SITE_REPLY', event, { category, site });
});

ipcMain.on('OPEN_URL', (_, url) => shell.openExternal(url));
