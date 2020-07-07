const numbers = Array.from(document.querySelectorAll('.number'));
const operators = Array.from(document.querySelectorAll('.operator'));
const screen = document.querySelector('.screen__value');
const totalHolder = document.querySelector('.value__holder');

let currentOperator;
const operatorsArr = ['+', '-', '*', '/'];
let arrayToJoin = [];
let stringToEvaluate;
let total;

/*****************************************************************************************************************************/
// NUMBERS
/*****************************************************************************************************************************/
numbers.forEach((number) => {
  number.addEventListener('click', (e) => {
    if (operatorsArr.includes(currentOperator)) {
      screen.value = 0;
      screen.value = number.value;
    } else {
      if (
        screen.value == '0' &&
        (Number(number.value) >= 0 || number.value === '.')
      ) {
        screen.value = number.value;
      } else if (number.value === '.' && screen.value.includes('.')) {
        console.log('Invalid number!');
      } else if (Number(number.value) >= 0 || number.value === '.') {
        screen.value += number.value;
      }
    }
    currentOperator = e.target.value;
  });
});

/*****************************************************************************************************************************/
// OPERATORS
/*****************************************************************************************************************************/
operators.forEach((operator) => {
  operator.addEventListener('click', (e) => {
    currentOperator = e.target.value;
    totalHolder.textContent = screen.value;

    if (arrayToJoin.length < 1) {
      arrayToJoin.push(screen.value);
      arrayToJoin.push(operator.value);
    } else if (arrayToJoin.length > 0) {
      arrayToJoin.push(screen.value);
      stringToEvaluate = arrayToJoin.join('');
      total = eval(stringToEvaluate);
      screen.value = total;
      totalHolder.textContent = total;
      arrayToJoin = [];
      arrayToJoin.push(total);
      arrayToJoin.push(currentOperator);
    }
  });
});

/*****************************************************************************************************************************/
// FUNCTIONS
/*****************************************************************************************************************************/
const clearScreen = () => {
  screen.value = '0';
  totalHolder.textContent = '0';
  total = 0;
  arrayToJoin = [];
  stringToEvaluate = '';
  currentOperator = null;
};

/*****************************************************************************************************************************/
// OTHER EVENT LISTENERS
/*****************************************************************************************************************************/
// Cancel button
document.querySelector('.erase').addEventListener('click', () => {
  clearScreen();
});

// Delete button
document.querySelector('.backspace').addEventListener('click', () => {
  let screenArr = [...screen.value.split('')];
  screenArr.pop();

  if (screenArr.join('').length >= 1) {
    screen.value = screenArr.join('');
  } else {
    screen.value = 0;
    totalHolder.textContent = 0;
  }
});

// Percentage button
document.querySelector('.percentage').addEventListener('click', () => {
  total = screen.value / 100;
  screen.value = total;
  totalHolder.textContent = total;
});

// Equals button
document.querySelector('.equals').addEventListener('click', () => {
  arrayToJoin.push(screen.value);
  stringToEvaluate = arrayToJoin.join('');
  total = eval(stringToEvaluate);
  screen.value = total;
  totalHolder.textContent = total;
  arrayToJoin = [];
  arrayToJoin.push(total);
});
