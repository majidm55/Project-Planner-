import { DOMHelper } from '../Utility/DOMHelper.js';
import { ToolTip } from './TootlTip.js';


export class ProjectItem {
  hasActiveTooltip = false;

  constructor(id, updateProjectListFunc, type) {
    this.id = id;
    this.updateProjectListHandler = updateProjectListFunc;
    this.connectSwitchButton(type);
    this.connectMoreInfoButton();
    this.connectDrag();
  }
  connectDrag() {
    const item = document.getElementById(this.id)
    item.addEventListener('dragstart', event => {
      event.dataTransfer.setData('text/plain', this.id);
      event.dataTransfer.effectAllowed = 'move';
    });

    item.addEventListener('dragend', event => {
      console.log('drag end', event);
    });
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