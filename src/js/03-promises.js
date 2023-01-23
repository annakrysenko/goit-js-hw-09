import Notiflix from 'notiflix';

const refs = {
  formEl: document.querySelector('.form'),
};

refs.formEl.addEventListener('submit', e => {
  e.preventDefault();
  const delay = +e.target.elements.delay.value;
  const step = +e.target.elements.step.value;
  const amount = +e.target.elements.amount.value;

  let intervalId = null;
  let position = 1;

  setTimeout(() => {
    console.log(delay);
    createPromise({ position, delay })
      .then(({ position, delay }) => {
        console.log(position, delay);
        console.log('then', delay + position * step);
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay + position * step}ms`
        );
      })
      .catch(({ position, delay }) => {
        console.log(position, delay);
        console.log('catch', delay + position * step);
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay + position * step}ms`
        );
      });

    position++;
    intervalId = setInterval(() => {
      createPromise({ position, delay })
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${
              delay + position * step
            }ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${
              delay + position * step
            }ms`
          );
        });
      
      position++;
      if (position === amount) {
        clearInterval(intervalId);
      }
    }, step);
  }, delay);

  e.target.reset();
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve(position, delay);
    } else {
      reject(position, delay);
    }
  });

  return promise;
}