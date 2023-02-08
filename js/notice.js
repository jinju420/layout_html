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


});