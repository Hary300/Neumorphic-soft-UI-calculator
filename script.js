const screen = document.querySelector('.screen');
const btn = document.querySelectorAll('.btn');
let currentValue = '';
let prevValue;
let operator;
let isAfterEqual = false;

document.addEventListener('click', function (event) {
  const isNumber = event.target.closest('.num');
  if (isNumber) {
    const number = isNumber.dataset.number;
    if (isAfterEqual) {
      currentValue = '';
      isAfterEqual = false;
    }
    currentValue += number;
    screen.textContent = currentValue;
  }

  const isOperator = event.target.closest('.operator');
  if (isOperator) {
    console.log('currentValue =', currentValue);
    console.log('prevValue =', prevValue);
    console.log('operator =', operator);

    if (operator) return;
    if (currentValue === '') return;
    isAfterEqual = false;
    prevValue = Number(currentValue);
    operator = isOperator.dataset.op;
    currentValue = '';

    console.log('currentValue =', currentValue);
    console.log('prevValue =', prevValue);
    console.log('operator =', operator);
  }

  const isEqual = event.target.closest('.equal');
  if (isEqual) {
    console.log('currentValue =', currentValue);
    console.log('prevValue =', prevValue);
    console.log('operator =', operator);

    if (
      currentValue === '' ||
      prevValue === undefined ||
      operator === undefined
    )
      return;
    isAfterEqual = true;
    const currentValueNumber = Number(currentValue);
    const result = calculate(prevValue, operator, currentValueNumber);
    screen.textContent = result;

    if (result === Infinity) {
      disableBtn();
    } else {
      currentValue = String(result);
    }
    prevValue = undefined;
    operator = undefined;
  }

  const isClear = event.target.closest('.clear-btn');
  if (isClear) {
    clear();
    showBtn();
  }

  const isDecimal = event.target.closest('.decimal');
  if (isDecimal) {
    const point = isDecimal.dataset.point;
    if (isAfterEqual) {
      currentValue = '';
      isAfterEqual = false;
    }
    if (currentValue === '') {
      screen.textContent = '0.';
      currentValue = '0.';
      return;
    }
    if (currentValue.includes('.')) {
      return;
    }
    currentValue += point;
    screen.textContent = currentValue;
  }

  const isDelete = event.target.closest('.delete');

  if (isDelete) {
    if (currentValue === '') return;

    const currentValueLength = currentValue.length;
    currentValue = currentValue.slice(0, currentValueLength - 1);

    if (currentValue.length === 0) {
      screen.textContent = 0;
      currentValue = '';

      return;
    }

    screen.textContent = currentValue;
  }
});

function calculate(prevValue, operator, currentValueNumber) {
  switch (operator) {
    case '+':
      return prevValue + currentValueNumber;
    case '-':
      return prevValue - currentValueNumber;
    case '*':
      return prevValue * currentValueNumber;
    case '/':
      return prevValue / currentValueNumber;
    default:
      return currentValueNumber;
  }
}

function disableBtn() {
  btn.forEach((b) => b.setAttribute('disabled', ''));
}

function showBtn() {
  btn.forEach((b) => b.removeAttribute('disabled'));
}

function clear() {
  screen.textContent = 0;
  currentValue = '';
  prevValue = undefined;
  operator = undefined;
  isAfterEqual = false;
}
