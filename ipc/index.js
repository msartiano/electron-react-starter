const { ipcMain } = require('electron');
const axios = require('axios');

const getAmazonUrl = amazonId => `https://www.amazon.co.uk/gp/offer-listing/${amazonId}/ref=dp_olp_used?ie=UTF8&condition=used`;

let numRequests = 1;

ipcMain.on('PING_URL', async (event, amazonId) => {
    console.log('aid', amazonId);
    let result;
    try {
        const superAxios = axios.create()
        superAxios.defaults.headers.common["User-Agent"] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10 7 4) AppleWebKit/537.13 (KHTML, like Gecko) Chrome/24.0.1290.1 Safari/537.13";

        result = (await superAxios.get(getAmazonUrl(amazonId))).data;
        event.reply("PING_URL_REPLY", {
            id: amazonId,
            result
        });

        console.log(`HTTP Requests: ${numRequests++}`);
    } catch (e) {
        console.log('error while fetching url', e);
    }
})
