function sharing(e){
    e.preventDefault();

    str = e.target.value;
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert('Copied the link to clipboard');

}
function handledata(out){
    let arr = out.resultData;
    const newsfeed = document.getElementById('newsfeed');
    for(let i=0; i< 10; i++) {
        let description = arr[i].description;
        let tempdesc = description.slice(0,100)+'...';
        let time = arr[i].publishDate;
        let temptime = '&#8986; '+time.slice(11,16)+' ['+time.slice(0,10)+']';
        let temp = `<div class="newscard">
                    <img src="${arr[i].imageUrl}">
                    <div class="desc">
                        <a href="${arr[i].url}" target="_blank">${arr[i].title}</a>
                        <p id="description">${tempdesc}</p>
                        <p id="time">${temptime}<button id="share" value="${arr[i].source}: ${arr[i].url}" onclick="sharing(event)">Share &#x21b7;</button></p>
                    </div>
                    </div>`
        newsfeed.insertAdjacentHTML('beforeend',temp);
    }
}


const url = 'https://api.niftytrader.in/api/Resources/GetRssFeedDataHome';
    fetch(url)
        .then(res => res.json())
        .then((out) => {
            handledata(out);
        })
        .catch(err => { throw err });

