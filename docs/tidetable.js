(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var SunCalc = require('suncalc');
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

var startDate = new Date();
for (var day = 0; day < 28; day++) {
    var sunTimes = SunCalc.getTimes(startDate, lowestoft_gps[0], lowestoft_gps[1]);
    eventsList.push({
        date: sunTimes.sunrise,
        start: sunTimes.sunrise.toLocaleTimeString({hour: '2-digit', minute:'2-digit'}),
        type: "<i class='wi wi-sunrise'></i>",
        bearing: SunCalc.getPosition(sunTimes.sunrise, lowestoft_gps[0], lowestoft_gps[1]).azimuth
    });
    eventsList.push({
        date: sunTimes.sunsetStart,
        start: sunTimes.sunsetStart.toLocaleTimeString({hour: '2-digit', minute:'2-digit'}),
        type: "<i class='wi wi-sunset'></i>",
        bearing: SunCalc.getPosition(sunTimes.sunsetStart, lowestoft_gps[0], lowestoft_gps[1]).azimuth
    });
    var moonTimes = SunCalc.getMoonTimes(startDate, lowestoft_gps[0], lowestoft_gps[1]);
    if (moonTimes.rise) {
        moonPosition = SunCalc.getMoonPosition(moonTimes.rise, lowestoft_gps[0], lowestoft_gps[1]);
        moonIllumination = SunCalc.getMoonIllumination(moonTimes.rise);
        eventsList.push({
            date: moonTimes.rise,
            start: moonTimes.rise.toLocaleTimeString({hour: '2-digit', minute:'2-digit'}),
            type: "<i class='wi wi-moonrise'></i>"+moon_phase_ascii(SunCalc.getMoonIllumination(moonTimes.rise)),
            bearing: SunCalc.getMoonPosition(moonTimes.rise, lowestoft_gps[0], lowestoft_gps[1]).azimuth
        })
    }
    if (moonTimes.set) {
        moonPosition = SunCalc.getMoonPosition(moonTimes.set, lowestoft_gps[0], lowestoft_gps[1]);
        moonIllumination = SunCalc.getMoonIllumination(moonTimes.set);
        eventsList.push({
            date: moonTimes.set,
            start: moonTimes.set.toLocaleTimeString({hour: '2-digit', minute:'2-digit'}),
            type: "<i class='wi wi-moonset'></i>"+moon_phase_ascii(SunCalc.getMoonIllumination(moonTimes.set)),
            bearing: SunCalc.getMoonPosition(moonTimes.set, lowestoft_gps[0], lowestoft_gps[1]).azimuth
        })
    }
    startDate.setDate(startDate.getDate() + 1);
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
    var cell_text = document.createTextNode(j.date.toLocaleDateString());
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

},{"suncalc":2}],2:[function(require,module,exports){
/*
 (c) 2011-2015, Vladimir Agafonkin
 SunCalc is a JavaScript library for calculating sun/moon position and light phases.
 https://github.com/mourner/suncalc
*/

(function () { 'use strict';

// shortcuts for easier to read formulas

var PI   = Math.PI,
    sin  = Math.sin,
    cos  = Math.cos,
    tan  = Math.tan,
    asin = Math.asin,
    atan = Math.atan2,
    acos = Math.acos,
    rad  = PI / 180;

// sun calculations are based on http://aa.quae.nl/en/reken/zonpositie.html formulas


// date/time constants and conversions

var dayMs = 1000 * 60 * 60 * 24,
    J1970 = 2440588,
    J2000 = 2451545;

function toJulian(date) { return date.valueOf() / dayMs - 0.5 + J1970; }
function fromJulian(j)  { return new Date((j + 0.5 - J1970) * dayMs); }
function toDays(date)   { return toJulian(date) - J2000; }


// general calculations for position

var e = rad * 23.4397; // obliquity of the Earth

function rightAscension(l, b) { return atan(sin(l) * cos(e) - tan(b) * sin(e), cos(l)); }
function declination(l, b)    { return asin(sin(b) * cos(e) + cos(b) * sin(e) * sin(l)); }

function azimuth(H, phi, dec)  { return atan(sin(H), cos(H) * sin(phi) - tan(dec) * cos(phi)); }
function altitude(H, phi, dec) { return asin(sin(phi) * sin(dec) + cos(phi) * cos(dec) * cos(H)); }

function siderealTime(d, lw) { return rad * (280.16 + 360.9856235 * d) - lw; }

function astroRefraction(h) {
    if (h < 0) // the following formula works for positive altitudes only.
        h = 0; // if h = -0.08901179 a div/0 would occur.

    // formula 16.4 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.
    // 1.02 / tan(h + 10.26 / (h + 5.10)) h in degrees, result in arc minutes -> converted to rad:
    return 0.0002967 / Math.tan(h + 0.00312536 / (h + 0.08901179));
}

// general sun calculations

function solarMeanAnomaly(d) { return rad * (357.5291 + 0.98560028 * d); }

function eclipticLongitude(M) {

    var C = rad * (1.9148 * sin(M) + 0.02 * sin(2 * M) + 0.0003 * sin(3 * M)), // equation of center
        P = rad * 102.9372; // perihelion of the Earth

    return M + C + P + PI;
}

function sunCoords(d) {

    var M = solarMeanAnomaly(d),
        L = eclipticLongitude(M);

    return {
        dec: declination(L, 0),
        ra: rightAscension(L, 0)
    };
}


var SunCalc = {};


// calculates sun position for a given date and latitude/longitude

SunCalc.getPosition = function (date, lat, lng) {

    var lw  = rad * -lng,
        phi = rad * lat,
        d   = toDays(date),

        c  = sunCoords(d),
        H  = siderealTime(d, lw) - c.ra;

    return {
        azimuth: azimuth(H, phi, c.dec),
        altitude: altitude(H, phi, c.dec)
    };
};


// sun times configuration (angle, morning name, evening name)

var times = SunCalc.times = [
    [-0.833, 'sunrise',       'sunset'      ],
    [  -0.3, 'sunriseEnd',    'sunsetStart' ],
    [    -6, 'dawn',          'dusk'        ],
    [   -12, 'nauticalDawn',  'nauticalDusk'],
    [   -18, 'nightEnd',      'night'       ],
    [     6, 'goldenHourEnd', 'goldenHour'  ]
];

// adds a custom time to the times config

SunCalc.addTime = function (angle, riseName, setName) {
    times.push([angle, riseName, setName]);
};


// calculations for sun times

var J0 = 0.0009;

function julianCycle(d, lw) { return Math.round(d - J0 - lw / (2 * PI)); }

function approxTransit(Ht, lw, n) { return J0 + (Ht + lw) / (2 * PI) + n; }
function solarTransitJ(ds, M, L)  { return J2000 + ds + 0.0053 * sin(M) - 0.0069 * sin(2 * L); }

function hourAngle(h, phi, d) { return acos((sin(h) - sin(phi) * sin(d)) / (cos(phi) * cos(d))); }

// returns set time for the given sun altitude
function getSetJ(h, lw, phi, dec, n, M, L) {

    var w = hourAngle(h, phi, dec),
        a = approxTransit(w, lw, n);
    return solarTransitJ(a, M, L);
}


// calculates sun times for a given date and latitude/longitude

SunCalc.getTimes = function (date, lat, lng) {

    var lw = rad * -lng,
        phi = rad * lat,

        d = toDays(date),
        n = julianCycle(d, lw),
        ds = approxTransit(0, lw, n),

        M = solarMeanAnomaly(ds),
        L = eclipticLongitude(M),
        dec = declination(L, 0),

        Jnoon = solarTransitJ(ds, M, L),

        i, len, time, Jset, Jrise;


    var result = {
        solarNoon: fromJulian(Jnoon),
        nadir: fromJulian(Jnoon - 0.5)
    };

    for (i = 0, len = times.length; i < len; i += 1) {
        time = times[i];

        Jset = getSetJ(time[0] * rad, lw, phi, dec, n, M, L);
        Jrise = Jnoon - (Jset - Jnoon);

        result[time[1]] = fromJulian(Jrise);
        result[time[2]] = fromJulian(Jset);
    }

    return result;
};


// moon calculations, based on http://aa.quae.nl/en/reken/hemelpositie.html formulas

function moonCoords(d) { // geocentric ecliptic coordinates of the moon

    var L = rad * (218.316 + 13.176396 * d), // ecliptic longitude
        M = rad * (134.963 + 13.064993 * d), // mean anomaly
        F = rad * (93.272 + 13.229350 * d),  // mean distance

        l  = L + rad * 6.289 * sin(M), // longitude
        b  = rad * 5.128 * sin(F),     // latitude
        dt = 385001 - 20905 * cos(M);  // distance to the moon in km

    return {
        ra: rightAscension(l, b),
        dec: declination(l, b),
        dist: dt
    };
}

SunCalc.getMoonPosition = function (date, lat, lng) {

    var lw  = rad * -lng,
        phi = rad * lat,
        d   = toDays(date),

        c = moonCoords(d),
        H = siderealTime(d, lw) - c.ra,
        h = altitude(H, phi, c.dec),
        // formula 14.1 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.
        pa = atan(sin(H), tan(phi) * cos(c.dec) - sin(c.dec) * cos(H));

    h = h + astroRefraction(h); // altitude correction for refraction

    return {
        azimuth: azimuth(H, phi, c.dec),
        altitude: h,
        distance: c.dist,
        parallacticAngle: pa
    };
};


// calculations for illumination parameters of the moon,
// based on http://idlastro.gsfc.nasa.gov/ftp/pro/astro/mphase.pro formulas and
// Chapter 48 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.

SunCalc.getMoonIllumination = function (date) {

    var d = toDays(date || new Date()),
        s = sunCoords(d),
        m = moonCoords(d),

        sdist = 149598000, // distance from Earth to Sun in km

        phi = acos(sin(s.dec) * sin(m.dec) + cos(s.dec) * cos(m.dec) * cos(s.ra - m.ra)),
        inc = atan(sdist * sin(phi), m.dist - sdist * cos(phi)),
        angle = atan(cos(s.dec) * sin(s.ra - m.ra), sin(s.dec) * cos(m.dec) -
                cos(s.dec) * sin(m.dec) * cos(s.ra - m.ra));

    return {
        fraction: (1 + cos(inc)) / 2,
        phase: 0.5 + 0.5 * inc * (angle < 0 ? -1 : 1) / Math.PI,
        angle: angle
    };
};


function hoursLater(date, h) {
    return new Date(date.valueOf() + h * dayMs / 24);
}

// calculations for moon rise/set times are based on http://www.stargazing.net/kepler/moonrise.html article

SunCalc.getMoonTimes = function (date, lat, lng, inUTC) {
    var t = new Date(date);
    if (inUTC) t.setUTCHours(0, 0, 0, 0);
    else t.setHours(0, 0, 0, 0);

    var hc = 0.133 * rad,
        h0 = SunCalc.getMoonPosition(t, lat, lng).altitude - hc,
        h1, h2, rise, set, a, b, xe, ye, d, roots, x1, x2, dx;

    // go in 2-hour chunks, each time seeing if a 3-point quadratic curve crosses zero (which means rise or set)
    for (var i = 1; i <= 24; i += 2) {
        h1 = SunCalc.getMoonPosition(hoursLater(t, i), lat, lng).altitude - hc;
        h2 = SunCalc.getMoonPosition(hoursLater(t, i + 1), lat, lng).altitude - hc;

        a = (h0 + h2) / 2 - h1;
        b = (h2 - h0) / 2;
        xe = -b / (2 * a);
        ye = (a * xe + b) * xe + h1;
        d = b * b - 4 * a * h1;
        roots = 0;

        if (d >= 0) {
            dx = Math.sqrt(d) / (Math.abs(a) * 2);
            x1 = xe - dx;
            x2 = xe + dx;
            if (Math.abs(x1) <= 1) roots++;
            if (Math.abs(x2) <= 1) roots++;
            if (x1 < -1) x1 = x2;
        }

        if (roots === 1) {
            if (h0 < 0) rise = i + x1;
            else set = i + x1;

        } else if (roots === 2) {
            rise = i + (ye < 0 ? x2 : x1);
            set = i + (ye < 0 ? x1 : x2);
        }

        if (rise && set) break;

        h0 = h2;
    }

    var result = {};

    if (rise) result.rise = hoursLater(t, rise);
    if (set) result.set = hoursLater(t, set);

    if (!rise && !set) result[ye > 0 ? 'alwaysUp' : 'alwaysDown'] = true;

    return result;
};


// export as Node module / AMD module / browser variable
if (typeof exports === 'object' && typeof module !== 'undefined') module.exports = SunCalc;
else if (typeof define === 'function' && define.amd) define(SunCalc);
else window.SunCalc = SunCalc;

}());

},{}]},{},[1]);
