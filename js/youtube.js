const vids = document.querySelector('.vids');
const key = 'AIzaSyBGee4MUXU3jusXj7YwDBzdXI5Sn3gAkIA';
const playlistId = 'PLY0voYdGZtAgPCRyH8libB1_TbuzvCR_a';
const num = 9;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`;

const gallery = document.querySelector('.gallery');
const galleryImg = gallery.querySelectorAll('.second .pic');
const colorBtn = gallery.querySelectorAll('.colorBtn a');


const tab_title = document.querySelectorAll('h2');
const tab_cont = document.querySelectorAll('.cont');

tab_title.forEach((el, idx) => {
    el.addEventListener('click', () => {
        activation(tab_title, idx);
        activation(tab_cont, idx);
    });
});

//youtube
fetch(url)
    .then((data) => {
        return data.json();
    })
    .then((json) => {
        let items = json.items;

        let result = '';

        items.map((el) => {

            let title = el.snippet.title;
            let des = el.snippet.description;
            let date = el.snippet.publishedAt;

            if (title.length > 30) title = title.substr(0, 20) + '...';
            if (des.length > 100) des = des.substr(0, 40) + '...';
            date = date.split('T')[0];

            result += `
            <article>
                <a href="${el.snippet.resourceId.videoId}" class="pic">
                    <img src="${el.snippet.thumbnails.medium.url}" />
                </a>
                <div class="con">
                    <h2>${title}</h2>
                    <p>${des}</p>
                    <span>${date}</span>
                </div>
            </article>
            `;
        })
        vids.innerHTML = result;
    });

//popup생성
vids.addEventListener('click', e => {
    e.preventDefault();


    if (!e.target.closest('a')) return;
    const vidId = e.target.closest('a').getAttribute('href');

    const videoPop = document.createElement('figure');

    videoPop.classList.add('popup');
    videoPop.innerHTML = `
    <div class='iframe'>
        <iframe src='https://www.youtube.com/embed/${vidId}' frameborder='0' width='100%'
        height='100%' allowfullscreen></iframe>
        <span class='closeBtn'>
            <i class="far fa-times-circle"></i>
        </span>
    </div>
    `;

    vids.append(videoPop);
    document.body.classList.add('hidden');
});

//popup닫기
vids.addEventListener('click', e => {
    const pop = vids.querySelector('.popup');
    if (pop) {
        const close = pop.querySelector('.closeBtn > i');
        if (e.target == close) {
            pop.remove();
            document.body.classList.remove('hidden');
        }
    }
});






//리사이즈시 
window.addEventListener('resize', () => {
    const pop = vids.querySelector('.popup');
    wid = window.innerWidth;

    if (pop) document.body.classList.add('hidden');
});

colorBtn.forEach((el, idx) => {
    el.addEventListener('click', e => {
        e.preventDefault();

        galleryActive(colorBtn, idx);
        galleryActive(galleryImg, idx);

    });
});


function galleryActive(arr, idx) {
    for (const el of arr) {
        el.classList.remove('on');
    }
    arr[idx].classList.add('on');
};


