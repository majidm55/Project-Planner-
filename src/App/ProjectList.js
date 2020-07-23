// import { ProjectItem } from './ProjectItem.js';
import { ProjectItem as PrjItem } from './ProjectItem.js';
import * as DOMH from '../Utility/DOMHelper.js';
// import { moveElement } '../Utility/DOMHelper.js';


export class ProjectList {
  // projects = [];

  constructor(type) {
    this.type = type;
    this.projects = [];
    const projItems = document.querySelectorAll(`#${type}-projects li`);
    for (const projItem of projItems) {
      this.projects.push(new PrjItem(projItem.id, this.switchProject.bind(this), this.type));
    }
    console.log(this.projects);
    this.connectDroppable();
  }

  connectDroppable() {
    const list = document.querySelector(`#${this.type}-projects ul`);
    console.log(list);
    list.addEventListener('dragenter', event => {
      if (event.dataTransfer.types[0] === 'text/plain') {
        list.parentElement.classList.add('droppable');
        event.preventDefault();
      }
    });

    list.addEventListener('dragover', event => {
      event.preventDefault();
    });

    list.addEventListener('dragleave', event => {
      if (event.relatedTarget.closest(`#${this.type}-projects ul`) !== list) {
        list.parentElement.classList.remove('droppable');
      }
    });

    list.addEventListener('drop', event => {
      const projId = event.dataTransfer.getData('text/plain');
      if (this.projects.find(p => p.id === projId)) {
        return;
      }
      document.getElementById(projId).querySelector('button:last-of-type').click();
      list.parentElement.classList.remove('droppable');
      // event.preventDefault(); // not required

    });

  }

  setSwitchHandlerFunction(switchHandlerFunction) {
    this.switchHandler = switchHandlerFunction;
  }
  switchProject(projectId) {
    // const projuectIndex = this.projects.findIndex(p => p.id === projectId);
    // this.projects.splice(projuectIndex, 1);
    this.switchHandler(this.projects.find(p => p.id === projectId));
    this.projects = this.projects.filter(p => p.id !== projectId);
  }

  addProject(project) {
    console.log(project);
    this.projects.push(project);
    DOMH.moveElement(project.id, `#${this.type}-projects ul`);
    project.update(this.switchProject.bind(this), this.type);
  }
}