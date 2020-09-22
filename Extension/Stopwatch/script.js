var Stopwatch = function(elem, options){

  var timer = document.getElementById("timer");

  var started = false
  var buttonLabel = document.getElementById("buttonLabel");

  var startButton = document.getElementById("startbutton");
  startButton.addEventListener("click", function(event) {
    if (started == false) {
      started = true
      start()
      buttonLabel.textContent = "Stop"
    } else {
      started = false
      stop()
      buttonLabel.textContent = "Start"
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
    timer.innerHTML = clock/1000;
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