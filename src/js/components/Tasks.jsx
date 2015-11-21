import React from 'react';
import Task from './Task.jsx';

module.exports = React.createClass({
  render () {
    var tasks = this.props.tasks.map((item => {
      return (
        <Task
          item={item}
          onToggleCompletion={this.props.onToggleCompletion}
          onDeleteTask={this.props.onDeleteTask}
        />
      )

    }));

    return (
      <ul>
        {tasks}
      </ul>
    );
  }
});
