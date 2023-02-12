const list = document.querySelector('#list');
const content = document.querySelector('#content'); 
const listBtns = list.querySelectorAll('.inner dt');
const listContent = list.querySelectorAll('.wrap dd');
const listBtns_a = list.querySelectorAll('.wrap dt > a');
const articleA = list.querySelectorAll('.wrap dd article');
const conSwiper = content.querySelector('.inner .contSwiper');
const contentBtn = content.querySelector('.inner .btn');
const skipNavi=document.querySelectorAll('#skipNavi li a');

//skipNavi
for(const el of skipNavi){
    el.addEventListener('focusin',()=>{
        el.classList.add('skip');
    });
    el.addEventListener('focusout',()=>{
        el.classList.remove('skip');
    });
}

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

//리사이즈
window.addEventListener('resize', () => {
    initSwiper();
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