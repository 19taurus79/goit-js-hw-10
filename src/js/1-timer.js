import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
let userSelectedDate;
const element = document.querySelector('#datetime-picker');
const button = document.querySelector('[data-start]');
const stopBtn = document.querySelector('#stop-btn');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < new Date()) {
      alert('Please choose a date in the future');
      button.disabled = true;
    } else {
      button.disabled = false;
    }
    if (element.value === '') {
      button.disabled = true;
    }
  },
};
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return value.padStart(2,"0")
}
button.addEventListener('click', startTimer);

function startTimer() {
  // const currentDate = new Date().getTime();
  // const converTimer = convertMs(userSelectedDate.getTime() - currentDate);
  // const deltaTimer = userSelectedDate.getTime() - currentDate;
  // console.log(`current date ${currentDate}`);
  // console.log(`select date ${userSelectedDate.getTime()}`);
  // console.log(converTimer);
  // console.log(`delta ${deltaTimer}`);
  let timer = setInterval(updateTimer, 1000);
  console.log(timer);
  // seconds.textContent = convertMs(
  // userSelectedDate.getTime() - new Date().getTime()
  // ).seconds;
}
function updateTimer() {
  const currentDate = new Date().getTime();
  const deltaTimer = userSelectedDate.getTime() - currentDate;
  const converTimer = convertMs(deltaTimer);
  if (deltaTimer < 0) {
    clearInterval(timer);
  }
  days.textContent = addLeadingZero(String(converTimer.days));
  hours.textContent = addLeadingZero(String(converTimer.hours));
  minutes.textContent = addLeadingZero(String(converTimer.minutes));
  seconds.textContent = addLeadingZero(String(converTimer.seconds));
}
flatpickr(element, options);
stopBtn.addEventListener('click', event => {
  for (let i = 1; i < 99999; i++) {
    clearInterval(i);
  }
  console.log('Все интервалы остановлены!');
});
