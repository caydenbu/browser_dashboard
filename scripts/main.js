// Input Logic
const input = document.getElementById("search-input");

const shortcutLinks = [
  "https://canvas.oregonstate.edu/",
  "https://outlook.office.com/mail/",
  "https://mail.google.com/mail/u/0/",
  "https://calendar.google.com/calendar/u/0/r/week",
  "https://github.com/caydenbu",
];

document.addEventListener("keydown", (e) => {
  if (document.activeElement.tagName === "INPUT") return;

  if (e.key === "/") {
    e.preventDefault();
    document.getElementById("search-input").focus();
    return;
  }

  const num = parseInt(e.key);
  if (num >= 1 && num <= 5) {
    window.location.href = shortcutLinks[num - 1];
  }
});

input.addEventListener("focus", () => {
  input.select();
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const query = input.value.trim();
    if (query) {
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }
  }
});

// Tasks Logic
const options = { timeZone: "America/Los_Angeles" };
const today = new Date().toLocaleDateString("en-US", options);

let data = JSON.parse(localStorage.getItem("dailyTasks")) || {
  lastReset: today,
  tasks: [
    { text: "Drink Water", done: false },
    { text: "Climb or Run", done: false },
    { text: "Do School Work", done: false },
    { text: "Comp sci Work", done: false },
    { text: "Read/Audiobook", done: false },
  ],
};

function ResetData() {
  data.tasks.forEach((task) => (task.done = false));
  data.lastReset = today;
  localStorage.setItem("dailyTasks", JSON.stringify(data));
}

// check if new day
if (data.lastReset !== today) {
  ResetData();
}

// save updated version
localStorage.setItem("dailyTasks", JSON.stringify(data));

// Task Checkoff
function CheckOffTask(index) {
  data.tasks[index - 1].done = true;
  localStorage.setItem("dailyTasks", JSON.stringify(data));

  // Changes element status
  const HABIT_CARD = document.getElementById("habits").children[index];
  HABIT_CARD.classList.add("habit-finished");
}

// Update completed tasks elemenets on update
function UpdateCompletedTasks(tasks) {
  tasks.forEach((task, index) => {
    if (task.done) {
      const HABIT_CARD = document.getElementById("habits").children[index + 1];
      HABIT_CARD.classList.add("habit-finished");
    }
  });
}

UpdateCompletedTasks(data.tasks);
