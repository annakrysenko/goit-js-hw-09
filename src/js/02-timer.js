import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    handlerOnClose(selectedDates[0]);
  },
};

flatpickr('#datetime-picker', options);

let intervalId = null;

function handlerOnClose(date) {
  refs.btnStart.disabled = false;
  if (date.getTime() <= Date.now()) {
    Notiflix.Notify.failure('Please choose a date in the future', () => {});
    return;
  }

  refs.btnStart.addEventListener('click', () => {
    updateClockMarkup(date);
    intervalId = setInterval(() => {
      updateClockMarkup(date);
    }, 1000);
  });
}

function updateClockMarkup(date) {
  let currentTime = Date.now();
  let deltaTime = date.getTime() - currentTime;
  const times = convertMs(deltaTime);

  createIndividualTextContent(times);

  if (
    refs.days.textContent === '00' &&
    refs.hours.textContent === '00' &&
    refs.minutes.textContent === '00' &&
    refs.seconds.textContent === '00'
  ) {
    Notiflix.Notify.success('Time is over');
    clearInterval(intervalId);
    return;
  }
}

function createIndividualTextContent(times) {
  const { days, hours, minutes, seconds } = times;
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}