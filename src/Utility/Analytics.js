const timerTime = 2000;

const intervalId = setInterval(() => {
  console.log('Sending Analytics Data ....');
}, timerTime);

document.getElementById('stop-analytics-btn').addEventListener('click', () => {
  clearInterval(intervalId);
});