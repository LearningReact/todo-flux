import AppDispatcher from '../dispatcher/Dispatcher.js';
import {ALL, ADD_TASK, TOGGLE_COMPLETION} from '../constants/AppConstants.js';
import objectAssign from 'react/lib/Object.assign';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

var tasks = [
  {"id": 1, "task": "Take out trash", "completed": false},
  {"id": 2, "task": "Walk the cat", "completed": false},
  {"id": 3, "task": "Get groceries", "completed": false},
  {"id": 4, "task": "Get money", "completed": false}
];

// Where we actually store our data
var _store = {
  tasks: tasks,
  numTasks: tasks.length,
  showing: ALL
};

// Private setter methods that manipulate the data in our store.
var addTask = function(task) {
  _store.tasks.push(task);
  _store.numTasks++;
};

var toggleTaskCompletion = function(index) {
  var task = _store.tasks[index];
  if (!task.completed) {
    _store.numTasks--;
  } else {
    _store.numTasks++;
  }
  task.completed = !task.completed;
};

var removeItem = function(index) {
  _store.tasks.splice(index, 1);
};

// This represents the public API of our Store. This will be used
// by the components to register with it.
//
// We extend EventEmitter.prototype so that our store will have the following
// methods:
//  - on()
//  - removeListener()
//  - emit()
var TodoStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener (cb) {
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener (cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },
  getState () {
    return _store;
  }
});

// This is where we handle what to do when the store is delivered
// an action payload.
//
// Based on the action type, if our store is interested, we
// deal with the action by using only a setter function in this file.
AppDispatcher.register(function(payload) {
  const action = payload.action;
  switch (action.type) {
    case ADD_TASK:
      addTask(action.task);
      TodoStore.emit(CHANGE_EVENT);
      break;

    case TOGGLE_COMPLETION:
      toggleTaskCompletion(action.index);
      TodoStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

export default TodoStore;
