import React from 'react';

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
            onClick={this.handleClick.bind(null, item.id)}
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
          onClick={this.handleDelete.bind(null, this.props.item.id)}
          className='item-delete'>
            X
          </span>
      )
    }
  },

  handleClick (id) {
    this.props.onToggleCompletion(id);
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
