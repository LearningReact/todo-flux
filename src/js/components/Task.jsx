import React from 'react';
import AppActions from '../actions/AppActions.js';

module.exports = React.createClass({
  getInitialState () {
    return {
      hovering: false
    };
  },

  render () {
    var item = this.props.item;
    return (
      <li
        className='item'
        key={item.id}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        >
          <span
            onClick={this.handleClick.bind(null, this.props.index)}
            className={'item-text ' + (item.completed ? 'completed' : '')}>
            {item.task}
          </span>
          {this.renderDelete()}
      </li>
    );
  },

  renderDelete () {
    if (this.state.hovering) {
      return (
        <span
          onClick={this.handleDelete.bind(null, this.props.index)}
          className='item-delete'>
            X
          </span>
      )
    }
  },

  handleClick (index) {
    AppActions.toggleCompletion(index);
  },

  handleDelete (id) {
    this.props.onDeleteTask(id);
  },

  handleMouseEnter () {
    this.setState({
      hovering: true
    });
  },

  handleMouseLeave () {
    this.setState({
      hovering: false
    });
  }
});
