// All time and date functions
const Day = new Date();

const MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const DAY_NAMES = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

document.getElementById("search-date").innerHTML =
    "Today is, " + MONTH_NAMES[Day.getMonth()] + " " + Day.getDate();

// Time
let hour = Day.getHours();

// converts 24 hour to 12 and adds a 0 at the start
if (hour > 12) {
    hour -= 12;
    if (hour < 10) hour = "0" + hour;
}
// if time is less than ten its adds a 0 at the start, Ex: (06)
let minute = Day.getMinutes();
if (minute < 10) {
    minute = "0" + minute;
}

document.getElementById("hour").innerHTML = hour;
document.getElementById("minute").innerHTML = minute;

// Day and meridiem
document.getElementById("day").innerHTML = DAY_NAMES[Day.getDay()];
if (Day.getHours() < 12) {
    document.getElementById("meridiem").innerHTML = "AM";
}

// Classes List

// Each class has a: name, start, end, length (1,2), color

const LIGHTBLUE = "#89B4FA"
const GREEN = "#A6E3A1"
const ORANGE = "#E07055"
const PURPLE = "#cf4aed"

const CS162 = ["CS 162", "11:00", "11:50", 1, LIGHTBLUE];
const CS162_LAB = ["CS 162 Lab", "4:00", "5:50", 2, LIGHTBLUE];
const WRITING = ["Writing in Business", "10:00", "11:20", 2, PURPLE];
const VECTOR_CALC = ["Vector Calc", "2:00", "2:50", 1, ORANGE];
const VECTOR_CALC_REC = ["Vector Calc Rec", "2:00", "3:50", 2, ORANGE];
const WORLD_GEO = ["World Geo", "3:00", "3:50", 1, GREEN];
const WORLD_GEO_REC = ["World Geo Rec", "12:00", "1:50", 2, GREEN];

const Classes = [
    [CS162, VECTOR_CALC, WORLD_GEO, CS162_LAB], // Shows Saturday as Monday

    [CS162, VECTOR_CALC, WORLD_GEO, CS162_LAB], // Monday
    [WRITING], // Tuesday
    [CS162, VECTOR_CALC, WORLD_GEO], // Wednesday
    [WRITING, VECTOR_CALC_REC], // Thursday
    [CS162, WORLD_GEO_REC, VECTOR_CALC], // Friday
    [CS162, VECTOR_CALC, WORLD_GEO, CS162_LAB], // Show Saturday as Monday
];

// Display Classes

const CONTAINER = document.getElementById("schedule-container");
const TEMP_CARD = document.getElementById("temp-card");
TEMP_CARD.remove();

let DAY_OF_WEEK = Day.getDay();

// class color = child(0)
// class name = child(1,0)
// class time = child(1,1)

for (let i = 0; i < Classes[DAY_OF_WEEK].length; i++) {
    const CLONE = TEMP_CARD.cloneNode(true);
    // Card Size
    const DEFAULT = 18;
    CLONE.style.height = DEFAULT * Classes[DAY_OF_WEEK][i][3] + "%";

    // Class Color
    CLONE.children[0].style.backgroundColor = Classes[DAY_OF_WEEK][i][4];

    // Class Name and Time
    CLONE.children[1].children[0].innerHTML = Classes[DAY_OF_WEEK][i][0];
    CLONE.children[1].children[1].innerHTML =
        Classes[DAY_OF_WEEK][i][1] + "-" + Classes[DAY_OF_WEEK][i][2];

    CONTAINER.appendChild(CLONE);
}
