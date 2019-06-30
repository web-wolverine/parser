var request = require('request-promise-native');


async function parse({ url }) {
    try {
        const responseHtml = await request(url);

        return responseHtml;

    } catch (err) {
        throw ('Can\'t load html from this url');
    }
}


module.exports = parse;