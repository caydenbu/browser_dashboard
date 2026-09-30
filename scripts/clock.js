const clock = document.getElementById("clock");

function CreateLines(degrees, small){
  // the wrapper fills the clock and rotates around its center,
  // carrying the line sitting at its top edge with it
  const wrap = document.createElement("div");
  wrap.classList.add("line-wrap");
  wrap.style.rotate = degrees + "deg";

  const div = document.createElement("div");
  div.classList.add("straight-lines");
  if (small) div.classList.add("small");

  wrap.appendChild(div);
  clock.appendChild(wrap);
}

// 8 lines: top, right, bottom, left, with smaller diagonals in between
for (let i = 0; i < 8; i++) {
  CreateLines(i * 45, i % 2 == 1);
}

// Hands
const hourHand = document.getElementById("hour-hand");
const minuteHand = document.getElementById("minute-hand");
const hourLabel = document.getElementById("hour-label");
const minuteLabel = document.getElementById("minute-label");

// puts the label just outside the clock in the direction of degrees
function PlaceLabel(label, text, degrees){
  label.textContent = text;

  const rad = degrees * Math.PI / 180;
  const x = Math.sin(rad);
  const y = -Math.cos(rad);

  // distance from the label's center to the edge of its box in that direction,
  // so wide labels like "07" get pushed out further than "9"
  const edge = Math.min(
    label.offsetWidth / 2 / Math.abs(x),
    label.offsetHeight / 2 / Math.abs(y)
  );
  const gap = clock.offsetWidth * 0.04;
  const dist = clock.offsetWidth / 2 + gap + edge;

  label.style.transform =
    `translate(-50%, -50%) translate(${x * dist}px, ${y * dist}px)`;
}

function Overlapping(a, b){
  const r1 = a.getBoundingClientRect();
  const r2 = b.getBoundingClientRect();
  return r1.left < r2.right && r2.left < r1.right &&
         r1.top < r2.bottom && r2.top < r1.bottom;
}

function UpdateHands(){
  const Day = new Date();
  const minute = Day.getMinutes() + Day.getSeconds() / 60;
  const hour = (Day.getHours() % 12) + minute / 60;

  hourHand.style.transform = `translate(-50%, -100%) rotate(${hour * 30}deg)`;
  minuteHand.style.transform = `translate(-50%, -100%) rotate(${minute * 6}deg)`;

  // 12 hour time, minutes padded with a 0 like 07
  const hourText = Day.getHours() % 12 || 12;
  const minuteText = String(Day.getMinutes()).padStart(2, "0");
  minuteLabel.style.display = "";
  PlaceLabel(hourLabel, hourText, hour * 30);
  PlaceLabel(minuteLabel, minuteText, minute * 6);

  // if the numbers overlap, combine them into one like 3:15
  // placed halfway between the two hands
  if (Overlapping(hourLabel, minuteLabel)) {
    const diff = ((minute * 6 - hour * 30 + 540) % 360) - 180;
    minuteLabel.style.display = "none";
    PlaceLabel(hourLabel, hourText + ":" + minuteText, hour * 30 + diff / 2);
  }
}

UpdateHands();
setInterval(UpdateHands, 1000);
window.addEventListener("resize", UpdateHands);
