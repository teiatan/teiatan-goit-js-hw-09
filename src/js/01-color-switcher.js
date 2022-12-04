const refs = {
    body: document.querySelector('body'),
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
};
  
let intervalId = null;
refs.startBtn.addEventListener('click', startColorChanging);
refs.stopBtn.disabled = true;

function startColorChanging() {
    refs.startBtn.removeEventListener('click', startColorChanging);  
    refs.stopBtn.addEventListener('click', stopColorChanging);
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
    intervalId = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
}

function stopColorChanging() {
    refs.stopBtn.removeEventListener('click', stopColorChanging);
    refs.startBtn.addEventListener('click', startColorChanging);
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
    clearInterval(intervalId);
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}