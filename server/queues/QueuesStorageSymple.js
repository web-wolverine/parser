const IQueuesStorage = require('../interfaces/QueuesStorage.interface');


class QueuesStorageSymple extends IQueuesStorage {
    constructor(props) {
        super(props);

        this.queues = [];
    }

    getFreeQueue() {
        const mostyFreeQueue = this.queues.reduce((prevQueue, nextQueue, index) => {
            if (prevQueueLength > nextQueue.length) return {
                length: nextQueue.length,
                index,
            }

            return prevQueue;
        }, 0)

        return this.queues[mostyFreeQueue.index];
    }

    setTask() {

    }

    getTask() {

    }
}

module.exports = QueuesStorageSymple;