var startTime = null;
var secondsInMinute = 60;
var secondsInHour = 60 * 60;
var seconds = document.getElementById("seconds");
var minutes = document.getElementById("minutes");
var hours = document.getElementById("hours");
var interval = null;

var start = document.getElementById("start");
start.addEventListener("click", startTimer);

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

function startTimer() {
    startTime = Date.now();
    interval = setInterval(updateTime, 100);
}