const fs = require('fs');
const path = require('path');

const tasks_results_storage = path.resolve(__dirname, '../../storage/results');
const uuidGenerator = require('uuid/v4');

class FileSave {
    async writeResultsToFile(results) {
        const fileName = uuidGenerator() + '.json';

        const resultsPath = path.join(tasks_results_storage, fileName);

        return new Promise((resolve, reject) => {
            fs.writeFile(resultsPath, JSON.stringify(results), (err, data) => {

                if (!err) resolve();

                reject()

            });
        })
    }

    async save(results) {
        await writeResultsToFile(results)
    }

}

module.exports = FileSave;