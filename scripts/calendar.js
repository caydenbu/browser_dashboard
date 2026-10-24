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

// Each class has a: name, start-time, end-time, size (1-3), color, days
// days uses R for Thursday, ex: "TR" is Tuesday and Thursday
// Sunday and Saturday show Monday's classes
const DAY_LETTERS = ["M", "M", "T", "W", "R", "F", "M"];

// times are 12 hour without AM/PM, so anything before 8 is treated as PM
function TimeToMinutes(time) {
    let [h, m] = time.split(":").map(Number);
    if (h < 8) h += 12;
    return h * 60 + m;
}

// Display Classes

const CONTAINER = document.getElementById("schedule-container");
const TEMP_CARD = document.getElementById("temp-card");
TEMP_CARD.remove();

let DAY_OF_WEEK = Day.getDay();

// class color = child(0)
// class name = child(1,0)
// class time = child(1,1)

fetch("data/schedule.json", { cache: "no-cache" })
    .then((res) => res.json())
    .then((schedule) => {
        const todaysClasses = schedule.classes
            .filter((c) => c.days.includes(DAY_LETTERS[DAY_OF_WEEK]))
            .sort((a, b) => TimeToMinutes(a["start-time"]) - TimeToMinutes(b["start-time"]));

        for (const c of todaysClasses) {
            const CLONE = TEMP_CARD.cloneNode(true);
            // Card Size
            const DEFAULT = 18;
            CLONE.style.height = DEFAULT * c.size + "%";

            // Class Color
            CLONE.children[0].style.backgroundColor = c.color;

            // Class Name and Time
            CLONE.children[1].children[0].innerHTML = c.name;
            CLONE.children[1].children[1].innerHTML =
                c["start-time"] + "-" + c["end-time"];

            CONTAINER.appendChild(CLONE);
        }
    });
