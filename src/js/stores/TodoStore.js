import AppDispatcher from '../dispatcher/Dispatcher.js';
import {ADD_TASK} from '../constants/AppConstants.js';
import objectAssign from 'react/lib/Object.assign';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

// Where we actually store our data
var _store = {
  tasks: [
    {"id": 1, "task": "Take out trash", "completed": false},
    {"id": 2, "task": "Walk the cat", "completed": false},
    {"id": 3, "task": "Get groceries", "completed": false},
    {"id": 4, "task": "Get money", "completed": false}
  ]
};

// Private setter methods that manipulate the data in our store.
var addTask = function(task) {
  _store.tasks.push(task);
};

var remoteItem = function(index) {
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
  getTasks () {
    return _store.tasks;
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
    case ADD_ITEM:
      addTask(action.task);
      TodoStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

export default TodoStore;
