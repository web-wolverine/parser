const ITask = require('../interfaces/Task.interface');

const uuidGenerator = require('uuid/v4');

class Task extends ITask {
    constructor({ onCompleteCb }) {
        this.tasks = [];

        this.uuid = uuidGenerator();

        this.onCompleteCb = onCompleteCb;
    }

    get uuid() {
        return this.uuid;
    }

    set uuid() {
        throw new Error('You can\'t set new UUID');
    }

    length() {
        return this.tasks.length;
    }

    setTask() {

    }

    getTask() {

    }
}

module.exports = Task;