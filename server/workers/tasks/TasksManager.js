
const TaskClass = require('./Task')

class TasksManager {
    constructor(TasksStorage) {
        this.TasksStorage = TasksStorage;


    }

    async setTask(Task) {
        await this.TasksStorage.setTask(Task);
    }

    async getTask() {

        const task = await this.TasksStorage.getLatestTask();

        if (!task) return;

        const Task = new TaskClass(task)

        return Task;
    }

    async getLatestTask() {
        return await this.TasksStorage.getLatestTask();
    }
}

module.exports = TasksManager;
