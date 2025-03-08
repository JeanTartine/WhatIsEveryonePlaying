import puppeteer from "puppeteer-extra";
import stealthplugin from "puppeteer-extra-plugin-stealth";
import fs from "fs";


/**
 * This function scrap https://steamdb.info/charts/ for the top 100 currently played games
 * @returns {Promise<void>}
 */
const getGames = async () => {
    // Start a Puppeteer session with:
    // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
    // - no default viewport (`defaultViewport: null` - website page will in full width and height)

    // we use puppeteer-extra with the stealth plugin to be able to scrap in headless mode without being blocked by the website
    puppeteer.use(stealthplugin());
    const browser = await puppeteer.launch({
        headless: true
    });

    const page = await browser.newPage();

    await page.goto("https://steamdb.info/charts/", {
        waitUntil: "domcontentloaded",
    });

    // Waiting for the table to load
    await page.waitForSelector('.table-products', {timeout: 5000});

    const gameNames = await page.evaluate(() => {

        // We get all the games in the table
        const games = document.querySelectorAll('.table-products tbody tr')

        // We scrap all the relevant information: id, name, image ...
        return Array.from(games).map(game => {
            let gameId = game.querySelector(' * > td:nth-child(1)').innerText.trim();
            gameId = parseInt(gameId.replace('.', ''));
            const gameImage = game.querySelector('td:nth-child(2) a img').src;
            const gameName = game.querySelector('td:nth-child(3) a').innerText.trim();
            let concurrentPlayersPeakToday = game.querySelector('td:nth-child(5)').innerText.trim();
            concurrentPlayersPeakToday = parseFloat(concurrentPlayersPeakToday.replace(/,/g, ''))
            return {gameId, gameImage, gameName, concurrentPlayersPeakToday};
        });
    })

    // Close the browser
    await browser.close();

    // Write the result in our data.json file
    fs.writeFile('./src/data.json', JSON.stringify(gameNames, null, 4), 'utf8', (err) => {
        if (err) {
            return console.log(err);
        }
        console.log('Games data scraped and saved successfully in ./src/data.json')
    });
};

// Start the scraping
getGames();
