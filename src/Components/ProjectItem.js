import React, { Component } from 'react';

class ProjectItem extends Component {

  deleteProject(id) {
      this.props.onDelete(id);
  }

  render() {
    let project = this.props.project;
    return (
      <li className="Projects">
        <strong>{project.title}: </strong> {project.category}
        <a href="#" onClick = {this.deleteProject.bind(this, project.id)}> X </a>
      </li>
    );
  }
}

export default ProjectItem;
