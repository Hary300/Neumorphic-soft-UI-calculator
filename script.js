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
    console.log('-------');
    console.log('currentValue =', currentValue);
    console.log('prevValue =', prevValue);
    console.log('operator =', operator);

    const isMinus = event.target.closest('.minus-btn');
    if (currentValue === '' && isMinus) {
      currentValue += isMinus.dataset.op;
      screen.textContent = currentValue;
      return;
    }

    if (operator) return;
    if (currentValue === '') return;
    isAfterEqual = false;
    prevValue = Number(currentValue);
    operator = isOperator.dataset.op;
    currentValue = '';
    console.log('-------');
    console.log('currentValue =', currentValue);
    console.log('prevValue =', prevValue);
    console.log('operator =', operator);
  }

  const isEqual = event.target.closest('.equal');
  if (isEqual) {
    console.log('-------');
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
    prevValue = undefined;
    operator = undefined;

    if (Number.isNaN(result)) {
      disableBtn();
      screen.textContent = 'Error';
      return;
    }

    if (result === Infinity || result === -Infinity) {
      disableBtn();
    } else {
      currentValue = String(result);
    }

    if (!Number.isNaN(result) && result !== Math.trunc(result)) {
      const changeFormat = Number(result.toFixed(4));
      screen.textContent = changeFormat;
      currentValue = String(changeFormat);
      return;
    }

    screen.textContent = result;
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

  const isChangeBgBtn = event.target.closest('.change-bg-btn');
  if (isChangeBgBtn) {
    const changeBackground = document.querySelector('.change-bg-btn');
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);

    let color = `rgb(${red},${green},${blue})`;

    document.body.classList.remove('bg-amber-300');
    document.body.style.backgroundColor = color;
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
