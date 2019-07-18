const FileSaver = require('./FileSaver');

class SaveManager {
    constructor(format) {

        this.SaveHandler = this.getSaveHanlder(format);
    }

    getSaveHanlder(format) {
        let SaveHandler;

        switch (format) {
            case 'file':
                SaveHandler = new FileSaver();
                break;

            default:
                break;
        }

        this.SaveHandler = SaveHandler;
    }


    save(data) {
        return this.SaveHandler.save(data)
    }
}

module.exports = SaveManager;