const myPage = document.querySelector('.mypage');
const btnSubmit = myPage.querySelector('input[type=submit]');

btnSubmit.addEventListener('click', (e) => {
	if (!isTxt('userId')) e.preventDefault();
	if (!isTxt('comments', 10)) e.preventDefault();
	if (!isEmail('email')) e.preventDefault();

	if (!isCheck('gender')) e.preventDefault();
	if (!isCheck('style')) e.preventDefault();

	if (!isSelect('age')) e.preventDefault();
	if (!isPwd('pwd1', 'pwd2')) e.preventDefault();
});

//유효성 검사
//userId
function isTxt(el, len) {
	if (len === undefined) len = 5;
	let input = myPage.querySelector(`[name=${el}]`);
	let txt = input.value;

	if (txt.length >= len) {
		const errMsgs = input.closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) input.closest('td').querySelector('p').remove();

		return true;
	} else {
		const errMsgs = input.closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) return false;

		let errMessage = document.createElement('p');
		errMessage.append(`입력항목을 ${len}글자 이상 입력하세요`);
		input.closest('td').append(errMessage);
		return false;
	}
}

//email
function isEmail(el, len) {
	let input = myPage.querySelector(`[name=${el}]`);
	let txt = input.value;

	if (/@/.test(txt)) {
		const errMsgs = input.closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) input.closest('td').querySelector('p').remove();

		return true;
	} else {
		const errMsgs = input.closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) return false;

		let errMessage = document.createElement('p');
		errMessage.append('@를 포함한 전체 이메일 주소를 입력하세요');
		input.closest('td').append(errMessage);
		return false;
	}
}

//check
function isCheck(el) {
	let inputs = myPage.querySelectorAll(`[name=${el}]`);
	let isCheck = false;

	for (const el of inputs) if (el.checked) isCheck = true;

	if (isCheck) {
		const errMsgs = inputs[0].closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) inputs[0].closest('td').querySelector('p').remove();

		return true;
	} else {
		const errMsgs = inputs[0].closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) return false;

		let errMessage = document.createElement('p');
		errMessage.append('필수 입력 항목을 체크해 주세요');
		inputs[0].closest('td').append(errMessage);
		return false;
	}
}

//select
function isSelect(el) {
	let sel = myPage.querySelector(`[name=${el}]`);

	let sel_index = sel.options.selectedIndex;
	let value = sel[sel_index].value;

	if (value !== '') {
		const errMsgs = sel.closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) sel.closest('td').querySelector('p').remove();
		return true;
	} else {
		const errMsgs = sel.closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) return false;

		let errMessage = document.createElement('p');
		errMessage.append('항목을 선택해 주세요');
		sel.closest('td').append(errMessage);
		return false;
	}
}

//pwd
function isPwd(el1, el2, len) {
	if (len === undefined) len = 5;
	let pwd1 = myPage.querySelector(`[name=${el1}]`);
	let pwd2 = myPage.querySelector(`[name=${el2}]`);
	let pwd1_value = pwd1.value;
	let pwd2_value = pwd2.value;

	const num = /[0-9]/;
	const eng = /[a-zA-Z]/;
	const spc = /[~!@#$%^&*()_+?<>]/;

	if (
		pwd1_value === pwd2_value &&
		pwd1_value.length >= len &&
		num.test(pwd1_value) &&
		eng.test(pwd1_value) &&
		spc.test(pwd1_value)
	) {
		const errMsgs = pwd1.closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) pwd1.closest('td').querySelector('p').remove();

		return true;
	} else {
		const errMsgs = pwd1.closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) return false;

		let errMessage = document.createElement('p');
		errMessage.append(`비밀번호는 ${len}글자 이상, 영문, 숫자, 특수문자를 포함하여 동일하게 입력하세요.`);
		pwd1.closest('td').append(errMessage);
		return false;
	}
}
