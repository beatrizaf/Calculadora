/*Seleção de operadores
Retorna uma lista de elementos presentes no documento*/
const numberButtons = document.querySelectorAll("[data-number]"); 
const operationButtons = document.querySelectorAll("[data-operator]");

/*Retorna o primeiro elemento dentro do documento*/
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");

/*Classe para guardar o previous e o current*/
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear(); /*Elementos são vazios por padrão*/
  }

  /*formatar número no display*/
  formatDisplayNumber(number) {
    const stringNumber = number.toString(); /*converter para string*/

    const integerDigits = parseFloat(stringNumber.split(".")[0]); /*pegar o primeiro elemento antes do ponto*/
    const decimalDigits = stringNumber.split(".")[1];

    let integerDisplay;

    /*quando o elemento antes do ponto for vazio*/
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } 
    else {
      integerDisplay = integerDigits.toLocaleString("en", {maximumFractionDigits: 0,});
    }

    if (decimalDigits != null) {
      return `${integerDisplay},${decimalDigits}`;
    } 
    else {
      return integerDisplay;
    }
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  calculate() {
    let result;

    const _previousOperand = parseFloat(this.previousOperand); 
    const _currentOperand = parseFloat(this.currentOperand);

    if (isNaN(_previousOperand) || isNaN(_currentOperand)) return; /* se não for um número*/

    switch (this.operation) {
      case "+":
        result = _previousOperand + _currentOperand;
        break;
      case "-":
        result = _previousOperand - _currentOperand;
        break;
      case "÷":
        result = _previousOperand / _currentOperand;
        break;
      case "*":
        result = _previousOperand * _currentOperand;
        break;
      default:
        return;
    }

    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = "";
  }

  /*Receber o conteudo do botão selecionada para operação*/
  chooseOperation(operation) {
    if (this.currentOperand === "") return; /*a operação só é exibida no display se existir um número antes 

    /*se tiver algum elemento no previous realiza a operação*/
    if (this.previousOperand !== "") {
      this.calculate();
    }

    this.operation = operation;

    /*Quando uma operação é selecionada o número que tava no current vai para previous*/
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  /*recebe o contéudo dos botões numéricos*/
  appendNumber(number) {
    if (this.currentOperand.includes(".") && number === ".") return; /*verificar se possui apenas 1 ponto*/

    this.currentOperand = `${this.currentOperand}${number.toString()}`;
  }

  /*Método para Botão AC*/
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  /*atualiza os elementos de texto*/
  updateDisplay() {
    this.previousOperandTextElement.innerText = `${this.formatDisplayNumber(this.previousOperand)} ${this.operation || ""}`; /*caso não tenha operação não mostra o undefined*/
    this.currentOperandTextElement.innerText = this.formatDisplayNumber(this.currentOperand);
  }
}

/*Instacia um objeto do tipo Calculator*/
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

/*para cada número criar um evento para captar*/
for (const numberButton of numberButtons) {
  numberButton.addEventListener("click", () => {
    calculator.appendNumber(numberButton.innerText);
    calculator.updateDisplay();
  });
}

/*Função executada quando clica nos operadores*/
for (const operationButton of operationButtons) {
  operationButton.addEventListener("click", () => {
    calculator.chooseOperation(operationButton.innerText);
    calculator.updateDisplay();
  });
}

/*evento para quando clicar nos botões AC, igual e delete*/
allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

equalsButton.addEventListener("click", () => {
  calculator.calculate();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
