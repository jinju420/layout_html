const vids = document.querySelector('.vids');
const key = 'AIzaSyBGee4MUXU3jusXj7YwDBzdXI5Sn3gAkIA';
const playlistId = 'PLY0voYdGZtAgPCRyH8libB1_TbuzvCR_a';
const num = 7;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults${num}`;


fetch(url)
    .then((data) => {
        return data.json();
    })
    .then((json) => {
        let items = json.items;
        console.log(items);

        let result = '';

        items.map((el) => {

            let title = el.snippet.title;
            let des = el.snippet.description;
            let date = el.snippet.publishedAt;

            if (title.length > 30) title = title.substr(0, 20) + '...';
            if (des.length > 100) des = des.substr(0, 45) + '...';
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

vids.addEventListener('click', e => {
    e.preventDefault();


    const vidId = e.target.closest('a').getAttrubute('href');
    let popup = document.createElement('figure');

    popup.classList.add('videoPop');
    popup.innerHTML = `
    <iframe src='https://www.youtube.com/embed/${vidId}' frameborder='0' width='100%' height='100%' allowfullscreen>
    <span class="closeBtn">
        <a href='#'>close</a>
    </span>
    `;

    vids.append(popup);
})


vids.addEventListener('click', e => {
    const popClose = document.querySelector('.popup');

    if (popup) {
        const close = popup.querySelector('.closeBtn');
        if (e.target == close) popup.remove();
    }
})