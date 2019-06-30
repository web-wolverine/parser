const IQueue = require('../interfaces/Queue.interface');
const Task = require('./Task');

class Queue extends IQueue {
    constructor() {
        this.tasks = {};
    }

    length() {
        return this.tasks.length;
    }

    setTask() {
        const newTask = new Task();

        this.tasks[newTask.uuid] = newTask;
    }

    getTaskByUID(uid) {
        return this.tasks[uid];
    }
}

module.exports = Queue;