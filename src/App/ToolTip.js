import { Component } from './Component.js';

export class ToolTip extends Component {
  constructor(closeNotifierFunc, text, hostElementId) {
    super(hostElementId);
    this.closeNotifier = closeNotifierFunc;
    this.text = text;
    this.closeToolTip = () => {
      this.remove();
      this.closeNotifier();
      };
    this.render();
  }

  render() {
    const toolTipEl = document.createElement('div');
    toolTipEl.className = 'card';
    const toolTipTemplate = document.getElementById('tooltip');
    const toolTipBody = document.importNode(toolTipTemplate.content, true);
    toolTipBody.querySelector('p').textContent = this.text;
    toolTipEl.append(toolTipBody);

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


}