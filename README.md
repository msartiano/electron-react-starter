This is strongly WIP as the below suggests, please do not use at this stage :) Below is a quick roadmap

### STRAT - Strategy
[x] Dire se uno è Nuovo o Usato, forse solo N per nuovo

[ ] [!!!!!!!!!!!!!] Send Email once a new offer has been received in a specific category

[ ] Maybe highlight special prices, for example ones that have a significant distacco fra prima e seconda offerta.. potrebbe essere una da non perdere!

[ ] Track lowest price in category forever ... 'LOWEST FOR 3 MONTHS!', should have all the lowest from the start and keep track of each new lower added

[ ] Sync changes in some way so that I can access my prefs in different computer - store in heroku database?

[ ] Cambio di prezzo, almeno di ieri, oppure posso tracciare prezzi per giorni:

```
{
    prices: {
        day-10-02-2020: [
            { price: '£320,20', condition: 'new/used', soldby: 'amazon/shopname' },
            { price: '£320,20', condition: 'new/used', soldby: 'amazon/shopname' },
            { price: '£320,20', condition: 'new/used', soldby: 'amazon/shopname' },
        ]
    }
}
```

### MR - Multi region support
[ ] Transform constant strings to dynamic based on site.region: [Link that shows page with lowest used/new prices]

[ ] Improve Matcher algorithm, so that it finds regions, and store them - Linked to LP.1

[ ] Test if CSS Selectors work with all regions and if not, make distinct CSS Selector for each region

### UX - Simplify and better UX
[ ] 1) Fetch whole amazon search page and add all results to a category

### LP - Link Parser
[ ] 1) Auto detech site region (uk, it, de, fr, es) from LINK - so improve link parsers, store url region info in db and other info

[ ] 2) Improve link parser to work with 'features' articles

[ ] 3) Improve lin parser to work with 'user/new offers' already links

### TECH - Technical
[x] Leak di memoria irrisolto - remember to event.removeListener(type, fn) on useEffect within the return statement to clear the event, otherwise, it spawns multiple events at each new change

[x] Add ESLINT with React + Hooks rules.

[x] SORTING sites by name when adding, common function

[x] Auto ping every 10 mins

[ ] Store data in SQLite, convert current db in SQLite db

### OPT - Options
[ ] Site: Toggle image size

[ ] Category: Header, small medium big

[ ] Site: Order by: ... price, name

[ ] Make defaultTimeLeft bound on specific category (or item if something is hot? no - I could assign to different cat and put a specific timer)

### FW - Forward
[ ] Reorder categories, drag n drop?

[ ] Move Site from one category to another, drag n drop?