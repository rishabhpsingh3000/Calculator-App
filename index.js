const btns = document.querySelectorAll("button");
const display = document.querySelector("input");

let initialVal = "";
let currentVal = "";
let operator = null;

const operation = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
};

const updateDisplay = () => {
  display.value = `${initialVal} ${operator ? operator : ""} ${currentVal}`.trim();
};

btns.forEach(function (btn) {
  btn.addEventListener("click", function (event) {
    const { className, textContent } = event.target;

    if (className === "numerical-btn") {
      if (!operator) {
        initialVal += textContent;
      } else {
        currentVal += textContent; // "4000"
      }
    }

    if (["plus-btn", "minus-btn", "divide-btn", "multiply-btn"].includes(className)) {
      if (operator && currentVal) {
        initialVal = String(operation[operator](parseFloat(initialVal), parseFloat(currentVal)));
        currentVal = "";
      }

      operator = textContent;
    }

    if (className === "eq-btn") {
      if (initialVal && currentVal && operator) {
        const result = operation[operator](parseFloat(initialVal), parseFloat(currentVal));

        initialVal = String(result);
        currentVal = "";
        operator = null;
      }
    }

    if (className === "reset-btn") {
      initialVal = "";
      currentVal = "";
      operator = null;
      display.value = "";
    }

    if (className === "del-btn") {
      if (operator) {
        currentVal = currentVal.slice(0, -1);
      } else {
        initialVal = initialVal.slice(0, -1);
      }

      updateDisplay();
    }

    updateDisplay();
  });
});
