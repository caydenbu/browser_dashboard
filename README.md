# Browser Dashboard

A little something I built as my homepage when I open up chrome so its not super boring. Put my classes on the left with date and time and filled in the extra space with a habit tracker that you can change to whatever. It being there everytime I open chrome really helped me.

## Features

- **Class schedule**: lists today's classes, loaded from `data/schedule.json`. (can be changed)
- **Search**: press `/` to focus the search bar, then `Enter` to search Google.
- **Bookmarks**: press `1`–`5` to open Canvas, Outlook, Gmail, Google Calendar or GitHub. (can be changed)
- **Daily habits**: click a habit to check it off. Progress is saved in `localStorage` and resets every day. (can be changed)

## Setup

1. Clone the repo with:

   ```sh
   git clone https://github.com/caydenbu/browser_dashboard.git
   cd browser_dashboard
   ```

2. Copy the example schedule and fill in your classes:

   ```sh
   cp data/schedule-example.json data/schedule.json
   ```

3. Host the folder over a server. The schedule is loaded with `fetch`, which doesn't work when you open `index.html` straight from disk

## Schedule format

Each class in `data/schedule.json` looks like this:

```json
{
  "name": "CS 261",
  "start-time": "10:00",
  "end-time": "11:20",
  "size": 2,
  "color": "#4a90e2",
  "days": "TR"
}
```

| Field                     | Description                                                   |
| ------------------------- | ------------------------------------------------------------- |
| `name`                    | Class name shown on the card                                  |
| `start-time` / `end-time` | 12-hour times without AM/PM. Hours before 8 are treated as PM |
| `size`                    | Card height, from 1 to 3                                      |
| `color`                   | Hex color for the card's accent                               |
| `days`                    | Day letters: `M T W R F` Weekends show Monday' classes        |

## Customizing

- **Bookmarks**: edit the links in `index.html` and the `shortcutLinks` list in `scripts/main.js`.
- **Habits**: edit the habit cards in `index.html` and the `tasks` list in `scripts/main.js`.
