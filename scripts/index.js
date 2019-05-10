// Global Vars
const calcText = document.getElementById("calcText");
const operatorRegExp = /[+\-x\/]/gi;

let firstNumber = "";
let operator = "";
let secondNumber = "";


function interpretInput(e) {
  const term = convertToNumber(e.target.innerText);
  console.log(term);

  if (isANumber(term)) {
    if (isEmpty(operator)) {
      updateFirstNumber(term);
      updateDisplay(term);
    } else {
      updateSecondNumber(term);
      updateDisplay(term);
    }
  } else {
    switch(term) {
      case ".":
        addDecimal();
        break;
      case "DEL":
        delOneCharacter();
        break;
      case "CLR":
        clearDisplay();
        break;
      case "-":
      case "+":
      case "X":
      case "/":
        updateOperator(term);
        break;
      case "=":
        returnAnswer();
        break;
    }

  }

}

function isANumber(term) {
  return typeof(term) == "number";
}

function isEmpty(string) {
  return string.length == 0;
}

function convertToNumber(string) {
  const newTerm = Number(string);
  // if it is not a number, return original string
  if (Number.isNaN(newTerm)) {
    return string;
  } else {
    return newTerm;
  }
}

function updateFirstNumber(num) {
  const stringNum = num.toString();
  firstNumber += stringNum;
}

function updateSecondNumber(num) {
  const stringNum = num.toString();
  secondNumber += stringNum;
}

function updateDisplay(term) {
  calcText.innerText += term;
}

function addDecimal() {
  if (isEmpty(operator)) {
    // firstNumber
    if (firstNumber.includes(".") == false) {
      firstNumber += ".";
      updateDisplay(".");
    }
  } else {
    // secondNumber
    if (secondNumber.includes(".") == false) {
      secondNumber += ".";
      updateDisplay(".");
    }
  }
}

function delOneCharacter() {
  if (isEmpty(operator)) {
    // if first number exists
    if (isEmpty(firstNumber) == false) {
      firstNumber = firstNumber.slice(0, firstNumber.length - 1);
      calcText.innerText = calcText.innerText.slice(0, calcText.innerText.length - 1);
    }
  } else {
    // if secon number exists
    if (isEmpty(secondNumber) == false) {
      secondNumber = secondNumber.slice(0, secondNumber.length - 1);
      calcText.innerText = calcText.innerText.slice(0, calcText.innerText.length - 1);
    }
  }
}

function clearDisplay() {
  calcText.innerText = "";
  firstNumber = "";
  operator = "";
  secondNumber = "";
}

function updateOperator(term) {
  // check if secondNumber exists

  // if there is no second number
  if (isEmpty(secondNumber)) {
    // if is no operator yet
    if (isEmpty(operator)) {
      updateDisplay(term);
    } else {
      calcText.innerText = calcText.innerText.replace(operatorRegExp, term);
    }

    operator = term;
  }
}

function returnAnswer() {
  // only enter this block if all 3 components exist
  if (!isEmpty(firstNumber) && !isEmpty(operator) && !isEmpty(secondNumber)) {
    let answer;
    let firstNumberConverted = Number(firstNumber);
    let secondNumberConverted = Number(secondNumber);
    switch (operator){
      case "+":
        answer = firstNumberConverted + secondNumberConverted;
        break;
      case "-":
        answer = firstNumberConverted + secondNumberConverted;
        break;
      case "X":
        answer = firstNumberConverted * secondNumberConverted;
        break;
      case "/":
        answer = firstNumberConverted / secondNumberConverted;
        break;
    }

    answer = answer.toString();

    calcText.innerText = answer;
    firstNumber = answer;
    operator = "";
    secondNumber = "";
  }

}



const allButtons = [...document.querySelectorAll("button")];

allButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => interpretInput(e));
})
