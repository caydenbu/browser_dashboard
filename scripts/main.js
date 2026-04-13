const input = document.getElementById("search-input");

document.addEventListener("keydown", (e) => {
    if (e.key === "/") {
        e.preventDefault();
        document.getElementById("search-input").focus();
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
