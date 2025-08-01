const display = document.getElementById("display");
let isCaps = false;
let isShift = false;

function insertAtCursor(char) {
  const start = display.selectionStart;
  const end = display.selectionEnd;
  const text = display.value;
  const before = text.substring(0, start);
  const after = text.substring(end);
  display.value = before + char + after;
  display.selectionStart = display.selectionEnd = start + char.length;
  display.focus();
}

document.querySelectorAll("#container > div").forEach(key => {
  key.addEventListener("click", () => {
    const keyText = key.textContent.trim();

    switch (keyText) {
      case "Space":
        insertAtCursor(" ");
        break;
    case "Tab":
        insertAtCursor("   ");
        break;

      case "Back":
        const start = display.selectionStart;
        const end = display.selectionEnd;
        if (start === end && start > 0) {
          display.value =
            display.value.substring(0, start - 1) +
            display.value.substring(end);
          display.selectionStart = display.selectionEnd = start - 1;
        } else {
          display.value =
            display.value.substring(0, start) + display.value.substring(end);
          display.selectionStart = display.selectionEnd = start;
        }
        display.focus();
        break;

      case "Enter":
        insertAtCursor("\n");
        break;

      case "Caps":
        isCaps = !isCaps;
        key.style.backgroundColor = isCaps ? "darkgreen" : "black";
        break;

      case "Shift":
        isShift = true;
        key.style.backgroundColor = "darkblue";
        break;

      case "←":
        if (display.selectionStart > 0) {
          display.selectionStart--;
          display.selectionEnd = display.selectionStart;
        }
        display.focus();
        break;

      case "→":
        if (display.selectionStart < display.value.length) {
          display.selectionStart++;
          display.selectionEnd = display.selectionStart;
        }
        display.focus();
        break;

      case "↑":
        // Optional: implement based on line position
        break;

      case "↓":
        // Optional: implement based on line position
        break;

      default:
        let charToInsert = keyText;

        if (isShift) {
          charToInsert = shiftChar(keyText);
          isShift = false;
          document.querySelectorAll("#container > div").forEach(k => {
            if (k.textContent.trim() === "Shift") {
              k.style.backgroundColor = "black";
            }
          });
        } else if (isCaps && /^[a-z]$/i.test(keyText)) {
          charToInsert = keyText.toUpperCase();
        }

        insertAtCursor(charToInsert);
        break;
    }
  });
});

function shiftChar(char) {
  const shiftMap = {
    "1": "!",
    "2": "@",
    "3": "#",
    "4": "$",
    "5": "%",
    "6": "^",
    "7": "&",
    "8": "*",
    "9": "(",
    "0": ")",
    "`": "~",
    "-": "_",
    "=": "+",
    "[": "{",
    "]": "}",
    "\\": "|",
    ";": ":",
    "'": "\"",
    ",": "<",
    ".": ">",
    "/": "?"
  };
  if (shiftMap[char]) return shiftMap[char];
  return char.toUpperCase();
}
