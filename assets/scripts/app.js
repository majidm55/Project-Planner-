class ToolTip {}

class ProjectItem{
  constructor(id) {
    this.id = id;
    this.connectSwitchButton();
    this.connectMoreInfoButton();
  }

  connectSwitchButton() {

  }

  connectMoreInfoButton() {
    const projItemEl = document.getElementById(this.id);
    const switchBtn = projItemEl.querySelector('button:last-of-type');
    switchBtn.addEventListener('click', )
  }
}

class ProjectList {
  projects = [];

  constructor(type) {
    const projItems = document.querySelectorAll(`#${type}-projects li`);
    for (const projItem of projItems) {
      this.projects.push(new ProjectItem(projItem.id));
    }
    console.log(this.projects);
  }
}

class App {
  static init() {
    const activeProjectList = new ProjectList('active');
    const finishedProjectList = new ProjectList('finished');
  }
}

App.init();