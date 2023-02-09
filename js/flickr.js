
// const base = 'https://www.flickr.com/services/rest/?';
// const method = 'flickr.interestingness.getList';
// // const method1 = 'flickr.photos.search';
// // const method2 = 'flickr.favorites.getList';
// const flickr_key = '8dfeab6f923483f4b3694e700652632a';
// const per_page = 100;
// const frame = document.querySelector('#list');

// const url2 = `${base}method=${method}&api_key=${flickr_key}&per_page=${per_page}&format=json&nojsoncallback=1`;

// fetch(url2)
// 	.then((data) => {
// 		let result = data.json();
// 		console.log(result);
// 		return result;
// 	})
// 	.then((json) => {
// 		let items = json.photos.photo;
// 		console.log(items);

// 		let htmls = '';

// 		items.map((el, index) => {
// 			let imgSrcBig = `https://live.staticflickr.com/${el.server}/${el.id}_${el.secret}_m.jpg`;
// 			//큰이미지 주소를 변수로 담음
// 			let imgSrc = `https://live.staticflickr.com/${el.server}/${el.id}_${el.secret}_b.jpg`;
// 			//섬네일 이미지 주소를 변수로 담음

// 			htmls += `
//         <li class="item">
//           <div>
//             <a href=${imgSrcBig}>
//               <img src=${imgSrc}>
//             </a>
//             <p>${el.title}
//             </p>
//           </div>
//         </li>
//       `;
// 		});
// 		frame.innerHTML = htmls;

// 	});

//     function isoLayout() {
//         frame.classList.add('on');
//         new Isotope('#list', {
//             itemSelection: '.item',
//             columnWidth: '.item',
//             transitionDuration: '0.5s',
//         });
//     }
    

// const base = 'https://www.flickr.com/services/rest/?';
// const method = 'flickr.interestingness.getList';
// // const method1 = 'flickr.photos.search';
// const flickr_key = '8dfeab6f923483f4b3694e700652632a';
// const per_page = 15;
// const frame = document.querySelector('#list');
// const loading = document.querySelector('.loading');

// const flickr_url = `${base}method=${method}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1`;
// // const url2 = `${base}method=${method1}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&tags=소품&privacy_filter=1`;

// //처음에는 무언가를 보여줘야되기때문에 소품을 넣어서
// //초기 갤러리 화면에 보여지는 데어터를 불러준다.
// callDate(flickr_url);

// //이벤트위임으로 각 이미지 클릭 시 큰 이미지를 호출해서 보여주기
// // frame.addEventListener('click', e => {
// //     e.preventDefault();
// //     let target = e.target.closest('.item');
// //     let imgSrc = target.querySelector('a').getAttribute('href');

// //     let pop = document.createElement('aside');
// //     let pops = `
// //         <img src=${imgSrc}>
// //         <span class='close'>Close</span>
// //     `;
// //     pop.innerHTML = pops;
// //     document.querySelector('#gallery').append(pop);
// // });


// function callDate(flickr_url) {



//     //1. 데이터불러오는 기능
//     fetch(flickr_url)
//         .then((data) => {
//             const result = data.json();
//             console.log(result);
//             return result;
//         })
//         .then((json) => {
//             const items = json.photos.photo;

//             if (items.length > 0) {
//                 createList(items);
//                 delayLoading();
//             } else {
//                 alert('검색하신 이미지의 데이터가 없습니다')
//             }

//         });
// }

// function createList(items) {
//     ///2. 동적 돔 만드는 기능
//     let htmls = '';

//     //반복문 이미지 돔생성
//     items.map((el) => {
//         //큰이미지
//         const imgSrcBig = `https://live.staticflickr.com/${el.server}/${el.id}_${el.secret}_b.jpg`;
//         //썸네일
//         const imgSrc = `https://live.staticflickr.com/${el.server}/${el.id}_${el.secret}_m.jpg`;

//         htmls += `
//             <li class='item'>
//                 <div>
//                     <a href=${imgSrcBig}>
//                         <img src=${imgSrc}>
//                     </a>
//                     <p>${el.title}</p>
//                 </div>
//             </li>            
//         `;
//     });
//     frame.innerHTML = htmls;
// }

// function delayLoading() {
//     //3. 이미지로드되기까지 딜레이 기능
//     const imgs = frame.querySelectorAll('img');
//     const len = imgs.length;

//     //카운트가 100이 됐을 때 이미지 갯수도 100이 맞춰졌을 때 실행
//     let count = 0;
//     for (const el of imgs) {
//         el.addEventListener('load', () => {
//             count++;
//             if (count == len) isoLayout();
//         });
//         //만약 img DOM요소에 이미지 소스가 없거나 로드에 에러가 나서 엑박이 뜨면
//         //1. 아예 이미지 자체를 display:none로 없애거나 
//         // 2. src속성에 접근해서 대체이미지로 바꾸는 방법

//     }
// }
// //isotope플러그인 함수
// function isoLayout() {
//     new Isotope('#list', {
//         itemSelection: '.item',
//         columnWidth: '.item',
//         transitionDuration: '0.5s',
//     });
// }

// //flickr
const base = 'https://www.flickr.com/services/rest/?';
// const method = 'flickr.interestingness.getList';
const method = 'flickr.favorites.getList';
const flickr_key = '8dfeab6f923483f4b3694e700652632a';
const user_id = '195427004@N07';
const per_page = 100;
const frame = document.querySelector('#list');
const flickr_url = `${base}method=${method}&api_key=${flickr_key}&per_page=${per_page}&format=json&nojsoncallback=1&user_id=${user_id}`;

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
            count++;
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