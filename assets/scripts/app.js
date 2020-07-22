import { ProjectList } from './App/ProjectList.js';

class App {
  static init() {
    const activeProjectList = new ProjectList('active');
    const finishedProjectList = new ProjectList('finished');
    activeProjectList.setSwitchHandlerFunction(finishedProjectList.addProject.bind(finishedProjectList));
    finishedProjectList.setSwitchHandlerFunction(activeProjectList.addProject.bind(activeProjectList));

    // const someScript = document.createElement('script');
    // someScript.textContent = 'alert("Hi there!")';
    // document.head.append(someScript);

    // const timeId = setTimeout(this.startAnalytics, 3000);
    // document.getElementById('stop-analytics-btn').addEventListener('click', () => {
    //   clearTimeout(timeId);
    // });
  }

  static startAnalytics() {
    const analyticsScript = document.createElement('script');
    analyticsScript.src = 'assets/scripts/Utility/Analytics.js';
    analyticsScript.defer = true;
    document.head.append(analyticsScript);
  }
}

App.init();