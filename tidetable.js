var SunCalc = require('suncalc');
var lowestoft_gps = [52.4811, 1.7534]

/* Get list of astronomical events */
var eventsList = []

function moon_illumination_ascii(a) {
    return [
        "\u{1F311} New moon",
        "\u{1F312} Waxing Crescent",
        "\u{1F313} First Quarter",
        "\u{1F314} Waxing Gibbous",
        "\u{1F315} Full moon",
        "\u{1F316} Waning Gibbous",
        "\u{1F317} Last Quarter",
        "\u{1F318} Waning Crescent"
    ][Math.floor(a.phase * 8)];
}

function bearing_ascii(n) {
    n = n * 180 / Math.PI;
    n = (n + 180) % 360
    bearing_string = ("000"+Math.round(n).toString()).slice(-3)+"°";
    return bearing_string;
}

function euroscope_ascii(n) {
    n = n * 180 / Math.PI;
    n = (n + 180) % 360
    euroscope_string = [
        "NORTH", "N½E",  "NʙʏE",  "NʙʏE½E",  "NNE", "NNE½E", "NEʙʏN", "NEʙʏN½E",
        "NE",    "NE½E", "NEʙʏE", "NEʙʏE½E", "ENE", "ENE½E", "EʙʏN",  "EʙʏN½E",
        "EAST",  "E½S",  "EʙʏS",  "EʙʏS½S",  "ESE", "ESE½S", "SEʙʏE", "SEʙʏE½S",
        "SE",    "SE½S", "SEʙʏS", "SEʙʏS½S", "SSE", "SSE½S", "SʙʏE",  "SʙʏE½S",
        "SOUTH", "S½W",  "SʙʏW",  "SʙʏW½W",  "SSW", "SSW½W", "SWʙʏS", "SWʙʏS½W",
        "SW",    "SW½W", "SWʙʏW", "SWʙʏW½W", "WSW", "WSW½W", "WʙʏS",  "WʙʏS½W",
        "WEST",  "W½N",  "WʙʏN",  "WʙʏN½N",  "WNW", "WNW½N", "NWʙʏW", "NWʙʏW½N",
        "NW",    "NW½N", "NWʙʏN", "NWʙʏN½N", "NNW", "NNW½N", "NʙʏW",  "NʙʏW½N"
    ][
        Math.round((n/5.625) % 64)
    ];
    return euroscope_string;
}

var startDate = new Date();
for (var day = 0; day < 14; day++) {
    startDate.setDate(startDate.getDate() + 1);
    var sunTimes = SunCalc.getTimes(startDate, lowestoft_gps[0], lowestoft_gps[1]);
    eventsList.push({
        date: sunTimes.dawn,
        start: sunTimes.dawn,
        end: sunTimes.dawn,
        type: "Dawn",
        bearing: SunCalc.getPosition(sunTimes.dawn, lowestoft_gps[0], lowestoft_gps[1]).azimuth
    });
    eventsList.push({
        date: sunTimes.sunrise,
        start: sunTimes.sunrise,
        end: sunTimes.sunriseEnd,
        type: "Sunrise",
        bearing: SunCalc.getPosition(sunTimes.sunrise, lowestoft_gps[0], lowestoft_gps[1]).azimuth
    });
    eventsList.push({
        date: sunTimes.goldenHour,
        start: sunTimes.goldenHour,
        end: sunTimes.goldenHourEnd,
        type: "Golden hour",
        bearing: SunCalc.getPosition(sunTimes.goldenHour, lowestoft_gps[0], lowestoft_gps[1]).azimuth
    });
    eventsList.push({
        date: sunTimes.sunsetStart,
        start: sunTimes.sunsetStart,
        end: sunTimes.sunset,
        type: "Sunset",
        bearing: SunCalc.getPosition(sunTimes.sunsetStart, lowestoft_gps[0], lowestoft_gps[1]).azimuth
    });
    var moonTimes = SunCalc.getMoonTimes(startDate, lowestoft_gps[0], lowestoft_gps[1]);
    if (moonTimes.rise) {
        moonPosition = SunCalc.getMoonPosition(moonTimes.rise, lowestoft_gps[0], lowestoft_gps[1]);
        moonIllumination = SunCalc.getMoonIllumination(moonTimes.rise);
        eventsList.push({
            date: moonTimes.rise,
            start: moonTimes.rise,
            end: moonTimes.rise,
            type: "Moonrise "+moon_illumination_ascii(SunCalc.getMoonIllumination(moonTimes.rise)),
            bearing: SunCalc.getMoonPosition(moonTimes.rise, lowestoft_gps[0], lowestoft_gps[1]).azimuth
        })
    }
    if (moonTimes.set) {
        moonPosition = SunCalc.getMoonPosition(moonTimes.set, lowestoft_gps[0], lowestoft_gps[1]);
        moonIllumination = SunCalc.getMoonIllumination(moonTimes.set);
        eventsList.push({
            date: moonTimes.set,
            start: moonTimes.set,
            end: moonTimes.set,
            type: "Moonset "+moon_illumination_ascii(SunCalc.getMoonIllumination(moonTimes.set)),
            bearing: SunCalc.getMoonPosition(moonTimes.set, lowestoft_gps[0], lowestoft_gps[1]).azimuth
        })
    }
}

/* Sort list of events */
eventsList.sort(function (a, b){ return a.date > b.date; });

/* Inject table into page */
var almanac = document.getElementById('almanac');
for (var i = 0; i < eventsList.length; i++) {
    var j = eventsList[i];
    var row = document.createElement('tr');
    var cell_text = document.createTextNode(j.date.toLocaleDateString());
    var cell = document.createElement('td');
    cell.appendChild(cell_text);
    row.appendChild(cell);
    var cell_text = document.createTextNode(j.start.toLocaleTimeString({hour: '2-digit', minute:'2-digit'}));
    var cell = document.createElement('td');
    cell.appendChild(cell_text);
    row.appendChild(cell);
    var cell_text = document.createTextNode(j.end.toLocaleTimeString({hour: '2-digit', minute:'2-digit'}));
    var cell = document.createElement('td');
    cell.appendChild(cell_text);
    row.appendChild(cell);
    var cell_text = document.createTextNode(j.type);
    var cell = document.createElement('td');
    cell.appendChild(cell_text);
    row.appendChild(cell);
    var cell_text = document.createTextNode(bearing_ascii(j.bearing));
    var cell = document.createElement('td');
    cell.appendChild(cell_text);
    row.appendChild(cell);
    var cell_text = document.createTextNode(euroscope_ascii(j.bearing));
    var cell = document.createElement('td');
    cell.appendChild(cell_text);
    row.appendChild(cell);

    almanac.appendChild(row);
}
