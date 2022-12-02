const refs = {
    body: document.querySelector('body'),
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
};
  
let intervalId = 0;
refs.startBtn.addEventListener('click', startColorChanging);

function startColorChanging() {
    refs.startBtn.removeEventListener('click', startColorChanging);
    refs.stopBtn.addEventListener('click', stopColorChanging);
    setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    intervalId += 1;
}

function stopColorChanging() {
    refs.stopBtn.removeEventListener('click', stopColorChanging);
    refs.startBtn.addEventListener('click', startColorChanging);
    clearInterval(intervalId);
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}