const buttonStartEl = document.querySelector('[data-start]')
const buttonStopEl = document.querySelector('[data-stop]')
const bodyEl = document.querySelector('body')

let timerId = null;
buttonStopEl.disabled = true;

buttonStartEl.addEventListener('click', () => {
    timerId = setInterval(() => {
        bodyEl.style.background = getRandomHexColor()
    }, 1000);

    buttonStopEl.disabled = false; 
    buttonStartEl.disabled = true;

})

buttonStopEl.addEventListener('click', () => {
    clearInterval(timerId);

    buttonStartEl.disabled = false;
    buttonStopEl.disabled = true; 
})



function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

