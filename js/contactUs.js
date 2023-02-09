const mapCont = document.getElementById('map')// 지도를 표시할 div 
const tr_on = document.querySelectorAll('.traffic li')[0];
const tr_off = document.querySelectorAll('.traffic li')[1];
const store = document.querySelectorAll('.store li');

var options = {
    center: new kakao.maps.LatLng(37.5556741, 126.9297811), // 지도의 중심좌표
    level: 3 // 지도의 확대 레벨
};
// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
const map = new kakao.maps.Map(mapCont, options);

window.addEventListener('resize', () => {
    const active_btn = document.querySelector('.store li.on');
    const active_index = active_btn.getAttribute('data-index');
    map.setCenter(storeOptions[active_index].lating);
})

let storeOptions = [
    {
        title: '본점 홍대',
        lating: new kakao.maps.LatLng(37.5116827, 127.0591512),
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


// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
// var mapTypeControl = new kakao.maps.MapTypeControl();

// // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
// //kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
// map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
// var zoomControl = new kakao.maps.ZoomControl();
// map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);


// // 지도타입 컨트롤의 지도 또는 스카이뷰 버튼을 클릭하면 호출되어 지도타입을 바꾸는 함수입니다
// function setMapType(maptype) { 
//     var roadmapControl = document.getElementById('btnRoadmap');
//     var skyviewControl = document.getElementById('btnSkyview'); 
//     if (maptype === 'roadmap') {
//         map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);    
//         roadmapControl.className = 'selected_btn';
//         skyviewControl.className = 'btn';
//     } else {
//         map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);    
//         skyviewControl.className = 'selected_btn';
//         roadmapControl.className = 'btn';
//     }
// }

// // 지도 확대, 축소 컨트롤에서 확대 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
// function zoomIn() {
//     map.setLevel(map.getLevel() - 1);
// }

// // 지도 확대, 축소 컨트롤에서 축소 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
// function zoomOut() {
//     map.setLevel(map.getLevel() + 1);
// }