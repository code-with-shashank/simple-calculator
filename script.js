const btns = document.querySelectorAll('.btn')
const resultArea = document.querySelector('#result')
const symbolArea = document.querySelector('#symbol')

let num1 = '', num2 = '', symbol = ''

const numClickHandler = num => {
	if (symbol === '') {
		num1 += num
		updateResult(num1)
	}
	else {
		num2 += num
		updateResult(num2)
	}
}

const symbolClickHandler = sym => {
	symbol = sym

	if (symbol === '*') {
		sym = '×'
	} else if (symbol === '/') {
		sym = '÷'
	}
	symbolArea.innerText = sym
}

const equalClickHandler = () => {
	let res,
	n1 = parseFloat(num1),
	n2 = parseFloat(num2)

	switch (symbol) {
		case '+':
			res = n1 + n2
			break;
		case '-':
			res = n1 - n2
			break;
		case '*':
			res = n1 * n2
			break;
		case '/':
			if (n2 !== 0)
				res = n1 / n2
			else
				res = "Error"
				break
		default:
			res = num1
			break;
	}

	updateResult(res)
	symbol = ''
	symbolArea.innerText = ''
	num1 = ''
	num2 = ''
	if (res !== "Error")
		num1 = res
}

const updateResult = (res) => {
	resultArea.innerText = res
	resultArea.scrollTo(resultArea.scrollWidth, 0)
}


const clearClickHandler = () => {
	num1 = ''
	num2 = ''
	symbol = ''
	resultArea.innerText = ''
	symbolArea.innerText = ''
}


btns.forEach(btn => {
	const attr = btn.getAttribute('data-val')
	if (/\d/.test(attr))
		btn.addEventListener('click', () => numClickHandler(attr))
	else if (/\+|\-|\/|\*/.test(attr))
		btn.addEventListener('click', () => symbolClickHandler(attr))
	else if (attr === 'c')
		btn.addEventListener('click', clearClickHandler)
	else if (attr === '=')
		btn.addEventListener('click', equalClickHandler)
})