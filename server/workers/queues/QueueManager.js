const IQueue = require('../../interfaces/Queue.interface');
const Task = require('../tasks/Task');

class QueueManager extends IQueue {
    constructor({
        TManager
    }) {
        super();

        this.workers = [];
        this.TManager = TManager;
    }

    length() {
        return this.tasks.length;
    }

    isAvailable() {
        return this.tasks.length < this.maxTasks;
    }

    setTask() {
        if (!this.isAvailable) return;

        const newTask = new Task();

        this.tasks[newTask.uuid] = newTask;
    }

    getTaskByUID(uid) {
        return this.tasks[uid];
    }

    getTask() {
        if (this.tasks.length) return this.tasks.pop();
    }

    setWorker(Worker) {
        this.workers.push(Worker);
    }

    getAvailableWorker = () => {
        return this.workers.find(woker => woker.isAvailable)
    }

    watch() {
        setInterval(async () => {
            const Worker = this.getAvailableWorker();

            if (Worker) {
                const task = await this.TManager.getTask();
                if (!task) return;

                Worker.setTask(task);

                Worker.start();
            }

        }, 1000);
    }

}

module.exports = QueueManager;


