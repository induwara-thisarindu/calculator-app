const buttons = document.querySelectorAll("button");
const calText = document.getElementById("cal-text");
let currentInput = "";
let previousInput = "";
let operator = null;
let isResultDisplayed = false;

buttons.forEach(button => button.addEventListener("click", (e) => {
    const buttonText = e.target.id;

    if (buttonText >= "0" && buttonText <= "9" || buttonText === ".") {
        handleNumber(buttonText);
    } else if (buttonText === "+" || buttonText === "-" || buttonText === "/" || buttonText === "x") {
        handleOperator(buttonText);
    } else if (buttonText === "result-btn" || buttonText === "result") {
        handleResult();
    } else if (buttonText === "DEL" || buttonText === "del-btn") {
        handleDelete();
    } else if (buttonText === "reset-btn" || buttonText === "reset") {
        handleReset();
    }

    updateDisplay();
}));

function handleNumber(number) {
    if (isResultDisplayed) {
        currentInput = number;
        isResultDisplayed = false;
    } else if (operator && currentInput === "") {
        currentInput = number;
    } else {
        currentInput += number;
    }
}

function handleOperator(op) {
    if (currentInput === "" && previousInput === "") return;

    if (currentInput !== "" && previousInput !== "" && operator) {
        handleResult();
        previousInput = currentInput;
        currentInput = "";
    } else if (previousInput === "") {
        previousInput = currentInput;   
        currentInput = "";
    }

    operator = op;
    isResultDisplayed = false;
}

function handleResult() {
    if (currentInput === "" || previousInput === "" || operator === null) return;

    const curr = parseFloat(currentInput);
    const prev = parseFloat(previousInput);

    let result;
    switch (operator) {
        case "+":
            result = prev + curr;
            break;
        case "-":
            result = prev - curr;
            break;
        case "/":
            result = prev / curr;
            break;
        case "x":
            result = prev * curr;
            break;
    }

    currentInput = result.toString();
    previousInput = "";
    operator = null;
    isResultDisplayed = true;
}

function handleDelete() {
    if (isResultDisplayed) {
        currentInput = "";
        isResultDisplayed = false;
    } else {
        currentInput = currentInput.slice(0, -1); 
    }
}

function handleReset() {
    currentInput = "";
    previousInput = "";
    operator = null;
    isResultDisplayed = false;
}

function updateDisplay() {
    calText.innerText = currentInput || previousInput || "0";
}

const toggleButtons = document.getElementsByClassName("button-toggle");
let arr = [...toggleButtons];

arr.forEach((element, index) => {
  element.addEventListener("click", () => {
    switch(index) {
      case 0:
        document.body.classList.remove("theme2", "theme3");
        document.body.classList.add("theme1");
        break;
      case 1:
        document.body.classList.remove("theme1", "theme3");
        document.body.classList.add("theme2");
        break;
      case 2:
        document.body.classList.remove("theme1", "theme2");
        document.body.classList.add("theme3");
        break;
    }
  });
});

