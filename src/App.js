import React, { Component } from 'react';
import uuid from 'uuid';
import $ from 'jquery';
import Projects from './Components/Projects';
import AddProject from './Components/AddProject.js';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      projects : [],
      todos: []
    }
  }


  getTodos() {
    $.ajax({
      url : 'https://sb.dev',
      dataType: 'jsonp',
      crossDomain : true,
      cache: false,
      success: function(data) {
        this.setState({todos:data});
        console.log(data);
      }.bind(this),
      error : function(xhr,status,err) {
      }
    });
  }

  getProjects() {
    this.setState({
      projects : [
        {
          id : uuid.v4(),
          title : 'Business Website',
          category : 'Web Design'
        },
        {
          id: uuid.v4(),
          title : 'Social App',
          category : 'Mobile Development'
        },
        {
          id: uuid.v4(),
          title : 'Ecommerce Shopping Cart',
          category : 'Web Development'
        }
      ]
    });
  }

  componentWillMount() {
    this.getProjects();
    this.getTodos();
  }

  componentDidMount() {
    // this.getProjects();
    // this.getTodos();
  }

  handleAddProject(newProject) {
    let projects = this.state.projects;
    projects.push(newProject);
    this.setState({projects : projects});
  }

  handleDeleteProject(id) {
    let projects = this.state.projects;
    let index = projects.findIndex(x => x.id === id);
    projects.splice(index,1);
    this.setState({projects : projects});
  }

  render() {
    let todos;
    if (this.state.todos) {
      todos = this.state.todos.map(todo => {
        return <li>Title: {todo.title}</li>
      });
    }
    return (
      <div className="App">
        <AddProject addProject={this.handleAddProject.bind(this)}/>
        <br/>
        <Projects projects={this.state.projects} onDelete={this.handleDeleteProject.bind(this)}/>
        <ul>
          {todos}
        </ul>
      </div>
    );
  }
}

export default App;
