const screen = document.querySelector('.screen');
let shownScreen = [];
const totalDigit = 9;
let calculate;
let result;

document.addEventListener('click', function (e) {
  const isNumber = e.target.closest('.num');
  if (isNumber) {
    const number = Number(e.target.dataset.number);

    if (!isNaN(number) && shownScreen.length <= totalDigit) {
      shownScreen.push(number);
      screen.textContent = shownScreen.join('');
    }
  }

  const isPoint = e.target.closest('.point');
  if (isPoint) {
    if (shownScreen.length <= totalDigit) {
      if (shownScreen.length === 0) {
        shownScreen.push(0);
        shownScreen.push('.');
      } else {
        shownScreen.push('.');
      }
    }
    screen.textContent = shownScreen.join('');
  }

  const isClear = e.target.closest('.clear');
  if (isClear) {
    screen.textContent = 0;
    result = undefined;
    calculate = undefined;
    shownScreen = [];
  }

  const isDelete = e.target.closest('.delete');
  if (isDelete) {
    console.log(shownScreen.length);
    if (shownScreen.length === 1) {
      screen.textContent = 0;
    } else {
      shownScreen.pop();
      screen.textContent = shownScreen.join('');
    }
  }

  const isOperator = e.target.closest('.operator');
  if (isOperator) {
    const operator = isOperator.dataset.op;

    switch (operator) {
      case '+':
        if (shownScreen.length <= totalDigit) {
          shownScreen.push('+');
          screen.textContent = shownScreen.join('');
          calculate = add;
        }
        break;
      case '-':
        if (shownScreen.length <= totalDigit) {
          shownScreen.push('-');
          screen.textContent = shownScreen.join('');

          calculate = subtraction;
        }
        break;
      case '/':
        if (shownScreen.length <= totalDigit) {
          shownScreen.push('/');
          screen.textContent = shownScreen.join('');

          calculate = division;
        }
        break;
      case '*':
        if (shownScreen.length <= totalDigit) {
          shownScreen.push('*');
          screen.textContent = shownScreen.join('');

          calculate = multiplication;
        }
        break;
      case '=':
        // console.log(calculate);
        if (!calculate) return;
        calculate(result, operand);

        break;
    }
    // console.log(calculate);
    // shownScreen = [];
    // console.log(operandLength);
    // const resultArr = result.toString().split('');
    // const hasPoint = resultArr.includes('.');
    // console.log(hasPoint);
    // if (hasPoint) {
    //   result = parseFloat(result.toFixed(10));
    //   screen.textContent = result;
    //   return;
    // }

    // screen.textContent = result;
  }

  // console.log(calculate);
  // const isEqual = e.target.closest('.equal');
  // if (isEqual) {
  //   calculate();
  // }

  function add(a, b) {
    a = a ?? 0;
    b = b ?? 0;
    result = a + b;
    console.log('a =', a);
    console.log('b =', b);
    console.log('a + b =', result);
  }

  function subtraction(a, b) {
    a = a ?? b * 2;
    b = b ?? 0;
    result = a - b;
    console.log('a =', a);
    console.log('b =', b);
    console.log('a - b =', result);
  }

  function division(a, b) {
    a = a ?? 1;
    b = b ?? 1;
    return (result = a / b);
  }

  function multiplication(a, b) {
    a = a || 1;
    b = b || 1;
    return (result = a * b);
  }

  // const isEqual = e.target.closest('.equal');
  // if (isEqual) {
  //   shownScreen = [];
  //   screen.textContent = result ?? 0;
  // }
});
