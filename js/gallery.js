const vids = document.querySelector('.vids');
const key = 'AIzaSyBGee4MUXU3jusXj7YwDBzdXI5Sn3gAkIA';
const playlistId = 'PLY0voYdGZtAgPCRyH8libB1_TbuzvCR_a';
const num = 6;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`;

const gallery = document.querySelector('.gallery');
const galleryImg = gallery.querySelectorAll('.second .pic');
const colorBtn = gallery.querySelectorAll('.colorBtn a');

//flickr
const base = 'https://www.flickr.com/services/rest/?';
// const method = 'flickr.interestingness.getList';
const method = 'flickr.favorites.getList';
const flickr_key = '8dfeab6f923483f4b3694e700652632a';
const user_id='195427004@N07';
const per_page = 6;
const frame = document.querySelector('#list');
const flickr_url = `${base}method=${method}&api_key=${flickr_key}&per_page=${per_page}&format=json&nojsoncallback=1&user_id=${user_id}`;


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



//flickr
fetch(flickr_url)
    .then((data) => {
        const result = data.json();
        console.log(result);
        return result;
    })
    .then((json) => {
        //console.log(items);
        const flickr_items = json.photos.photo;

        createImgs(flickr_items);
        Loading();
    })


//반복문
function createImgs(flickr_items) {
    htmls = '';

    flickr_items.map((item) => {
        const imgSrcBig = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`;
        const imgSrc = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg`;

        htmls += `
            <li class="imgs">
                <div>
                    <a href=${imgSrcBig}>
                        <img src=${imgSrc}>
                    </a>
                    <p>${item.title}</p>
                </div>
            </li>
        `;
    })
    frame.innerHTML = htmls;
}

//로딩
function Loading() {
    const imgs = frame.querySelectorAll('img');
    const len = imgs.length;

    let count = 0;
    for (const el of imgs) {
        el.addEventListener('load', () => {
            if (count == len) isoLayout();
        })
    }
}

//istope함수
function isoLayout() {
    frame.classList.add('on');
    new Isotope('#list', {
        itemSelection: '.imgs',
        columnWidth: '.imgs',
        transitionDuration: '0.5s',
    })
}


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