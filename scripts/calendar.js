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
const CALCULUS = ["Calculus II", "9:00", "9:50", 1, "#f7a7a7"];
const CALCULUS_REC = ["Calculus II", "4:00", "5:20", 2, "#f7a7a7"];
const BOTANY = ["Botany", "2:00", "2:50", 1, "#D4FBCA"];
const BOTANY_LAB = ["Botany", "9:00", "12:00", 3, "#D4FBCA"];
const ENGINEERING = ["Engineering", "4:00", "4:50", 1, "#CAF0FB"];
const ENGINEERING_STUDIO = ["Engineering", "2:00", "3:50", 2, "#CAF0FB"];
const INDEGINOUS_HISTORY = ["History", "12:00", "1:50", 2, "#F2EAB9"];

const Classes = [
    [CALCULUS, INDEGINOUS_HISTORY, BOTANY, ENGINEERING], // Shows Saturday as Monday

    [CALCULUS, INDEGINOUS_HISTORY, BOTANY, ENGINEERING], // Monday
    [BOTANY_LAB], // Tuesday
    [CALCULUS, INDEGINOUS_HISTORY, BOTANY], // Wednesday
    [ENGINEERING_STUDIO, CALCULUS_REC], // Thursday
    [CALCULUS, BOTANY, ENGINEERING], // Friday
    [CALCULUS, INDEGINOUS_HISTORY, BOTANY, ENGINEERING], // Show Saturday is Monday
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
