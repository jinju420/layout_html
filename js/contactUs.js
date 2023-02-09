const mapCont = document.getElementById('map')
const tr_on = document.querySelectorAll('.traffic li')[0];
const tr_off = document.querySelectorAll('.traffic li')[1];
const store = document.querySelectorAll('.store li');

var options = {
    center: new kakao.maps.LatLng(37.5556741, 126.9297811), 
    level: 3 // 지도의 확대 레벨
};
// 지도를 표시할 div와  지도 옵션으로  지도를 생성
const map = new kakao.maps.Map(mapCont, options);
// let storeOptions = [
//     {
//         title: '본점',
//         lating: new kakao.maps.LatLng(37.5556741, 126.9297811),
//         imgSrc: 'img/marker1.png',
//         imgSize: new kakao.maps.Size(232, 99),
//         imgPos: { offset: new kakao.maps.Point(116, 69) },
//         button: store[0]
//     }, {
//         title: '지점1',
//         lating: new kakao.maps.LatLng(37.5793944, 126.9846224),
//         imgSrc: 'img/marker2.png',
//         imgSize: new kakao.maps.Size(232, 99),
//         imgPos: { offset: new kakao.maps.Point(116, 69) },
//         button: store[1]
//     }, {
//         title: '지점2',
//         lating: new kakao.maps.LatLng(35.1553121, 129.0644697),
//         imgSrc: 'img/marker3.png',
//         imgSize: new kakao.maps.Size(232, 99),
//         imgPos: { offset: new kakao.maps.Point(116, 69) },
//         button: store[2]
//     }
// ]

let storeOptions = [
    {
        title: '본점 홍대',
        lating: new kakao.maps.LatLng(37.5556741, 126.9297811),
        imgSrc: 'img/content/content01.jpg',
        imgSize: new kakao.maps.Size(232, 99),
        imgPos: { offset: new kakao.maps.Point(116, 69) },
        button: store[0]
    }, {
        title: '삼청 지점',
        lating: new kakao.maps.LatLng(37.5793944, 126.9846224),
        imgSrc: 'img/content/content01.jpg',
        imgSize: new kakao.maps.Size(232, 99),
        imgPos: { offset: new kakao.maps.Point(116, 69) },
        button: store[1]
    }, {
        title: '부산 지점',
        lating: new kakao.maps.LatLng(35.1553121, 129.0644697),
        imgSrc: 'img/content/content01.jpg',
        imgSize: new kakao.maps.Size(232, 99),
        imgPos: { offset: new kakao.maps.Point(116, 69) },
        button: store[2]
    }
]
for (let i = 0; i < storeOptions.length; i++) {
    new kakao.maps.Marker({
        map: map,
        position: storeOptions[i].lating,
        title: storeOptions[i].title,
        image: new kakao.maps.MarkerImage(storeOptions[i].imgSrc, storeOptions[i].imgSize, storeOptions[i].imgPos)
    });
    storeOptions[i].button.addEventListener('click', e => {
        e.preventDefault();

        for (let j = 0; j < storeOptions.length; j++) {
            storeOptions[j].button.classList.remove('on');
        }
        storeOptions[i].button.classList.add('on');
        moveTo(storeOptions[i].lating);
    })
}
//이동할 위치값
function moveTo(target) {
    const moveLoad = target;
    map.setCenter(moveLoad);
}


window.addEventListener('resize', () => {
    const active_btn = document.querySelector('.store li.on');
    const active_index = active_btn.getAttribute('data-index');

    map.setCenter(storeOptions[active_index].lating);

})


//marker 
// var imageSrc = 'img/content/content01.jpg',
//     imageSize = new kakao.maps.Size(232, 99),
//     imageOption = { offset: new kakao.maps.Point(116, 69) };

// var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
//     markerPosition = new kakao.maps.LatLng(37.5116827, 127.0591512);

// let marker = new kakao.maps.Marker({
//     position: markerPosition,
//     image: markerImage
// });
// marker.setMap(map);

const bicycle = kakao.maps.MapTypeId.BICYCLE


//자전거
tr_on.addEventListener('click', e => {
    e.preventDefault();

    if (tr_on.classList.contains('on')) return;

    map.addOverlayMapTypeId(bicycle);
    tr_on.classList.add('on');
    tr_off.classList.remove('on');
});
tr_off.addEventListener('click', e => {
    e.preventDefault();

    map.removeOverlayMapTypeId(bicycle);
    tr_on.classList.remove('on');
    tr_off.classList.add('on');
});
//traffic
// tr_on.addEventListener('click', e => {
//     e.preventDefault();

//     if (tr_on.classList.contains('on')) return;

//     map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
//     tr_on.classList.add('on');
//     tr_off.classList.remove('on');
// });
// tr_off.addEventListener('click', e => {
//     e.preventDefault();

//     map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
//     tr_on.classList.remove('on');
//     tr_off.classList.add('on');
// });