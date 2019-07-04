// const ITask = require('../interfaces/Task.interface');
const uuidGenerator = require('uuid/v4');
const ParcerManager = require('../parsers/ParserManager')

class Task {
    constructor({
        handlerKey,
        handlerOptions
    }) {

        this.handlerKey = handlerKey
        this.handlerOptions = handlerOptions
        this.Handler = null;

    }

    taskKey = uuidGenerator();
    status = 'stopped'
    fulfilled = 0
    result = []

    setStatus(status) {
        this.status = status;
    }

    toJSON() {
        return {
            taskKey: this.taskKey,
            handlerKey: this.handlerKey,
            handlerOptions: this.handlerOptions
        }
    }

    initHandler() {
        this.Handler = new ParcerManager({
            strategyKey: this.handlerKey,
            parcerOptions: this.handlerOptions
        })
    }

    async start() {
        this.status = 'active';

        await this.Handler.start();
    }
}

module.exports = Task;