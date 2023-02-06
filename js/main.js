const header = document.querySelector('#header');
const list = document.querySelector('#list');
const content = document.querySelector('#content');
const footerLink = document.querySelectorAll('#footer article a');
const topBtn = document.querySelector('#footer .top');
const hdInner = header.querySelector('.inner');
const mo = header.querySelector('.menuMo');
const bg = header.querySelector('.bg');
const close = header.querySelector('.closeBox');
const bars = header.querySelector('.quick_menu .bars');
const tab_h3 = mo.querySelectorAll('.tab h3');
const mo_arrow = mo.querySelectorAll('.tab .arrow');
const inputChecked = mo.querySelectorAll('.inputUl');
const listBtns = list.querySelectorAll('.inner dt');
const listContent = list.querySelectorAll('.wrap dd');
const listBtns_a = list.querySelectorAll('.wrap dt > a');
const articleA = list.querySelectorAll('.wrap dd article');
const conSwiper = content.querySelector('.inner .contSwiper');
const contentBtn = content.querySelector('.inner .btn');
// const gallery = document.querySelector('.gallery');
// const galleryImg = gallery.querySelectorAll('.second .pic');
// const colorBtn = gallery.querySelectorAll('.colorBtn a');

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



//탭메뉴
listBtns_a.forEach((el, idx) => {
    el.addEventListener('focusin', () => {
        activation(listBtns, idx);
        activation(listContent, idx);
    });
});
listBtns.forEach((el, idx) => {
    el.addEventListener('click', (e) => {
        e.preventDefault();

        activation(listBtns, idx);
        activation(listContent, idx);

        for (const el of articleA) el.classList.add('on');
    });
});

//리사이즈시 
window.addEventListener('resize', () => {
    wid = window.innerWidth;
    initSwiper();

    //dark베경/스크롤막기
    const bg = header.querySelector('.bg');
    if (wid > _tablet) {
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


//content swiper
var swiper = new Swiper("#content .contSwiper", {
    slidesPerView: 'auto',
    spaceBetween: 30,
    loop: true,
    navigation: {
        prevEl: '.prevBtn',
        nextEl: '.nextBtn',
    },
    pagination: {
        clickable: true,
    },
});

//mo일때 autoplay
const _mobile = 539;
const _tablet = 1179;
let mySwiper = undefined;
let wid = window.innerWidth;

function initSwiper() {
    if (wid < _mobile && mySwiper === undefined) {
        mySwiper = new Swiper("#content .contSwiper", {
            slidesPerView: 1,
            spaceBetween: 30,
            simulateTouch: true,
            loop: true,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
        })
    } else if (wid > _mobile && mySwiper !== undefined) {
        mySwiper.destroy();
        mySwiper = undefined;
    }
};
initSwiper();


//함수
//탭 on
function activation(arr, idx) {
    for (const el of arr) el.classList.remove('on');
    arr[idx].classList.add('on');
};

//close버튼 시 on
function closeOn(arr) {
    for (const el of arr) el.classList.remove('on');
};

// colorBtn.forEach((el, idx) => {
//     el.addEventListener('click', e => {
//         e.preventDefault();

//         galleryActive(colorBtn, idx);
//         galleryActive(galleryImg, idx);

//     })
// })


// function galleryActive(arr, idx) {
//     for (const el of arr) {
//         el.classList.remove('on');
//     }
//     arr[idx].classList.add('on');
// };