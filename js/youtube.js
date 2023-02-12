const vids = document.querySelector('.vids');
const gall = document.querySelector('#gallery');
const key = 'AIzaSyBGee4MUXU3jusXj7YwDBzdXI5Sn3gAkIA';
const playlistId = 'PLY0voYdGZtAgPCRyH8libB1_TbuzvCR_a';
const num = 6;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`;

const gallery = document.querySelector('.gallery');
const galleryImg = gallery.querySelectorAll('.second .pic');
const colorBtn = gallery.querySelectorAll('.colorBtn a');

const tab_title = gallery.querySelectorAll('h2');
const tab_cont = gallery.querySelectorAll('.cont');

tab_title.forEach((el, idx) => {
    el.addEventListener('click', e => {
        e.preventDefault();

        activation(tab_title, idx);
        activation(tab_cont, idx);
    });
    // tabCont();
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

            if (title.length > 30) title = title.substr(0, 15) + '...';
            if (des.length > 100) des = des.substr(0, 30) + '...';
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
window.addEventListener('resize', e => {
    const pop = vids.querySelector('.popup');
    if (pop) document.body.classList.add('hidden');
});

function isoLayout() {
    loading.classList.add('off');
    frame.classList.add('on');
    new Isotope('#list', {
        itemSelection: '.imgs',
        columnWidth: '.imgs',
        transitionDuration: '0.5s',
    })
}