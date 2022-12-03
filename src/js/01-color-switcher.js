const refs = {
    body: document.querySelector('body'),
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
};
  
let intervalId = null;
refs.startBtn.addEventListener('click', startColorChanging);
refs.stopBtn.style.opacity = '10%';

function startColorChanging() {
    refs.startBtn.removeEventListener('click', startColorChanging);  
    refs.stopBtn.addEventListener('click', stopColorChanging);
    refs.startBtn.style.opacity = '10%';
    refs.stopBtn.style.opacity = '100%';
    intervalId = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
}

function stopColorChanging() {
    refs.stopBtn.removeEventListener('click', stopColorChanging);
    refs.startBtn.addEventListener('click', startColorChanging);
    refs.startBtn.style.opacity = '100%';
    refs.stopBtn.style.opacity = '10%';
    clearInterval(intervalId);
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}