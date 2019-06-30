class ITask {
    start() {
        throw new Error('This func must be implemented in your class!')
    }

    pause() {
        throw new Error('This func must be implemented in your class!')
    }

    end() {
        throw new Error('This func must be implemented in your class!')
    }

    fulfillment() {
        throw new Error('This func must be implemented in your class!')
    }
}

module.exports = IQueue;