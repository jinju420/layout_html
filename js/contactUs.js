const mapCont = document.getElementById('map');
const tr_on = document.querySelectorAll('.traffic li')[0];
const tr_off = document.querySelectorAll('.traffic li')[1];
const store = document.querySelectorAll('.store li');
const bicycle = kakao.maps.MapTypeId.BICYCLE;
const submit = document.querySelector('input[type=submit]');

//get in touch
submit.addEventListener('click', (e) => {
	if (!isTxt('username')) e.preventDefault();
	if (!isEmail('email')) e.preventDefault();
	if (!isTxt('comments', 10)) e.preventDefault();
});

function isTxt(el, len) {
	if (len === undefined) len = 5;
	let input = document.querySelector(`input[name=${el}]`);
	let txt = input.value;

	if (txt.length >= len) {
		const errMsgs = input.closest('p').querySelectorAll('span');
		if (errMsgs.length > 0) input.closest('p').querySelector('span').remove();

		return true;
	} else {
		const errMsgs = input.closest('p').querySelectorAll('span');
		if (errMsgs.length > 0) return false;

		let errMessage = document.createElement('span');
		errMessage.append(`입력항목을 ${len}글자 이상 입력하세요`);
		input.closest('p').append(errMessage);
		return false;
	}
}

function isEmail(el, len) {
	let input = document.querySelector(`input[name=${el}]`);
	let txt = input.value;

	if (/@/.test(txt)) {
		const errMsgs = input.closest('p').querySelectorAll('span');
		if (errMsgs.length > 0) input.closest('p').querySelector('span').remove();

		return true;
	} else {
		const errMsgs = input.closest('p').querySelectorAll('span');
		if (errMsgs.length > 0) return false;

		let errMessage = document.createElement('span');
		errMessage.append('@를 포함한 전체 이메일 주소를 입력하세요');
		input.closest('p').append(errMessage);
		return false;
	}
}

var options = {
	center: new kakao.maps.LatLng(37.5556741, 126.9297811),
	level: 3, // 지도의 확대 레벨
};
//지도 생성
const map = new kakao.maps.Map(mapCont, options);

let storeOptions = [
	{
		title: 'Hongdae',
		lating: new kakao.maps.LatLng(37.5556741, 126.9297811),
		imgSrc: 'img/sub/marker1.png',
		imgSize: new kakao.maps.Size(86, 99),
		imgPos: { offset: new kakao.maps.Point(40, 113) },
		button: store[0],
	},
	{
		title: 'Samcheong',
		lating: new kakao.maps.LatLng(37.5793944, 126.9846224),
		imgSrc: 'img/sub/marker2.png',
		imgSize: new kakao.maps.Size(86, 99),
		imgPos: { offset: new kakao.maps.Point(40, 113) },
		button: store[1],
	},
	{
		title: 'Busan',
		lating: new kakao.maps.LatLng(35.1553121, 129.0644697),
		imgSrc: 'img/sub/marker3.png',
		imgSize: new kakao.maps.Size(86, 99),
		imgPos: { offset: new kakao.maps.Point(40, 113) },
		button: store[2],
	},
];
for (let i = 0; i < storeOptions.length; i++) {
	new kakao.maps.Marker({
		map: map,
		position: storeOptions[i].lating,
		title: storeOptions[i].title,
		image: new kakao.maps.MarkerImage(storeOptions[i].imgSrc, storeOptions[i].imgSize, storeOptions[i].imgPos),
	});
	storeOptions[i].button.addEventListener('click', (e) => {
		e.preventDefault();

		for (let j = 0; j < storeOptions.length; j++) {
			storeOptions[j].button.classList.remove('on');
		}
		storeOptions[i].button.classList.add('on');
		moveTo(storeOptions[i].lating);
	});
}
//이동할 위치값
function moveTo(target) {
	const moveLoad = target;
	map.setCenter(moveLoad);
}

window.addEventListener('resize', () => {
	const active_btn = document.querySelector('.store li.on');
	//위 변수에 활성화 되어있는 li안의 data-index의 속성값
	const active_index = active_btn.getAttribute('data-index');

	map.setCenter(storeOptions[active_index].lating);
});

//자전거
tr_on.addEventListener('click', (e) => {
	e.preventDefault();

	if (tr_on.classList.contains('on')) return;

	map.addOverlayMapTypeId(bicycle);
	tr_on.classList.add('on');
	tr_off.classList.remove('on');
});
tr_off.addEventListener('click', (e) => {
	e.preventDefault();

	map.removeOverlayMapTypeId(bicycle);
	tr_on.classList.remove('on');
	tr_off.classList.add('on');
});
