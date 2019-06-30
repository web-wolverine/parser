const cheerio = require('cheerio');


async function pullData(html, { args }) {
    const $page = cheerio.load(html);

    const result = await $page.apply(null, args).text();

    return result;
}

module.exports = pullData;