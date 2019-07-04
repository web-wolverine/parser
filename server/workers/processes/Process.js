
class Process {
    constructor() {
        this.Task = null;
    }

    isAvailable = true;

    setTask(task) {
        this.Task = task;
    }

    async start() {

        this.Task.initHandler();

        this.isAvailable = false;
        const result = await this.Task.start();
        this.isAvailable = true;


        console.log(result);
    }

}


module.exports = Process;