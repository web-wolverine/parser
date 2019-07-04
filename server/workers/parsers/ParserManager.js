const DefaultParcer = require('./DefaultParser');


class ParcerManager {
    constructor({ strategyKey, parcerOptions }) {
        this.setStrategy(strategyKey, parcerOptions)
    };

    setStrategy(strategyKey, options) {
        let Strategy;

        switch (strategyKey) {
            case 'default': {
                Strategy = DefaultParcer;
            }

            default: {
                Strategy = DefaultParcer;
            }
        }

        this.ParcerStrategy = new Strategy(options);
    }

    async start() {
        await this.ParcerStrategy.start();
    }
}

module.exports = ParcerManager;