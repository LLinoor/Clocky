var Stopwatch = function(elem, options){

  var timer = document.getElementById("timer");

  var started = false
  var buttonLabel = document.getElementById("buttonLabel");
  var danger = document.getElementById("danger");

  var startButton = document.getElementById("startbutton");
  startButton.addEventListener("click", function(event) {
    if (started == false) {
      started = true
      start()
      buttonLabel.textContent = "Stop"
      danger.style.visibility = "visible"
    } else {
      started = false
      stop()
      buttonLabel.textContent = "Start"
      danger.style.visibility = "hidden"
    }
    event.preventDefault();
  });
  
  var resetButton = document.getElementById("resetbutton");
  resetButton.addEventListener("click", function(event) {
    reset();
    event.preventDefault();
  });

  var offset,
      clock,
      interval;

  options = options || {};
  options.delay = options.delay || 1;

  reset();

  function start() {
    if (!interval) {
      offset   = Date.now();
      interval = setInterval(update, options.delay);
    }
  }

  function stop() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  function reset() {
    clock = 0;
    render();
  }

  function update() {
    clock += delta();
    render();
  }

  function render() {
    time = clock/1000
    if(time < 60){
      function rounder(x) {
        return Number.parseFloat(x).toFixed(2);
      }
      timer.innerHTML = rounder(time)
    }
    else if(time > 60 && time < 3600){
      var minutes = Math.floor(time / 60);
      var seconds = time - minutes * 60;
      var seconds = Math.round(seconds);
      var formattedMinutes = ("0" + minutes).slice(-2);
      var formattedSeconds = ("0" + seconds).slice(-2);
      timer.innerHTML = `${formattedMinutes}:${formattedSeconds}`
    }
    else if(time > 3600){  
      // source : https://stackoverflow.com/a/11486026 (thx to him)
          var hrs = ~~(time / 3600);
          var mins = ~~((time % 3600) / 60);
          var secs = ~~time % 60;
      
          var ret = "";
      
          if (hrs > 0) {
              ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
          }
      
          ret += "" + mins + ":" + (secs < 10 ? "0" : "");
          ret += "" + secs;
          timer.innerHTML = ret
      
    }
  }

  function delta() {
    var now = Date.now(),
        d   = now - offset;

    offset = now;
    return d;
  }
};

var elems = document.getElementsByClassName("stopwatch");

var elem = document.getElementById("my-stopwatch");
var timer = new Stopwatch(elem);

for (var i=0, len=elems.length; i<len; i++) {
  new Stopwatch(elems[i]);
}