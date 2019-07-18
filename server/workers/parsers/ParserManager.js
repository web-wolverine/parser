const DefaultParcer = require('./DefaultParser');


class ParcerManager {
    constructor({ strategyKey, parcerOptions, taskEvents }) {
        this.setStrategy(strategyKey, parcerOptions, taskEvents)
    };

    setStrategy(strategyKey, options, taskEvents) {
        let Strategy;

        switch (strategyKey) {
            case 'default': {
                Strategy = DefaultParcer;
            }

            default: {
                Strategy = DefaultParcer;
            }
        }

        this.ParcerStrategy = new Strategy(options, {
            taskEvents
        });
    }

    async start() {
        await this.ParcerStrategy.start();
    }
}

module.exports = ParcerManager;