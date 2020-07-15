class DOMHelper {

  static clearEventListeners(element) {
    const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
    return clonedElement;
  }
  static moveElement(elementId, newDestinationSelector) {
    const element = document.getElementById(elementId);
    const destinationElement = document.querySelector(newDestinationSelector);
    destinationElement.append(element);
    element.scrollIntoView({behavior: 'smooth'});
  }

}

class Component {
  constructor(hostElementId, insertBefore = false) {
    if (hostElementId) {
      this.hostElement = document.getElementById(hostElementId);
    } else {
      this.hostElement = document.body;
    }
    this.insertBefore = insertBefore;
  }

  remove() {
    if (this.element) {
      this.element.remove();
      // this.element.parentElement.removeChild(this.element); "older syntax" 
    }

  }

  show() {
    this.hostElement.insertAdjacentElement(this.insertBefore ? 'afterbegin': 'beforeend', this.element);
  }
}


class ToolTip extends Component {
  constructor(closeNotifierFunc, text, hostElementId) {
    super(hostElementId);
    this.closeNotifier = closeNotifierFunc;
    this.text = text;
    this.render();
  }

  render() {
    const toolTipEl = document.createElement('div');
    toolTipEl.className = 'card';
    toolTipEl.textContent = this.text;

    const hostElPosLeft = this.hostElement.offsetLeft;
    const hostElPosTop = this.hostElement.offsetTop;
    const hostElHeight = this.hostElement.clientHeight;
    const parentElScroll = this.hostElement.parentElement.scrollTop;

    const x = hostElPosLeft + 20;
    const y = hostElPosTop + hostElHeight - parentElScroll - 10;
    toolTipEl.style.position = 'absolute';
    toolTipEl.style.left = x + 'px';
    toolTipEl.style.top = y + 'px';

    console.log(this.hostElement.getBoundingClientRect());
    toolTipEl.addEventListener('click', this.closeToolTip);
    this.element = toolTipEl;
  }

  closeToolTip = () => {
    this.remove();
    this.closeNotifier();
  }
}


class ProjectItem {
  hasActiveTooltip = false;

  constructor(id, updateProjectListFunc, type) {
    this.id = id;
    this.updateProjectListHandler = updateProjectListFunc;
    this.connectSwitchButton(type);
    this.connectMoreInfoButton();
  }

  connectSwitchButton(type) {
    const projItemEl = document.getElementById(this.id);
    let switchBtn = projItemEl.querySelector('button:last-of-type');
    switchBtn = DOMHelper.clearEventListeners(switchBtn);
    switchBtn.textContent = type === 'active' ? 'Finish' : 'Activate';
    switchBtn.addEventListener('click', this.updateProjectListHandler.bind(null, this.id));
  }

  showMoreInfoHandler() {
    if (this.hasActiveTooltip) {
      return;
    }
    const projectElement = document.getElementById(this.id);
    const toolTipText = projectElement.dataset.extraInfo;
    const tootlip = new ToolTip(() => {
      this.hasActiveTooltip = false;
    }, toolTipText, this.id);
    tootlip.show();
    this.hasActiveTooltip = true;
  }

  connectMoreInfoButton() {
    const projItemEl = document.getElementById(this.id);
    let infoBtn = projItemEl.querySelector('button:first-of-type');
    infoBtn.addEventListener('click', this.showMoreInfoHandler.bind(this));

  }

  update(updateProjectListFunc, type) {
    this.updateProjectListHandler = updateProjectListFunc;
    this.connectSwitchButton(type)
  }
}

class ProjectList {
  projects = [];

  constructor(type) {
    this.type = type;
    const projItems = document.querySelectorAll(`#${type}-projects li`);
    for (const projItem of projItems) {
      this.projects.push(new ProjectItem(projItem.id, this.switchProject.bind(this), this.type));
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

  addProject(project) {
    console.log(project);
    this.projects.push(project);
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
    project.update(this.switchProject.bind(this), this.type);
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