/* global document, setInterval, clearInterval */
var startTime = null;
const secondsInMinute = 60;
const secondsInHour = 60 * 60;

var seconds = document.getElementById("seconds");
var minutes = document.getElementById("minutes");
var hours = document.getElementById("hours");
var action = document.getElementById("action");
var reset = document.getElementById("reset");

action.addEventListener("click", onAction);
reset.addEventListener("click", onReset);

var interval = null;

var state = {
    start: "START",
    pause: "PAUSE",
    reset: "RESET"
}

function onAction(){
    if(interval){
        changeState(state.pause);
    } else {
        changeState(state.start);
    }
}

function onReset(){
    changeState(state.reset);
}

function changeState(st){
    switch (st) {
        case state.start:
            startTimer();
            break;
        case state.pause:
            stopTimer();
            break;
        case state.reset:
            stopTimer();
            resetTime();
            break;
        default:
            throw new Error("Unknown state")
    }
    updateActionButton();
}

function getString(n) {
    if (n < 10) {
        return "0" + String(n);
    } else {
        return String(n);
    }
}

function setTime(h, m, s) {
    hours.innerText = getString(h);
    minutes.innerText = getString(m);
    seconds.innerText = getString(s);
}

function updateTime() {
    var diff = Math.floor((Date.now() - startTime) / 1000);
    var hours = Math.floor(diff / secondsInHour);
    diff = diff - hours * secondsInHour;
    var minutes = Math.floor(diff / secondsInMinute);
    diff = diff - minutes * secondsInMinute;
    var seconds = diff;
    setTime(hours, minutes, seconds);
}

function getOffset(){
    var s = Number(seconds.innerText, 10);
    var m = Number(minutes.innerText, 10);
    var h = Number(hours.innerText, 10);
    var offset = h*secondsInHour + m*secondsInMinute + s;
    var offsetInMs = offset * 1000;
    return offsetInMs;
}

function getStartTime() {
    var offset = getOffset();
    var now = Date.now();
    var sTime = now - offset;
    return sTime;
}

function resetTime(){
    seconds.innerHTML = "00";
    minutes.innerHTML = "00";
    hours.innerHTML = "00";
}

function startTimer() {
    startTime = getStartTime();
    interval = setInterval(updateTime, 100);
    reset.disabled = true;
}

function updateActionButton(){
    if (interval){
        action.innerText = "Pause";
    } else if (getOffset() > 0) {
        action.innerText = "Continue";
    } else {
        action.innerText = "Start";
    }
}

function stopTimer(){
    clearInterval(interval);
    interval = null;
    reset.disabled = false;
}