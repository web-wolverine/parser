const fs = require('fs');
const path = require('path');

const tasks_storage = path.resolve(__dirname, '../../storage', 'tasks.json');


class TasksStorage {
    constructor() {

    }

    async setTask(Task) {
        try {
            const tasks = await this.readTasksFromFile();

            tasks.push(Task.toJSON());

            await this.writeTasksToFile(tasks);

        } catch (err) {
            console.log(err)
            // TODO: 
        }
    }


    async readTasksFromFile() {
        const tasks = await require(tasks_storage);
        return tasks;
    }

    async writeTasksToFile(tasks) {

        return new Promise((resolve, reject) => {
            fs.writeFile(tasks_storage, JSON.stringify(tasks), (err, data) => {

                if (!err) resolve();

                reject()

            });
        })
    }

    async getLatestTask() {
        try {
            const tasks = await this.readTasksFromFile()

            const task = tasks.pop()

            await this.writeTasksToFile([...tasks]);

            return task;
        } catch (err) {
            console.log(err);
        }
    }
}


module.exports = TasksStorage;
