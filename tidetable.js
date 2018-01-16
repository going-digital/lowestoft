var SunCalc = require('suncalc');
var moment = require('moment');
var lowestoft_gps = [52.481220, 1.762786];

/* Get list of astronomical events */
var eventsList = []

function moon_phase_ascii(a) {
    return " <i class='wi "+[
        "wi-moon-alt-new",
        "wi-moon-alt-waxing-crescent-1",
        "wi-moon-alt-waxing-crescent-2",
        "wi-moon-alt-waxing-crescent-3",
        "wi-moon-alt-waxing-crescent-4",
        "wi-moon-alt-waxing-crescent-5",
        "wi-moon-alt-waxing-crescent-6",
        "wi-moon-alt-first-quarter",
        "wi-moon-alt-waxing-gibbous-1",
        "wi-moon-alt-waxing-gibbous-2",
        "wi-moon-alt-waxing-gibbous-3",
        "wi-moon-alt-waxing-gibbous-4",
        "wi-moon-alt-waxing-gibbous-5",
        "wi-moon-alt-waxing-gibbous-6",
        "wi-moon-alt-full",
        "wi-moon-alt-waning-gibbous-1",
        "wi-moon-alt-waning-gibbous-2",
        "wi-moon-alt-waning-gibbous-3",
        "wi-moon-alt-waning-gibbous-4",
        "wi-moon-alt-waning-gibbous-5",
        "wi-moon-alt-waning-gibbous-6",
        "wi-moon-alt-third-quarter",
        "wi-moon-alt-waning-crescent-1",
        "wi-moon-alt-waning-crescent-2",
        "wi-moon-alt-waning-crescent-3",
        "wi-moon-alt-waning-crescent-4",
        "wi-moon-alt-waning-crescent-5",
        "wi-moon-alt-waning-crescent-6"
    ][Math.floor(a.phase * 28)]+"'></i>";
}

function bearing_ascii(n) {
    n = n * 180 / Math.PI;
    n = (n + 180) % 360
    bearing_string = ("000"+Math.round(n).toString()).slice(-3)+"&deg;";
    return bearing_string;
}

function euroscope_ascii(n) {
    n = n * 180 / Math.PI;
    n = (n + 180) % 360
    euroscope_string = [
        "NORTH", "N&frac12;E",  "N&#665;&#655;E",  "N&#665;&#655;E&frac12;E",
        "NNE", "NNE&frac12;E", "NE&#665;&#655;N", "NE&#665;&#655;N&frac12;E",
        "NE",    "NE&frac12;E", "NE&#665;&#655;E", "NE&#665;&#655;E&frac12;E",
        "ENE", "ENE&frac12;E", "E&#665;&#655;N",  "E&#665;&#655;N&frac12;E",
        "EAST",  "E&frac12;S",  "E&#665;&#655;S",  "E&#665;&#655;S&frac12;S",
        "ESE", "ESE&frac12;S", "SE&#665;&#655;E", "SE&#665;&#655;E&frac12;S",
        "SE",    "SE&frac12;S", "SE&#665;&#655;S", "SE&#665;&#655;S&frac12;S",
        "SSE", "SSE&frac12;S", "S&#665;&#655;E",  "S&#665;&#655;E&frac12;S",
        "SOUTH", "S&frac12;W",  "S&#665;&#655;W",  "S&#665;&#655;W&frac12;W",
        "SSW", "SSW&frac12;W", "SW&#665;&#655;S", "SW&#665;&#655;S&frac12;W",
        "SW",    "SW&frac12;W", "SW&#665;&#655;W", "SW&#665;&#655;W&frac12;W",
        "WSW", "WSW&frac12;W", "W&#665;&#655;S",  "W&#665;&#655;S&frac12;W",
        "WEST",  "W&frac12;N",  "W&#665;&#655;N",  "W&#665;&#655;N&frac12;N",
        "WNW", "WNW&frac12;N", "NW&#665;&#655;W", "NW&#665;&#655;W&frac12;N",
        "NW",    "NW&frac12;N", "NW&#665;&#655;N", "NW&#665;&#655;N&frac12;N",
        "NNW", "NNW&frac12;N", "N&#665;&#655;W",  "N&#665;&#655;W&frac12;N"
    ][
        Math.round((n/5.625) % 64)
    ];
    return euroscope_string;
}

var startDate = moment();
for (var day = 0; day < 28; day++) {
    var sunTimes = SunCalc.getTimes(startDate, lowestoft_gps[0], lowestoft_gps[1]);
    eventsList.push({
        date: sunTimes.sunrise,
        start: moment(sunTimes.sunrise).format("HH:mm"),
        type: "<i class='wi wi-sunrise'></i>",
        bearing: SunCalc.getPosition(sunTimes.sunrise, lowestoft_gps[0], lowestoft_gps[1]).azimuth
    });
    eventsList.push({
        date: sunTimes.sunsetStart,
        start: moment(sunTimes.sunsetStart).format("HH:mm"),
        type: "<i class='wi wi-sunset'></i>",
        bearing: SunCalc.getPosition(sunTimes.sunsetStart, lowestoft_gps[0], lowestoft_gps[1]).azimuth
    });
    var moonTimes = SunCalc.getMoonTimes(startDate, lowestoft_gps[0], lowestoft_gps[1]);
    if (moonTimes.rise) {
        moonPosition = SunCalc.getMoonPosition(moonTimes.rise, lowestoft_gps[0], lowestoft_gps[1]);
        moonIllumination = SunCalc.getMoonIllumination(moonTimes.rise);
        eventsList.push({
            date: moonTimes.rise,
            start: moment(moonTimes.rise).format("HH:mm"),
            type: "<i class='wi wi-moonrise'></i>"+moon_phase_ascii(SunCalc.getMoonIllumination(moonTimes.rise)),
            bearing: SunCalc.getMoonPosition(moonTimes.rise, lowestoft_gps[0], lowestoft_gps[1]).azimuth
        })
    }
    if (moonTimes.set) {
        moonPosition = SunCalc.getMoonPosition(moonTimes.set, lowestoft_gps[0], lowestoft_gps[1]);
        moonIllumination = SunCalc.getMoonIllumination(moonTimes.set);
        eventsList.push({
            date: moonTimes.set,
            start: moment(moonTimes.set).format("HH:mm"),
            type: "<i class='wi wi-moonset'></i>"+moon_phase_ascii(SunCalc.getMoonIllumination(moonTimes.set)),
            bearing: SunCalc.getMoonPosition(moonTimes.set, lowestoft_gps[0], lowestoft_gps[1]).azimuth
        })
    }
    startDate.add(1, 'd');
}

/* Sort list of events */
eventsList.sort(function (a, b){
    return a.date > b.date ? 1 : -1;
});

/* Inject table into page */
var almanac = document.getElementById('almanac');
for (var i = 0; i < eventsList.length; i++) {
    var j = eventsList[i];
    var row = document.createElement('tr');
    var cell_text = document.createTextNode(moment(j.date).format("Do MMM"));
    var cell = document.createElement('td');
    cell.appendChild(cell_text);
    row.appendChild(cell);
    var cell_text = document.createTextNode(j.start);
    var cell = document.createElement('td');
    cell.appendChild(cell_text);
    row.appendChild(cell);
    var cell_text = document.createRange().createContextualFragment(j.type);
    var cell = document.createElement('td');
    cell.appendChild(cell_text);
    row.appendChild(cell);
    var cell_text = document.createRange().createContextualFragment(bearing_ascii(j.bearing));
    var cell = document.createElement('td');
    cell.appendChild(cell_text);
    row.appendChild(cell);
    var cell_text = document.createRange().createContextualFragment(euroscope_ascii(j.bearing));
    var cell = document.createElement('td');
    cell.appendChild(cell_text);
    row.appendChild(cell);

    almanac.appendChild(row);
}
