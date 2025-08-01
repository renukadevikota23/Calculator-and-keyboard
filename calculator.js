const display = document.getElementById("display");
const buttons = document.querySelectorAll("#container > div");

let expression = "";

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "AC") {
      expression = "";
      display.value = "";
    } else if (value === "+/-") {
      if (expression) {
        if (expression.startsWith("-")) {
          expression = expression.slice(1);
        } else {
          expression = "-" + expression;
        }
        display.value = expression;
      }
    } else if (value === "%") {
      if (expression) {
        expression = (parseFloat(expression) / 100).toString();
        display.value = expression;
      }
    } else if (value === "=" || value === "cal") {
      try {
        expression = eval(expression).toString();
        display.value = expression;
      } catch {
        display.value = "Error";
        expression = "";
      }
    } else {
      expression += value;
      display.value = expression;
    }
  });
});
