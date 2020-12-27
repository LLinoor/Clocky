const button = document.getElementById("button")
const stop = document.getElementById("stop")
var audio = new Audio('drill.flac');

button.addEventListener("click", function(event) {
    function getInputValue(){
        var start = Date.now();
        seconds = document.getElementById("seconds").value;
        obj = start + seconds*1000
        return obj
    }
    var obj = getInputValue()

    var timer = setInterval(function(){
        var start = Date.now();
        var timerText = document.getElementById("timer")
        var distance = obj - start

        timerText.innerHTML = distance/1000

        if(distance < 0){
            clearInterval(timer);
            audio.play()
            timerText.innerHTML = "Fini !"
            stop.style.visibility = "visible";
          }
    })

    event.preventDefault();
  })

  stop.addEventListener("click", function(event) {
    stop.style.visibility = "hidden";
    audio.pause()
    audio.currentTime = 0;
  })