const upipo = document.getElementById('upipo');
const onipo = document.getElementById('onipo');
const details = document.getElementById('details');

upipo.addEventListener('click', () => {
    let url = 'https://api.stockedge.com/Api/IPODashboardApi/GetUpcomingIPOs?page=1&pageSize=10&lang=en';
    fetch(url)
        .then((res) => res.json())
        .then((out) => {
            let arr = out;
            details.innerText = '';
            if (arr.length <= 0) {
                details.innerHTML = "No upcoming IPO";
            } else {
                arr.forEach(ar => {
                    var temp = `<div class="card">
                <div class="title">${ar.SecurityName}</div>
                    <div class="info">
                        <ul>
                            <li>Price Band: ${ar.IssuePriceMin} - ${ar.IssuePriceMax}</li>
                            <li>Close Date: ${ar.OpenDate.substr(0, 10)}</li>
                            <li>Close Date: ${ar.CloseDate.substr(0, 10)}</li>
                        </ul>
                    </div>
                </div>`;
                    details.insertAdjacentHTML('beforeend', temp);
                });
            }




        }).catch((error) => { console.log(error) });


})
onipo.addEventListener('click', () => {
    let url = 'https://api.stockedge.com/Api/IPODashboardApi/GetOngoingIPOs';
    fetch(url)
        .then((res) => res.json())
        .then((out) => {
            let arr = out;
            details.innerText = '';
            if (arr.length <= 0) {
                details.innerHTML = "No ongoing IPO";
            } else {
                arr.forEach(ar => {
                    var temp = `<div class="card">
                <div class="title">${ar.SecurityName}</div>
                    <div class="info">
                        <ul>
                        ${ar.IssuePriceMax ?
                            `<li>Price Band: ${ar.IssuePriceMin} - ${ar.IssuePriceMax}</li>` : `<li>Price : ${ar.IssuePriceMin}</li>`}
                            <li>Close Date: ${ar.OpenDate.substr(0, 10)}</li>
                            <li>Close Date: ${ar.CloseDate.substr(0, 10)}</li>
                        </ul>
                    </div>
                </div>`;
                    details.insertAdjacentHTML('beforeend', temp);
                });
            }

        }).catch((error) => { console.log(error) });
})





/*navbar*/
const menu = document.getElementById('menu');
const close = document.getElementById('close');
const nav = document.getElementById('navtabs');
menu.addEventListener('click', () => {
    nav.style.display = 'block';
    menu.style.display = 'none';
    close.style.display = 'block';
})
close.addEventListener('click', () => {
    nav.style.display = 'none';
    close.style.display = 'none';
    menu.style.display = 'block';
})
/*navbar*/