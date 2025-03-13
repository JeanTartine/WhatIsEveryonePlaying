const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = {
    origin: ["http://localhost:5173"],
}
const puppeteer = require('puppeteer-extra');
const stealthplugin = require('puppeteer-extra-plugin-stealth');

app.use(cors(corsOptions));

app.get("/api/games", (req, res) => {

    const getGames = async () => {
        try {
            // Start a Puppeteer session with:
            // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
            // - no default viewport (`defaultViewport: null` - website page will in full width and height)

            // we use puppeteer-extra with the stealth plugin to be able to scrap in headless mode without being blocked by the website
            // if the env var to the browser executable (chromium for ex) is defined we use it
            const options = {
                headless: true,
            }

            if (process.env.PUPPETEER_CACHE_DIR) {
                options['executablePath'] = '/opt/render/.cache/puppeteer'
            }

            puppeteer.use(stealthplugin());
            const browser = await puppeteer.launch(options);

            const page = await browser.newPage();

            await page.goto("https://steamdb.info/charts/", {
                waitUntil: "domcontentloaded",
            });

            // Waiting for the table to load
            await page.waitForSelector('.table-products', {timeout: 5000});

            const gamesArray = await page.evaluate(() => {

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

            res.json({games: gamesArray});

        } catch (error) {
            console.error('Error scraping games:', error);
            res.status(500).json({
                error: 'Failed to scrape games data',
                message: error.message
            });
        }
    };

    getGames()
})

app.listen(8080, () => {
    console.log("Server started on port 8080");
});