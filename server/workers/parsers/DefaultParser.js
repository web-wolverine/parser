const request = require('request-promise-native');
const cheerio = require('cheerio');

class DefaultParcer {
    constructor({
        url = '',
        maxPages = 0,
        keys = {},
        searchObjectsKey = '',
    }, {
        taskEvents
    }) {

        this.url = url;

        this.maxPages = maxPages;

        this.compliteLevel = 0;

        this.queues = [];

        this.keys = keys;

        this.searchObjectsKey = searchObjectsKey;

        this.results = [];

        this.key = 'default_parser';

        this.taskEvents = taskEvents;
    };

    get key() { return this.key };

    set key(val) {
        if (this.uid) throw new Error('You can\'t set new key');
        return val;
    }

    async getHtml(url) {
        try {
            return await request(url);
        }
        catch (err) {
            console.log(err)
        }
    }

    scrap(html) {
        const $page = cheerio.load(html, {
            normalizeWhitespace: true,
            xmlMode: true
        });

        const $items = $page(this.searchObjectsKey)

        const result = $items.map((key, item) => {

            return Object.keys(this.keys).reduce((data, key) => {

                const $item = cheerio.load(item)

                const searchValue = this.keys[key];

                const result = $item(searchValue).text();

                data[key] = result.trim();

                return data;

            }, {})
        }).get()

        return result;
    }

    getAllPages() {
        const pages = [];

        for (let i = 0; i <= this.maxPages; i++) {
            pages.push(
                this.url + '/p-' + i
            )
        }

        return pages;
    }

    getQueues() {
        const pages = this.getAllPages();

        return pages.map(page => this.getQueue(page, this.keys));
    }

    getQueue(url) {
        return async () => {
            const html = await this.getHtml(url);

            const result = this.scrap(html);

            return result;
        }
    }


    async start() {
        console.log('STARTED');
        this.queues = this.getQueues();

        await this.startParsing(this.queues);

        this.taskEvents.emit('onResult', this.results);
    }

    async startParsing(timeout = 1000) {
        try {
            if (!this.queues.length) return;

            const queue = this.queues.pop();

            const result = await queue()

            this.results.push(result)

            this.updateCompliteLevel();

            console.log('Complited: ', this.compliteLevel + '%');

            await this.startParsing(timeout);
        } catch (err) {
            console.log(err);
        }
    }

    updateCompliteLevel() {
        if (!this.queues.length) this.compliteLevel = 100;
        this.compliteLevel = 100 - ((this.queues.length / this.maxPages) * 100);
    }

}

module.exports = DefaultParcer;