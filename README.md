# Arena of Valor - Data Scraper

You may use this data scraper to fetch the data from Arena of Valor's official website.

> What data?

- All images of heroes, talents and spells (items are not included as they do not exist on the official website, yet)
- Custom built JSON file that you may use as your private API

> How do I use the data?

- You'll see `./scraper/data.json` file present. It contains all the information of each hero
- You'll find a lot of images within `./scraper/heroes/` directory
- Use `data.json` file as private API. Use it as a pointer to each hero's data and its related files

> How do I use the scraper?

It is really easy. The scraper is not made to be used as built-in dependency of your project.
Use it only to scrape data locally and then move the scraped data to your project.

- Clone this repository: `git clone https://github.com/dvlden/arena-of-valor-data-scraper.git`
- Install dependencies: `npm install` or `yarn` (whatever you prefer)
- Run the scraper: `npm run scrape` or `node index.js`
