(function(win, doc){
  'use strict';
	/*
	Vamos desenvolver mais um projeto. A ideia é fazer uma mini-calculadora.
	As regras são:

	- Deve ter somente 1 input, mas não deve ser possível entrar dados nesse input
	diretamente;
	- O input deve iniciar com valor zero;
	- Deve haver 10 botões para os números de 0 a 9. Cada botão deve ser um número;
	- Deve haver 4 botões para as operações principais: soma (+), subtração(-),
	multiplicação(x) e divisão(÷);
	- Deve haver um botão de "igual" (=) que irá calcular os valores e um botão "CE"
	que irá limpar o input, deixando-o com valor 0;

	- A cada número pressionado, o input deve atualizar concatenando cada valor
	digitado, como em uma calculadora real;
	- Ao pressionar um botão com uma das 4 operações, deve aparecer o símbolo da
	operação no input. Se o último caractere no input já for um símbolo de alguma
	operação, esse caractere deve ser substituído pelo último pressionado.
	Exemplo:
	- Se o input tem os valores: "1+2+", e for pressionado o botão de
	multiplicação (x), então no input deve aparecer "1+2x".
	- Ao pressionar o botão de igual, o resultado do cálculo deve ser mostrado no
	input;
	- Ao pressionar o botão "CE", o input deve ficar zerado.
	*/

	var $input = doc.querySelector('[data-js="input"]');
	
	var $buttonsNumbers = doc.querySelectorAll('[data-js="button-number"]');
	var $buttonsOperation = doc.querySelectorAll('[data-js="button-operation"]');
	var $buttonCE = doc.querySelector('[data-js="ce"]');
	var $buttonEq = doc.querySelector('[data-js="button-eq"]');

	Array.prototype.forEach.call($buttonsNumbers, function(button){
		button.addEventListener('click', handleClickNumber, false);
	});

	Array.prototype.forEach.call($buttonsOperation, function(button){
		button.addEventListener('click', handleClickOperation, false);
	});

	$buttonCE.addEventListener('click', handleClickCE, false);
	$buttonEq.addEventListener('click', handleClickEq, false);


	function handleClickNumber(){
		
		$input.value = $input.value === '0' ? this.value : $input.value + this.value;
	}

	function handleClickCE(){
		$input.value = 0;
	}

	function handleClickOperation(){
		removeLastItemIfItIsAnOperator();

		$input.value += this.value;
	}

	function removeLastItemIfItIsAnOperator(){
		if(isLastItemAnOperations())
			$input.value = $input.value.slice(0, -1);
	}

	function isLastItemAnOperations(){
		var operations = ['+', '-', '*', '/'];
		var lastItem = $input.value.split('').pop();
		return operations.some(function(operator){
			return operator === lastItem;
		});
	}

	function handleClickEq(){
		removeLastItemIfItIsAnOperator();
		
		var numeros = $input.value.match(/(\d+)/g);
		var operator = $input.value.match(/(\D+)/g);
		var priorityOperation = ['*', '/'];
		var resultPriority = 0;
		var result = 0;
		var finalResult = 0;

		operator.forEach(function(item, index){
			
			if(itemArrayIsEquals(priorityOperation, item)){
				if(operator[index -1] === '*' || operator[index -1] === '/'){
					resultPriority = execOperationPriority(item, resultPriority, Number(numeros[index + 1]));
				}else{
					resultPriority = execOperationPriority(item, Number(numeros[index]), Number(numeros[index + 1]));
				}
			}else{

				if(index === 0)
						result = Number(numeros[0]);

				finalResult += resultPriority;
				resultPriority = 0;
				if((operator[index +1] !== '*' && operator[index +1] !== '/')){
						result = execOperation(item, result, Number(numeros[index+1]));
				}
			}
		});
		
		finalResult += result + resultPriority; 
		$input.value = finalResult;
	}

	function execOperationPriority(operator, num1, num2){
		return operator === '*' ? (num1 * num2) : (num1 / num2);
	}

	function execOperation(operator, num1, num2){
		return operator === '+' ? (num1 + num2) : (num1 - num2);
	}

	function itemIsEquals(item1, item2){
		return item1 === item2;
	}

	function itemArrayIsEquals(array, objectCompare){
		return array.some(function(item){
			return item === objectCompare;
		});
	}
	
})(window, document);