import React from 'react';
import uuid from 'node-uuid';
import request from 'microajax';

import TodoStore from '../stores/TodoStore.js';
import {ALL, ACTIVE, COMPLETED} from '../constants/AppConstants.js';

import Tasks from './Tasks.jsx';
import AddTask from './AddTask.jsx';
import Filters from './Filters.jsx';


module.exports = React.createClass({
  getInitialState () {
    return TodoStore.getState();
  },

  // Additions due to using Flux
  componentWillMount () {
    TodoStore.addChangeListener(this._onChange);
  },

  componentWillUnMount () {
    TodoStore.removeChangeListener(this._onChange);
  },

  _onChange () {
    this.setState(TodoStore.getState());
  },

  render () {
    return (
      <div>
        <h1>Todo App</h1>
        <Filters
          onChangeFilter={this.changeFilter}
          onClearCompleted={this.clearCompleted}
          itemsRemaining={this.state.numTasks}
        />
        <Tasks
          tasks={this.getTasks()}
          onDeleteTask={this.handleDeleteTask}
        />
        <AddTask />
      </div>
    );
  },

  handleDeleteTask (id) {
    var taskIndex = this.findTask(id);
    var taskToDelete = this.state.tasks[taskIndex];

    // Only want to subtract number of tasks remaining if
    // task deleted was not already completed
    var updatedNumTasks;
    if (taskToDelete.completed) {
      updatedNumTasks = this.state.numTasks;
    } else {
      updatedNumTasks = this.state.numTasks - 1;
    }

    var tasks = this.state.tasks.slice(0, taskIndex)
                    .concat(this.state.tasks.slice(taskIndex+1));
    this.setState({
      tasks: tasks,
      numTasks: updatedNumTasks
    });
  },

  findTask (id) {
    var tasks = this.state.tasks;
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        return i;
      }
    }
    throw new Error('unable to find task with id', id);
  },

  getTasks () {
    if (this.state.showing === ALL) {
      return this.state.tasks;
    }
    if (this.state.showing === ACTIVE) {
      return this.state.tasks.filter((task) => {
        return task.completed === false;
      });
    }
    if (this.state.showing === COMPLETED) {
      return this.state.tasks.filter((task) => {
        return task.completed === true;
      });
    }
  },

  changeFilter (filterType) {
    this.setState({
      showing: filterType
    });
  },

  clearCompleted () {
    var updatedTasks = this.state.tasks.filter((task) => {
      return task.completed === false;
    });
    this.setState({
      tasks: updatedTasks
    });
  }
});
