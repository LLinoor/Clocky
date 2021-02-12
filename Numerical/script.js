var currentZone = window.location.search.substr(1)
url =
console.log(currentZone)

const Http = new XMLHttpRequest()
if (currentZone == ""){
    url = "http://worldtimeapi.org/api/ip.json"
    console.log("ok")
}
else {
    url = "http://worldtimeapi.org/api/timezone/" + currentZone
    console.log(url)
}
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
utc_offset = response["utc_offset"]
ok = +1

function refresh(){
   counter = counter + 1
   var t = 1000;
   setTimeout('showDate()',t)
}  

function showDate() {
    if(isConnected == true){
        unix =  response["unixtime"]*(60*ok)
        unix = response["unixtime"] + counter
        var milliseconds = unix * 1000
        date = new Date(milliseconds)
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
africa = ["Abidjan", "Accra", "Algiers", "Bissau", "Cairo", "Casablanca", "Ceuta", "El_Aaiun", "Johannesburg", "Juba", "Khartoum", "Lagos", "Maputo", "Monrovia", "Nairobi", "Ndjamena", "Sao_Tome", "Tripoli", "Tunis", "Windhoek"]
america = ["Adak", "Anchorage", "Araguaina", "Argentina/Buenos_Aires", "Argentina/Catamarca", "Argentina/Cordoba", "Argentina/Jujuy", "Argentina/La_Rioja", "Argentina/Mendoza", "Argentina/Rio_Gallegos", "Argentina/Salta", "Argentina/San_Juan", "Argentina/San_Luis", "Argentina/Tucuman", "Argentina/Ushuaia", "Asuncion", "Atikokan", "Bahia", "Bahia_Banderas", "Barbados", "Belem", "Belize", "Blanc-Sablon", "Boa_Vista", "Bogota", "Boise", "Cambridge_Bay", "Campo_Grande", "Cancun", "Caracas", "Cayenne", "Chicago", "Chihuahua", "Costa_Rica", "Creston", "Cuiaba", "Curacao", "Danmarkshavn", "Dawson", "Dawson_Creek", "Denver", "Detroit", "Edmonton", "Eirunepe", "El_Salvador", "Fort_Nelson", "Fortaleza", "Glace_Bay", "Goose_Bay", "Grand_Turk", "Guatemala", "Guayaquil", "Guyana", "Halifax", "Havana", "Hermosillo", "Indiana/Indianapolis", "Indiana/Knox", "Indiana/Marengo", "Indiana/Petersburg", "Indiana/Tell_City", "Indiana/Vevay", "Indiana/Vincennes", "Indiana/Winamac", "Inuvik", "Iqaluit", "Jamaica", "Juneau", "Kentucky/Louisville", "Kentucky/Monticello", "La_Paz", "Lima", "Los_Angeles", "Maceio", "Managua", "Manaus", "Martinique", "Matamoros", "Mazatlan", "Menominee", "Merida", "Metlakatla", "Mexico_City", "Miquelon", "Moncton", "Monterrey", "Montevideo", "Nassau", "New_York", "Nipigon", "Nome", "Noronha", "North_Dakota/Beulah", "North_Dakota/Center", "North_Dakota/New_Salem", "Nuuk", "Ojinaga", "Panama", "Pangnirtung", "Paramaribo", "Phoenix", "Port-au-Prince", "Port_of_Spain", "Porto_Velho", "Puerto_Rico", "Punta_Arenas", "Rainy_River", "Rankin_Inlet", "Recife", "Regina", "Resolute", "Rio_Branco", "Santarem", "Santiago", "Santo_Domingo", "Sao_Paulo", "Scoresbysund", "Sitka", "St_Johns", "Swift_Current", "Tegucigalpa", "Thule", "Thunder_Bay", "Tijuana", "Toronto", "Vancouver", "Whitehorse", "Winnipeg", "Yakutat", "Yellowknife"]
asia = ["Almaty", "Amman", "Anadyr", "Aqtau", "Aqtobe", "Ashgabat", "Atyrau", "Baghdad", "Baku", "Bangkok", "Barnaul", "Beirut", "Bishkek", "Brunei", "Chita", "Choibalsan", "Colombo", "Damascus", "Dhaka", "Dili", "Dubai", "Dushanbe", "Famagusta", "Gaza", "Hebron", "Ho_Chi_Minh", "Hong_Kong", "Hovd", "Irkutsk", "Jakarta", "Jayapura", "Jerusalem", "Kabul", "Kamchatka", "Karachi", "Kathmandu", "Khandyga", "Kolkata", "Krasnoyarsk", "Kuala_Lumpur", "Kuching", "Macau", "Magadan", "Makassar", "Manila", "Nicosia", "Novokuznetsk", "Novosibirsk", "Omsk", "Oral", "Pontianak", "Pyongyang", "Qatar", "Qostanay", "Qyzylorda", "Riyadh", "Sakhalin", "Samarkand", "Seoul", "Shanghai", "Singapore", "Srednekolymsk", "Taipei", "Tashkent", "Tbilisi", "Tehran", "Thimphu", "Tokyo", "Tomsk", "Ulaanbaatar", "Urumqi", "Ust-Nera", "Vladivostok", "Yakutsk", "Yangon", "Yekaterinburg", "Yerevan"]
atlantic = ["Azores", "Bermuda", "Canary", "Cape_Verde", "Faroe", "Madeira", "Reykjavik", "South_Georgia", "Stanley"]
australia = ["Adelaide", "Brisbane", "Broken_Hill", "Darwin", "Eucla", "Hobart", "Lindeman", "Lord_Howe", "Melbourne", "Perth", "Sydney"]
europe = ["Amsterdam", "Andorra", "Astrakhan", "Athens", "Belgrade", "Berlin", "Brussels", "Bucharest", "Budapest", "Chisinau", "Copenhagen", "Dublin", "Gibraltar", "Helsinki", "Istanbul", "Kaliningrad", "Kiev", "Kirov", "Lisbon", "London", "Luxembourg", "Madrid", "Malta", "Minsk", "Monaco", "Moscow", "Oslo", "Paris", "Prague", "Riga", "Rome", "Samara", "Saratov", "Simferopol", "Sofia", "Stockholm", "Tallinn", "Tirane", "Ulyanovsk", "Uzhgorod", "Vienna", "Vilnius", "Volgograd", "Warsaw", "Zaporozhye", "Zurich"]
india = ["Chagos", "Christmas", "Cocos", "Kerguelen", "Mahe", "Maldives", "Mauritius", "Reunion"]
pacific = ["Apia", "Auckland", "Bougainville", "Chatham", "Chuuk", "Easter", "Efate", "Enderbury", "Fakaofo", "Fiji", "Funafuti", "Galapagos", "Gambier", "Guadalcanal", "Guam", "Honolulu", "Kiritimati", "Kosrae", "Kwajalein", "Majuro", "Marquesas", "Nauru", "Niue", "Norfolk", "Noumea", "Pago_Pago", "Palau", "Pitcairn", "Pohnpei", "Port_Moresby", "Rarotonga", "Tahiti", "Tarawa", "Tongatapu", "Wake", "Wallis"]
gmt = ["GMT-14", "GMT-13", "GMT-12", "GMT-11", "GMT-10", "GMT-9", "GMT-8", "GMT-7", "GMT-6", "GMT-5", "GMT-4", "GMT-3", "GMT-2", "GMT-1", "GMT", "GMT+1", "GMT+2", "GMT+3", "GMT+4", "GMT+5", "GMT+6", "GMT+7", "GMT+8", "GMT+9", "GMT+10", "GMT+11", "GMT+12"]

function loadCountries() {
    select = document.getElementById("timezones")
    value = select.value
    if(countrySelected == false){
        countrySelected = true
        zone = value
        select.innerHTML = ""
        if(value == "Africa"){
            for(let i = 0; i < europe.length; i++){
                newTime = document.createElement("option")
                newTime.value = africa[i]
                var text = africa[i]
                text = text.replace("_", " ")
                text = text.replace("_", " ")
                text = text.replace("_", " ")
                newTime.textContent = text
                select.appendChild(newTime)
            }
        }
        else if(value == "America"){
            for(let i = 0; i < america.length; i++){
                newTime = document.createElement("option")
                newTime.value = america[i]
                var text = america[i]
                if(text.includes("Argentina") || text.includes("Indiana") || text.includes("Kentucky") || text.includes("North Dakota")){
                    text = text.replace("/", " - ")
                }
                text = text.replace("_", " ")
                text = text.replace("_", " ")
                text = text.replace("_", " ")
                newTime.textContent = text
                select.appendChild(newTime)
            }
        }
        else if(value == "Asia"){
            for(let i = 0; i < asia.length; i++){
                newTime = document.createElement("option")
                newTime.value = asia[i]
                var text = asia[i]
                text = text.replace("_", " ")
                text = text.replace("_", " ")
                text = text.replace("_", " ")
                newTime.textContent = text
                select.appendChild(newTime)
            }
        }
        else if(value == "Atlantic"){
            for(let i = 0; i < atlantic.length; i++){
                newTime = document.createElement("option")
                newTime.value = atlantic[i]
                var text = atlantic[i]
                text = text.replace("_", " ")
                text = text.replace("_", " ")
                text = text.replace("_", " ")
                newTime.textContent = text
                select.appendChild(newTime)
            }
        }
        else if(value == "Australia"){
            for(let i = 0; i < australia.length; i++){
                newTime = document.createElement("option")
                newTime.value = australia[i]
                var text = australia[i]
                text = text.replace("_", " ")
                text = text.replace("_", " ")
                text = text.replace("_", " ")
                newTime.textContent = text
                select.appendChild(newTime)
            }
        }
        else if(value == "Europe"){
            for(let i = 0; i < europe.length; i++){
                newTime = document.createElement("option")
                newTime.value = europe[i]
                var text = europe[i]
                if(text.includes("Argentina") || text.includes("Indiana") || text.includes("Kentucky") || text.includes("North Dakota")){
                    text = text.replace("/", " - ")
                }
                text = text.replace("_", " ")
                text = text.replace("_", " ")
                text = text.replace("_", " ")
                newTime.textContent = text
                select.appendChild(newTime)
            }
        }
        else if(value == "India"){
            for(let i = 0; i < india.length; i++){
                newTime = document.createElement("option")
                newTime.value = india[i]
                var text = india[i]
                if(text.includes("Argentina") || text.includes("Indiana") || text.includes("Kentucky") || text.includes("North Dakota")){
                    text = text.replace("/", " - ")
                }
                text = text.replace("_", " ")
                text = text.replace("_", " ")
                text = text.replace("_", " ")
                newTime.textContent = text
                select.appendChild(newTime)
            }
        }
        else if(value == "Pacific"){
            for(let i = 0; i < pacific.length; i++){
                newTime = document.createElement("option")
                newTime.value = pacific[i]
                var text = pacific[i]
                text = text.replace("_", " ")
                text = text.replace("_", " ")
                text = text.replace("_", " ")
                newTime.textContent = text
                select.appendChild(newTime)
            }
        }
        else if(value == "GMT"){
            for(let i = 0; i < pacific.length; i++){
                newTime = document.createElement("option")
                newTime.value = gmt[i]
                var text = gmt[i]
                text = text.replace("_", " ")
                text = text.replace("_", " ")
                text = text.replace("_", " ")
                newTime.textContent = text
                select.appendChild(newTime)
            }
        }
    }
    else{
        window.location = window.location.pathname + "?" + zone + "/" + value
    }
}