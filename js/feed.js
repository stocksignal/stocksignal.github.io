function sharing(e){
    e.preventDefault();

    if (navigator.share) {
        navigator.share({
          title: 'Stock Signal',
          text: 'Open Interest, FII/DII Data, NIFTY50 Advances/Declines, IPO Details and much more. Now you can check change in Open Interest v/s Index price.',
          url:'https://stocksignal.github.io'
        })
        .catch(console.error);
      } else {
        str = e.target.value;
        const el = document.createElement('textarea');
        el.value = str;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        alert('Copied the link to clipboard');
      }

}
function newssharing(e){
  e.preventDefault();
    if (navigator.share) {
      let shareData = {
        title: 'Stock Signal',
        url: e.target.value,
        text: 'Newsfeed - '+e.path[2].children[2].value +' : '
      }
        navigator.share(shareData).then(() => {
          console.log('Thanks for sharing!');
        })
        .catch(console.error);
      } else {
        str = e.target.value;
        const el = document.createElement('textarea');
        el.value = str;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        alert('Copied the link to clipboard');
      }

}

function handledata(out){
    let arr = out;
    const newsfeed = document.getElementById('newsfeed');
    for(let i=0; i< 10; i++) {
        let time = arr[i].publishDate;
        let temptime = '&#8986; '+time.slice(11,16)+' ['+time.slice(0,10)+']';
        let temp = `<div class="newscard">
                        <img src="${arr[i].imageUrl}" alt="Newsfeed - StockSignal">
                    <div class="desc">
                        <a href="${arr[i].url}" target="_blank" rel="noopener noreferrer">${arr[i].title}</a>
                        <button style="display:none;" value="${arr[i].source}"></button>
                        <p id="time">${temptime}<button class="share" value="${arr[i].url}" onclick="newssharing(event)">Share &#x21b7;</button></p>
                    </div>
                    </div>`;
        newsfeed.insertAdjacentHTML('beforeend',temp);
    }
}


const url = 'https://oidata-server.onrender.com/api/newsfeed';
    fetch(url)
        .then(res => res.json())
        .then((out) => {
            handledata(out);
        })
        .catch(err => { throw err });