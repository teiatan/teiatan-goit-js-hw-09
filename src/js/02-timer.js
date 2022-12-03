import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    input: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
  };
  const PROMPT_DELEY = 1000;
let selectedTime = null;
class Timer {
  constructor() {
    this.intervalId = null;
    this.isActive = false;
  }
  startTimer() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = selectedTime - currentTime;
      const time = convertMs(deltaTime);
      this.faceTimer(time);
      if (deltaTime <= 0) {
        clearInterval(this.intervalId);
        this.isActive = false;
      }
    }, PROMPT_DELEY);
  }
  faceTimer({ days, hours, minutes, seconds }) {
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
  }
}
const options = flatpickr(refs.input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notify.warning('Please choose a date in the future');
      refs.startBtn.disabled = true;
      selectedTime = Date.now();
    } else {
      refs.startBtn.disabled = false;
      selectedTime = selectedDates[0];
    }
  },
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  return { days, hours, minutes, seconds };
}
const timer = new Timer();
refs.startBtn.addEventListener('click', timer.startTimer.bind(timer));