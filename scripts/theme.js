let leader = false;

// INPUT LISTENER
document.body.addEventListener("keydown", (e) => {
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
  if (e.key === "Enter" || (e.code === "Enter" && themeToggled)) {
    toggle_theme_switcher();
  }

  leader = false;
});

let themeToggled = true;

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

function ChangeTheme(Theme) {
  // change the theme
}
