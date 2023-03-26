const panel = document.querySelector('#visual .panel');
const panel_li = panel.querySelectorAll('#visual li');
const panel_li_arr = Array.from(panel_li);
const btnUp = document.querySelector('#visual .btnUp');
const btnDown = document.querySelector('#visual .btnDown');
const len = panel_li.length;
const delay = 600;

panel_li.forEach((li) => splitTxt(li.querySelector('h2')));

btnUp.addEventListener('click', moveUp);
btnDown.addEventListener('click', moveDown);

function moveUp(e) {
	e.preventDefault();
	const current_item = panel.querySelector('.on');
	const current_idx = panel_li_arr.indexOf(current_item);
	let next_idx = null;

	current_idx != len - 1 ? (next_idx = current_idx + 1) : (next_idx = 0);

	current_item.classList.remove('on');
	current_item.classList.add('up');
	panel_li[next_idx].classList.add('down');

	setTimeout(() => {
		panel_li[next_idx].classList.remove('down');
		panel_li[next_idx].classList.add('on');
		panel.querySelector('.up').classList.remove('up');
	}, delay);
}

function moveDown(e) {
	e.preventDefault();
	const current_item = panel.querySelector('.on');
	const current_idx = panel_li_arr.indexOf(current_item);
	let next_idx = null;

	current_idx != 0 ? (prev_idx = current_idx - 1) : prev_idx - 1;

	current_item.classList.remove('on');
	current_item.classList.add('down');
	panel_li[prev_idx].classList.add('up');

	setTimeout(() => {
		panel_li[prev_idx].classList.remove('up');
		panel_li[prev_idx].classList.add('on');
		panel.querySelector('.down').classList.remove('down');
	}, delay);
}

function splitTxt(el) {
	const txt = el.innerText;
	let tags = '';
	let num = 0;
	for (const el of txt) tags += `<span style='transition-delay:${0.1 * num++}s'>${el}</span>`;

	el.innerHTML = tags;
}
