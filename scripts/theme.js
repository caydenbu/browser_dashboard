let leader = false;

// INPUT LISTENER
document.body.addEventListener("keydown", (e) => {
  // Dont catch keys while typing in the search bar
  if (document.activeElement.tagName === "INPUT") return;

  // Toggle Display
  // if user presses space then t, it toggles the theme switcher
  if (e.key === " " || e.code === "Space") {
    leader = !leader;
    return;
  }
  if (e.key === "t" || e.code === "t") {
    if (leader) {
      toggle_theme_switcher();
    }
  }
  // Move up and down if display is open
  if (e.key === "j" && themeToggled) {
    MoveDown();
  }
  if (e.key === "k" && themeToggled) {
    MoveUp();
  }
  if ((e.key === "Enter" || e.code === "Enter") && themeToggled) {
    toggle_theme_switcher();
  }

  leader = false;
});

let themeToggled = false;

function toggle_theme_switcher() {
  HoverTheme();
  const THEMESWITCHER = document.getElementById("theme-switcher-container");
  if (themeToggled) {
    THEMESWITCHER.style.display = "none";
  } else {
    THEMESWITCHER.style.display = "flex";
  }
  themeToggled = !themeToggled;
}

const THEMES = document.getElementById("switcher").children;
const TOTALTHEMES = THEMES.length;

let hoveredIndex = 0;

function MoveUp() {
  hoveredIndex -= 1;
  if (hoveredIndex < 0) {
    hoveredIndex = TOTALTHEMES - 1;
  }
  HoverTheme();
}

function MoveDown() {
  hoveredIndex += 1;
  if (hoveredIndex > TOTALTHEMES - 1) {
    hoveredIndex = 0;
  }
  HoverTheme();
}

function HoverTheme() {
  for (let i = 0; i < TOTALTHEMES; i++) {
    // Remove Hover Selection
    THEMES[i].classList.remove("choice-hovered");
  }
  // Add Hover Selection
  THEMES[hoveredIndex].classList.add("choice-hovered");
  ChangeTheme(THEMES[hoveredIndex]);
}

// The name in the html is what the [data-theme] selectors in theme.css use
function GetThemeName(Theme) {
  return Theme.textContent.trim().toLowerCase();
}

function ChangeTheme(Theme) {
  const NAME = GetThemeName(Theme);
  document.documentElement.setAttribute("data-theme", NAME);
  localStorage.setItem("theme", NAME);
}

// Load the saved theme, stays on the first theme if nothing is saved
const SAVEDTHEME = localStorage.getItem("theme");
hoveredIndex = Math.max(
  Array.from(THEMES).findIndex((Theme) => GetThemeName(Theme) === SAVEDTHEME),
  0,
);
HoverTheme();
