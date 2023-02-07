const notice = document.querySelector('.notice');
const numBtn = notice.querySelectorAll('.pagination .num a');
const notiarti = notice.querySelectorAll('article');
const prev = notice.querySelector('.pagination .prev');
const next = notice.querySelector('.pagination .next');

numBtn.forEach((el, idx) => {
    el.addEventListener('click', e => {
        e.preventDefault();

        atcive(numBtn, idx);
        atcive(notiarti, idx);
    })
})

//pagination active
function atcive(arr, idx) {
    for (const el of arr) {
        el.classList.remove('on');
    }
    arr[idx].classList.add('on');
}

prev.addEventListener('click', e => {
    e.preventDefault();
    console.log('prev');


})
// let count = 0;
// next.addEventListener('click', e => {
//     e.preventDefault();
//     count++;
//     numBtn.forEach((el, idx) => {
//         count++;
//         el.classList.remove('on');
//     })
//     numBtn[idx].classList.add('on')
//     // for (const el of numBtn) {
//     //     el.classList.remove('on');
//     //     console.log(el);
//     // }
//     // numBtn[idx].classList.add('on');

//     console.log(count)

// })
// numBtn.forEach((el, idx) => {
//     next.addEventListener('click', e => {
//         count++;
//         e.preventDefault();

//         for (const el of numBtn) {
//             el.classList.remove('on');
//         }
//         count[idx].classList.add('on');
//     })
// })