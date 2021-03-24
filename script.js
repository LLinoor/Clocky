var t0 = performance.now();
var currentZone = window.location.search.substr(1)
externalTimezone = false
multiplesClock = false
counter = 0

send = false

function successConnection(clock){
    isConnected = true
    document.getElementById('info').innerHTML = 'Connected to <a href="http://worldtimeapi.org/" rel="noreferrer">satellite</a> (~1sec) 🛰️'
    response = JSON.parse(clock)
    showDate()
}

function failedConnection(){
    isConnected = false
    document.getElementById('info').innerHTML = 'Unable to get the satellite time, switch to local time. ❌'
    showDate()
}

getTime = function(currentZone, Http, callback){
    if (currentZone == ""){
        url = "https://worldtimeapi.org/api/ip.json"
        externalTimezone = false
    }
    else if(currentZone.includes("GMT")){
        if(currentZone.includes("+")){
            currentZone = currentZone.replace("+", "-")
        }
        else if(currentZone.includes("-")){
            currentZone = currentZone.replace("-", "+")
        }
        url = "https://worldtimeapi.org/api/timezone/" + currentZone
        externalTimezone = true
    }
    else {
        url = "https://worldtimeapi.org/api/timezone/" + currentZone
        externalTimezone = true
    }
    Http.open("GET", url)
    Http.onreadystatechange = function(){
        if(Http.readyState == 4 && Http.status == 200){
            callback(Http.response)
            return
        }
        else if(Http.readyState == 4 && Http.status > 299){
            failedConnection()
            return
        }
    }
    Http.send()
}

isConnected = false

function createClock(id){
    clockContainer = document.createElement("div")
    info = document.createElement("p")
    clock = document.createElement("span")
    clock.className = "horloge"
    clock.id = id
    clockContainer.appendChild(clock)
    clockContainer.appendChild(info)
    document.body.appendChild(clockContainer)
    return clockContainer
}

if(currentZone.includes("&")){
    multiplesClock = true
    timezones = currentZone.split("&")
    clockage = []
    http = []
    allClock = []
        for (i = 0; i < timezones.length; i++){
            getClock = createClock(timezones[i])
            allClock.push(getClock)
            http[i] = new XMLHttpRequest()
            getTime(timezones[i], http[i], function(response){
                clockage.push(response)
                showDate()
            })
            isConnected = true
            document.getElementById('info').innerHTML = 'Connected to <a href="http://worldtimeapi.org/" rel="noreferrer">satellite</a> (~1sec) 🛰️'
    }
}

if(multiplesClock == false){
    http = new XMLHttpRequest()
    createClock("ok")
    getTime(currentZone, http, function(response){
        successConnection(response)
        if(externalTimezone == true){   
            info.textContent = currentZone
        }
        else{
            info.textContent = "Local Time"
        }
    })
}

function refresh(){
   counter = counter + 1
   var t = 1000;
   setTimeout('showDate()',t)
}  

function showDate() {
    if(multiplesClock == true && isConnected == true){
        for(i=0; i < allClock.length; i++){
            response = clockage[i]
            response = JSON.parse(response)
            allClock[i].childNodes[1].textContent = response["timezone"]
            x = response["datetime"].slice(0, -6)
            t1 = performance.now();
            console.log(t1)
            date = new Date(x)
            date.setSeconds(date.getSeconds() + counter)
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            if( h < 10 ){ h = '0' + h; }
            if( m < 10 ){ m = '0' + m; }
            if( s < 10 ){ s = '0' + s; }
            var time = h + ':' + m + ':' + s
            allClock[i].childNodes[0].textContent = time
        }
    }
    else if(isConnected == true && multiplesClock == false){
        x = response["datetime"].slice(0, -6)
        date = new Date(x)
        date.setSeconds(date.getSeconds() + counter)
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();
        if( h < 10 ){ h = '0' + h; }
        if( m < 10 ){ m = '0' + m; }
        if( s < 10 ){ s = '0' + s; }
        var time = h + ':' + m + ':' + s
        clock.textContent = time
    }
    else{
        var date = new Date()
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();
        if( h < 10 ){ h = '0' + h; }
        if( m < 10 ){ m = '0' + m; }
        if( s < 10 ){ s = '0' + s; }
        var time = h + ':' + m + ':' + s
        clock.textContent = time
    }
    refresh()
}