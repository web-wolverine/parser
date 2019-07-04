const TasksManager = require('./workers/tasks/TasksManager');
const TasksStorage = require('./workers/tasks/TasksStorage');
const Task = require('./workers/tasks/Task');

const QueuesManager = require('./Workers/queues/QueueManager');
const Process = require('./workers/processes/Process');
// const Parcer = require('./parser/ParserClass');

const TManager = new TasksManager(
    new TasksStorage()
);

// const RozetkaParser = new Parcer()

const newTask = new Task({
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
});

const newTask2 = new Task({
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
});

TManager.setTask(newTask);
TManager.setTask(newTask2);

const QManager = new QueuesManager({
    TManager: TManager,
});

QManager.watch();

const firstProcess = new Process()

QManager.setWorker(firstProcess);