
const TaskClass = require('./Task')

class TasksManager {
    constructor(TasksStorage, SaveManager) {
        this.TasksStorage = TasksStorage;
        this.SaveManager = SaveManager;

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

    saveTaskResult(result) {
        this.SaveManager.save(result);
    }

}

module.exports = TasksManager;
