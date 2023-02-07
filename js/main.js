const listBtns = list.querySelectorAll('.inner dt');
const listContent = list.querySelectorAll('.wrap dd');
const listBtns_a = list.querySelectorAll('.wrap dt > a');
const articleA = list.querySelectorAll('.wrap dd article');
const conSwiper = content.querySelector('.inner .contSwiper');
const contentBtn = content.querySelector('.inner .btn');
// const gallery = document.querySelector('.gallery');
// const galleryImg = gallery.querySelectorAll('.second .pic');
// const colorBtn = gallery.querySelectorAll('.colorBtn a');


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