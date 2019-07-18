// const ITask = require('../interfaces/Task.interface');
const uuidGenerator = require('uuid/v4');
const ParcerManager = require('../parsers/ParserManager');
const EventEmitter = require('events');


class Task {
    constructor({
        handlerKey,
        handlerOptions
    }) {

        this.Handler = null;
        this.handlerKey = handlerKey
        this.handlerOptions = handlerOptions
        this.taskEvents = new EventEmitter();

        this.initEvents();
    }


    taskKey = uuidGenerator();
    status = 'stopped'
    fulfilled = 0
    result = []


    initEvents() {
        this.taskEvents.on('onResult', this.onResult)
    }

    onResult(results) {
        console.log('result', results);
    }

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
            parcerOptions: this.handlerOptions,
            taskEvents: this.taskEvents
        })
    }

    async start() {
        this.status = 'active';

        await this.Handler.start();
    }
}

module.exports = Task;