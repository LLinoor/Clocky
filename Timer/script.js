var obj = new Date("Jan 5, 2021 15:37:25").getTime()

var timer = setInterval(function(){
    var now = new Date().getTime()
    var distance = obj - now

    var days = Math.floor(distance / (1000 * 60 * 60 * 24))
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    var seconds = Math.floor((distance % (1000 * 60)) / 1000)

    var timerText = document.getElementById("timer")

    timerText.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
  
})