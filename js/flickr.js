
const base = 'https://www.flickr.com/services/rest/?';
// const method = 'flickr.interestingness.getList';
const method = 'flickr.favorites.getList';
const method1 = 'flickr.photos.search';
const flickr_key = '8dfeab6f923483f4b3694e700652632a';
const user_id = '195427004@N07';//즐겨찾기이미지
const per_page = 12;
const galCont = document.querySelector('.gallery');
const gal = galCont.querySelector('#gallery');
const frame = gal.querySelector('#list');
const loading = gal.querySelector('.loading');
const input = gal.querySelector('#search');
const btn = gal.querySelector('.btn');
const youtube = galCont.querySelector('.vids')
const url1 = `${base}method=${method}&api_key=${flickr_key}&per_page=${per_page}&format=json&nojsoncallback=1&user_id=${user_id}`;
const url2 = `${base}method=${method1}&api_key=${flickr_key}&per_page=${per_page}&format=json&nojsoncallback=1&tags=인테리어&privacy_filter=1`;

//초기 갤러리 화면에 보여지는 데이터
callDate(url2);

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
    //클릭한 대상이 #list이면 return하도록
    if (e.target == frame) return;
    //썸네일을 클릭해야지만 볼수있도록
    let target = e.target.closest('.imgs').querySelector('.thumb');

    //사용자가 클릭한 대상이 썸네일인지
    if (e.target == target) {
        //let imgSrc = target.parentElement.getAttribute('href'); //thumb의 부모인 a태그를 찾는 방법
        let imgSrc = target.closest('a').getAttribute('href'); //thumb에서 가장 가까이에 있는 a태그를 찾는 방법
        let pop = document.createElement('aside');
        pop.classList.add('pop');
        document.body.classList.add('hidden');
        let pops = `
        <div class='imgCont'>
            <img src="${imgSrc}">
            <span class="close">
                <i class="far fa-times-circle"></i>
            </span>
        </div>
        `;
        pop.innerHTML = pops;
        gal.append(pop);
    } else {
        return;
    }
});

gal.addEventListener('click', (e) => {
    //pop이라는 클래스를 추적한다
    let pop = gal.querySelector('.pop');
    if (pop != null) {
        //팝이 존재하는지
        let close = pop.querySelector('.close> i');
        if (e.target == close) {
            pop.remove();
            document.body.classList.remove('hidden');
        }
    }
});

//리사이즈시 
window.addEventListener('resize', () => {
    let pop = gal.querySelector('.pop');
    if (pop) document.body.classList.add('hidden');

});

//flickr
function callDate(url1) {
    frame.innerHTML = '';
    loading.classList.remove('off');
    frame.classList.remove('on');
    fetch(url1)
        .then((data) => {
            const result = data.json();
            return result;
        })
        .then((json) => {
            const items = json.photos.photo;

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
        const imgSrc = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg`;

        htmls += `
            <li class="imgs">
                <div>
                    <a href=${imgSrcBig}>
                        <img class="thumb" src=${imgSrc}>
                    </a>
                    </div>
                    </li>
                    `;
                })
                frame.innerHTML = htmls;
            }
            // <p>${item.title}</p>

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
            e.currentTarget.closest('.imgs').querySelector('img').setAttribute('src', 'img/k1.jpg');
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