const { ipcMain, shell } = require('electron');
const axios = require('axios');

const getAmazonUrl = amazonId => `https://www.amazon.co.uk/gp/offer-listing/${amazonId}/ref=olp_twister_all?ie=UTF8&mv_style_name=all&qid=1581776702&sr=8-21`;
// the one above downloasd offers for used/new in all categories of this item
// the one below just for this model and just for used
// https://www.amazon.co.uk/gp/offer-listing/${amazonId}/ref=dp_olp_used?ie=UTF8&condition=used`;

let numRequests = 1;

ipcMain.on('PING_URL', async (event, amazonId) => {
    let html;
    try {
        const superAxios = axios.create()
        superAxios.defaults.headers.common["User-Agent"] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10 7 4) AppleWebKit/537.13 (KHTML, like Gecko) Chrome/24.0.1290.1 Safari/537.13";

        const url = getAmazonUrl(amazonId);
        html = (await superAxios.get(url)).data;
        event.reply("PING_URL_REPLY", {
            id: amazonId,
            url,
            html
        });

        console.log(`HTTP Requests: ${numRequests++} [${amazonId}]`);
    } catch (e) {
        console.log('error while fetching url', e);
    }
})

ipcMain.on('OPEN_URL', (_, url) => shell.openExternal(url));