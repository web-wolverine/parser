const TasksManager = require('./workers/tasks/TasksManager');
const TasksStorage = require('./workers/tasks/TasksStorage');
const Task = require('./workers/tasks/Task');
const SaveManager = require('./workers/saver/SaveManager');

const QueuesManager = require('./Workers/queues/QueueManager');

const Process = require('./workers/processes/Process');

const TManager = new TasksManager(
    new TasksStorage(),
    new SaveManager('file'),
);

const mockTasks = [
    {
        handlerKey: 'default_parser',

        handlerOptions: {
            url: 'https://allo.ua/ua/televizory',
            maxPages: 1,
            searchObjectsKey: '.products-grid .item',
            keys: {
                title: '.product-name-container .product-name span',
                price: '.price .sum',
            },
        }
    },
    {
        handlerKey: 'default_parser',

        handlerOptions: {
            url: 'https://allo.ua/ua/televizory',
            maxPages: 1,
            searchObjectsKey: '.products-grid .item',
            keys: {
                title: '.product-name-container .product-name span',
                price: '.price .sum',
            },
        }
    }
]

mockTasks.forEach((task) => TManager.setTask(new Task(task)))

const QManager = new QueuesManager({
    TManager: TManager,
});

const firstProcess = new Process()

QManager.setWorker(firstProcess);

QManager.watch();