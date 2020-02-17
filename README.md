This is strongly WIP as the below suggests, please do not use at this stage :)

todo:
[ ] Auto ping every 5-10 mins
[ ] Scope single articles (tipo nuovi usati su 1 articolo di PS4)
[ ] Monitora / invia email / notifica
[ ] Leak di memoria irrisolto
[ ] Dire se uno è Nuovo o Usato, forse solo N per nuovo

[ ] Cambio di prezzo, almeno di ieri, oppure posso tracciare prezzi per giorni:
{
    prices: {
        day-10-02-2020: [
            { price: '£320,20', condition: 'new/used', soldby: 'amazon/shopname' },
            { price: '£320,20', condition: 'new/used', soldby: 'amazon/shopname' },
            { price: '£320,20', condition: 'new/used', soldby: 'amazon/shopname' },
        ]
    }
}
[ ] SQLite e db per

[ ] Sync changes in some way so that I can access my prefs in different computer - store in heroku database?
[ ] Send Email once a new offer has been received in a specific category
[ ] Make defaultTimeLeft bound on specific category (or item if something is hot? no - I could assign to different cat and put a specific timer)


[ ] Track lowest price in category forever ... 'LOWEST FOR 3 MONTHS!', should have all the lowest from the start and keep track of each new lower added
[ ] Maybe highlight special prices, for example ones that have a significant distacco fra prima e seconda offerta.. potrebbe essere una da non perdere!
[x] SORTING sites by name when adding, commong function
[ ] Better 'Get amazon id from link' algorithm
[ ] support other amazon, like amazon.it, requires 1x 'lowest price' link, 1x id matcher algorithm, x new CSS selector (maybe)

Options
[ ] Site: Toggle image size
[ ] Category: Header, small medium big
[ ] Site: Order by: ... price, name