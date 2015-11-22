import Dispatcher from '../dispatcher/Dispatcher.js';
import {ADD_TASK} from '../constants/AppConstants.js';

module.exports = {
  addTask (task) {
    Dispatcher.handleAction({
      type: ADD_TASK,
      task: task
    });
  }
};
