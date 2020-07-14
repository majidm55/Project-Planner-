class ToolTip {}

class ProjectItem{
  constructor(id, updateProjectListFunc) {
    this.id = id;
    this.updateProjectListHandler = updateProjectListFunc;
    this.connectSwitchButton();
    this.connectMoreInfoButton();
  }

  connectSwitchButton() {

  }

  connectMoreInfoButton() {
    const projItemEl = document.getElementById(this.id);
    const switchBtn = projItemEl.querySelector('button:last-of-type');
    switchBtn.addEventListener('click', this.updateProjectListHandler)
  }
}

class ProjectList {
  projects = [];

  constructor(type) {
    this.type = type;
    const projItems = document.querySelectorAll(`#${type}-projects li`);
    for (const projItem of projItems) {
      this.projects.push(new ProjectItem(projItem.id, this.switchProject.bind(this)));
    }
    console.log(this.projects);
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

  addProject() {
    console.log(this);
  }
}

class App {
  static init() {
    const activeProjectList = new ProjectList('active');
    const finishedProjectList = new ProjectList('finished');
    activeProjectList.setSwitchHandlerFunction(finishedProjectList.addProject.bind(finishedProjectList));
    finishedProjectList.setSwitchHandlerFunction(activeProjectList.addProject.bind(activeProjectList));
  }
}

App.init();