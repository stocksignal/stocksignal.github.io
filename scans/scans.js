/*
{ID: 10, Name: "Major Stocks"}
{ID: 2, Name: "NSE Stocks"}
{ID: 3, Name: "BSE Stocks"}
{ID: 6, Name: "NSE FO"}
{ID: 8, Name: "Nifty 50"}
*/
const stocks = document.getElementById('stocklist');
function data(filter){
    let url = 'https://api.stockedge.com/Api/AlertsApi/GetSavedAlertsByType/2005/2021/04/05?relevantListings=' + filter;
    fetch(url)
        .then((res) => res.json())
        .then((out) => {
            let arr = out;
            stocks.innerHTML="";
            arr.forEach(ar => {
                var temp = `<div class="card">
                            <h3>${ar.Name} [${ar.Symb}]</h3>
                            <h4>${ar.Info.C1} (${ar.Info.C1ZG}%)</h4>
                            <p>Alert raised on : ${ar.Date.substr(0,10)}</p>
                            </div>`;
                stocks.insertAdjacentHTML('beforeend',temp);
            });
            

            console.log(arr);
        })
}

const check = document.getElementById('index');
check.addEventListener('change', () => {
    let filter = 10;
    if (check.checked == true) {
        filter = 8;
        data(8);
    } else {
        data(10);
    }
    
})

data(10);

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