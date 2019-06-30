const parser = require('./parser');
const scrapper = require('./scrapper');


async function start() {

    try {
        const html = await parser({ url: 'https://frontender.info/web-scraping-with-nodejs' });

        const scrappedData = await scrapper(html, {
            args: ['h2']
        });

        console.log(scrappedData);
    } catch (err) {
        console.error(err);
    }
}

start();