const header = document.querySelector('.header');
const footerLink = document.querySelectorAll('.footer article a');
const topBtn = document.querySelector('.footer .top');
const hdInner = header.querySelector('.inner');
const mo = header.querySelector('.menuMo');
const bg = header.querySelector('.bg');
const close = header.querySelector('.closeBox');
const bars = header.querySelector('.quick_menu .bars');
const tab_h3 = mo.querySelectorAll('.tab h3');
const mo_arrow = mo.querySelectorAll('.tab .arrow');
const inputChecked = mo.querySelectorAll('.inputUl');

//topbtn
window.addEventListener('scroll', () => {
    const scroll = parseInt(window.scrollY || window.pageYOffset);
    if (scroll > 200) {
        topBtn.classList.add('on');
    } else {
        topBtn.classList.remove('on');
    }
});
topBtn.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

//리사이즈시 
const tablet = 1179;
window.addEventListener('resize', () => {
    wid = window.innerWidth;

    //dark베경/스크롤막기
    const bg = header.querySelector('.bg');
    if (wid > tablet) {
        bg.style.display = 'none';
        document.body.classList.remove('hidden');
    } else if (mo.classList.contains('on')) {
        bg.style.display = 'block';
        document.body.classList.add('hidden');
    }
});

//header bar이벤트
bars.addEventListener('click', e => {
    e.preventDefault();

    mo.classList.add('on');
    hdInner.classList.add('on');
    bg.style.display = 'block';
    document.body.classList.add('hidden');
});

//close버튼 시 닫기
close.addEventListener('click', e => {
    e.preventDefault();

    mo.classList.remove('on');
    hdInner.classList.remove('on');
    bg.style.display = 'none';
    document.body.classList.remove('hidden');

    for (const el of inputChecked) {
        el.classList.add('on');
    }
    closeOn(mo_arrow);
    closeOn(tab_h3);
});

//아코디언
let count = 0;
tab_h3.forEach((el, idx) => {
    el.addEventListener('click', (e) => {

        count++;
        if (count > 1) inputChecked[idx].classList.remove('on');
        activation(mo_arrow, idx);
        activation(tab_h3, idx);
    })
});
tab_h3.forEach((el, idx) => {
    el.addEventListener('click', (e) => {

        count++;
        if (count > 1) inputChecked[idx].classList.remove('on');
        activation(mo_arrow, idx);
        activation(tab_h3, idx);
    })
});


//탭 on
function activation(arr, idx) {
    for (const el of arr) el.classList.remove('on');
    arr[idx].classList.add('on');
};

//close버튼 시 on
function closeOn(arr) {
    for (const el of arr) el.classList.remove('on');
};