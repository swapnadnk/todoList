import React, { Component } from 'react';
import './AddTodo.css';
import PropTypes from 'prop-types';

export class AddTodo extends Component {
    state = {
        title: ' '
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addTodo(this.state.title);
        this.setState({title: ''});
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value})
  render() {
    return (
      <form onSubmit={this.onSubmit}>
          <input type="text" name="title" className="title" placeholder="Add Todo..." value={this.state.title} onChange={this.onChange}/>
          <input type="submit" value="Submit" className="btn"/>
      </form>
    )
  }
}


//PropTypes
AddTodo.propTypes = {
    addTodo: PropTypes.func.isRequired
  }

export default AddTodo
