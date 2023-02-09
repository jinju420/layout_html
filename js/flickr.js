
const base = 'https://www.flickr.com/services/rest/?';
// const method = 'flickr.interestingness.getList';
const method = 'flickr.favorites.getList';
const method1 = 'flickr.photos.search';
const flickr_key = '8dfeab6f923483f4b3694e700652632a';
const user_id = '195427004@N07';
const per_page = 20;
const gal = document.querySelector('#gallery');
const frame = gal.querySelector('#list');
const loading = gal.querySelector('.loading');
const input = gal.querySelector('#search');
const btn = gal.querySelector('.btn');
const url1 = `${base}method=${method}&api_key=${flickr_key}&per_page=${per_page}&format=json&nojsoncallback=1&user_id=${user_id}`;
const url2 = `${base}method=${method1}&api_key=${flickr_key}&per_page=${per_page}&format=json&nojsoncallback=1&tags=고양이&privacy_filter=1`;

//초기 갤러리 화면에 보여지는 데이터
callDate(url1);

//검색어 입력 후 버튼
btn.addEventListener('click', () => {
    let txt = input.value;
    txt = txt.trim();//공백을 없애는 함수
    const url = `${base}method=${method1}&api_key=${flickr_key}&per_page=${per_page}&format=json&nojsoncallback=1&tags=${txt}&privacy_filter=1`;

    if (txt != '') {
        callDate(url);
    } else {
        alert('검색어를 입력하세요');
    }
})
//엔터키
input.addEventListener('keypress', e => {
    if (e.keyCode == 13) {
        let txt = input.value;
        txt = txt.trim();
        const url = `${base}method=${method1}&api_key=${flickr_key}&per_page=${per_page}&format=json&nojsoncallback=1&tags=${txt}&privacy_filter=1`;

        if (txt != '') {
            callDate(url);
        } else {
            alert('검색어를 입력하세요');
        }

    }
})

frame.addEventListener('click', e => {
	e.preventDefault();
	let target = e.target.closest('.imgs');
	let imgSrc = target.querySelector('a').getAttribute('href');

	let pop = document.createElement('aside');
	let pops = `
		<img src="${imgSrc}">
		<span class="close">Close</span>
        `;
        pop.innerHTML = pops;
        document.querySelector('#gallery').append(pop);
		// <span class="close"><i class="far fa-times-circle"></i></span>
});
gal.addEventListener('click', (e) => {
	let target = e.target.closest('aside');
	target.remove();
});

//flickr
function callDate(url1) {
    frame.innerHTML = '';
    loading.classList.remove('off');
    frame.classList.remove('on');
    fetch(url1)
        .then((data) => {
            const result = data.json();
            //console.log(result);
            return result;
        })
        .then((json) => {
            const items = json.photos.photo;
            console.log(items);

            if (items.length > 0) {
                createImgs(items);
                Loading();
            } else {
                alert('검색하신 이미지의 데이터가 없습니다');
            }

        })
}


//반복문
function createImgs(items) {
    htmls = '';

    items.map((item) => {
        const imgSrcBig = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg`;
        const imgSrc = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`;

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
            count++;
            if (count == len) isoLayout();
        })

        el.addEventListener('error', () => {
            e.currentTarget.closest('.item').querySelector('img').setAttribute('src', 'img/k1.jpg');
        })
    }
}

//istope함수
function isoLayout() {
    loading.classList.add('off');
    frame.classList.add('on');
    new Isotope('#list', {
        itemSelection: '.imgs',
        columnWidth: '.imgs',
        transitionDuration: '0.5s',
    })
}