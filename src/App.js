import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './components/layout/Header';
import Todo from './components/Todo';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
//import uuid from 'uuid';
import Axios from 'axios';

class App extends Component {

  state = {
    todos: []
  }

  componentDidMount() {
    Axios.get('http://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(resp => this.setState({
      todos: resp.data
    }))
  }

  //Toggle complete
  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if(todo.id === id){
          todo.completed = !todo.completed
        }
        return todo;
      })
    });
  }

  //Delete todo list item

  delTodo = (id) => {
    Axios.delete(`http://jsonplaceholder.typicode.com/todos/${id}`)
    .then(resp => this.setState({
      todos : [...this.state.todos.filter(todo => todo.id !== id)]
    }));
  }

  // Add todo
  addTodo = (title) => {
    Axios.post('http://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    })
    .then(resp=> this.setState({
      todos: [...this.state.todos, resp.data]
    }));
    
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo = {this.addTodo}/>
                <Todo todos={this.state.todos} markComplete = {this.markComplete} delTodo={this.delTodo}/>
              </React.Fragment>
            )} />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
