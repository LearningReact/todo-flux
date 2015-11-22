import Dispatcher from '../dispatcher/Dispatcher.js';
import {ADD_TASK, TOGGLE_COMPLETION} from '../constants/AppConstants.js';

module.exports = {
  addTask (task) {
    Dispatcher.handleAction({
      type: ADD_TASK,
      task: task
    });
  },

  toggleCompletion (index) {
    Dispatcher.handleAction({
      type: TOGGLE_COMPLETION,
      index: index
    });
  }
};
