const Http = new XMLHttpRequest()
const url = "http://worldtimeapi.org/api/ip.json"
Http.open("GET", url)
Http.send()

response =
isConnected = false

Http.onreadystatechange=function(){
   if(this.readyState==4 && this.status==200){
    const json = Http.responseText
    response = JSON.parse(json)
    document.getElementById('info').innerHTML = 'Connected to <a href="http://worldtimeapi.org/" rel="noreferrer">satellite</a> (~1sec) 🛰️'
    isConnected = true
   }
   else if(this.status!=200 || this.readyState==0){
    document.getElementById('info').innerHTML = 'Unable to get the satellite time, switch to local time. ❌'
   }
}

counter = 0
response["unixtime"] = 0

function refresh(){
   counter = counter + 1
   var t = 1000;
   setTimeout('showDate()',t)
}  

function showDate() {
    if(isConnected == true){
        var unix = response["unixtime"] + counter
        var milliseconds = unix * 1000
        var date = new Date(milliseconds)
    }
    else{
        var date = new Date()
    }
   var h = date.getHours();
   var m = date.getMinutes();
   var s = date.getSeconds();
   if( h < 10 ){ h = '0' + h; }
   if( m < 10 ){ m = '0' + m; }
   if( s < 10 ){ s = '0' + s; }
   var time = h + ':' + m + ':' + s
   document.getElementById('horloge').innerHTML = time;
   refresh();
}

countrySelected = false
zone = ""

function loadCountries() {
    select = document.getElementById("timezones").value
    if(countrySelected == false){
        console.log(select)
    }
}