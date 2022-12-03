/* function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
} */

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  formEl: document.querySelector('.form'),
};

let MAX_PROMPT = 0;
let delayValue = 0;
let stepValue = 0;

refs.formEl.addEventListener('submit', onFormElSubmit);

function onFormElSubmit(e) {
  // заборона по замовчуванню
  e.preventDefault();
  onFormElPromise();
  refs.formEl.reset();
}

function onFormElPromise() {
  const { delay, step, amount } = refs.formEl.elements;
  delayValue = Number(delay.value);
  stepValue = Number(step.value);
  MAX_PROMPT = Number(amount.value);
  // виклик функцііі MAX_PROMPT разів
  for (let position = 1; position <= MAX_PROMPT; position += 1) {
    createPromise(position, delayValue)
      .then(({ position, delayValue }) => {
        setTimeout(() => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delayValue}ms`);
        }, delayValue);
      })
      .catch(({ position, delayValue }) => {
        setTimeout(() => {
          Notify.failure(`❌ Rejected promise ${position} in ${delayValue}ms`);
        }, delayValue);
      });
    delayValue += stepValue;
  }
}

function createPromise(position, delayValue) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({ position, delayValue });
    } else {
      reject({ position, delayValue });
    }
  });
}