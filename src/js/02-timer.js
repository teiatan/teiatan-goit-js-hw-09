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

let selectedTime = null;
refs.startBtn.disabled = true;

class Timer {
  constructor({ startTimer }) {
      this.intervalId = null;
      this.isActive = false;
      this.startTimer = startTimer;
  }
  
  start() {
      refs.startBtn.disabled = true;
      if (this.isActive) {
      return;
      }
      this.isActive = true;
      this.intervalId = setInterval(() => {
          const currentTime = Date.now();
          const deltaTime = selectedTime - currentTime;
          const time = convertMs(deltaTime);
          this.startTimer(time);
          if (deltaTime <= 0) {
              clearInterval(this.intervalId);
              this.isActive = false;
              return;
          }
      }, 1000);
  }   
}

flatpickr(refs.input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notify.failure('Please choose a date in the future');
      refs.startBtn.disabled = true;
    } else {
      refs.startBtn.disabled = false;
      selectedTime = selectedDates[0];
      refs.startBtn.addEventListener('click', timer.start.bind(timer));
    }
  },
});

function twoNumbersString(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = twoNumbersString(Math.floor(ms / day));
  const hours = twoNumbersString(Math.floor((ms % day) / hour));
  const minutes = twoNumbersString(Math.floor(((ms % day) % hour) / minute));
  const seconds = twoNumbersString(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}

function show({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}

const timer = new Timer({
  startTimer: show,
});

