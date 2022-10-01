const mdata = document.getElementById('mdata');

function advance(){
    let url = 'https://oidata-server.herokuapp.com/api/getadvancedecline';
    fetch(url)
    .then((res) => res.json())
    .then((out) => {
        let arr = out;
        let addata = [];
        addata[0] = arr.AdvancedCount;
        addata[1] = arr.DeclinedCount;
        let ctx = document.getElementById('adChart');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [
                    'Advance',
                    'Decline',
                  ],
                  datasets: [{
                    label: 'NIFTY 50 Advances & Declines',
                    data: addata,
                    borderWidth: 0,
                    backgroundColor: ['rgb(43,135,65)',
                      'rgb(133,62,187)'
                    ],
                    hoverOffset: 4
                  }]
            },
            options: {
                maintainAspectRatio:
                    false,
                title: {
                      display: true,
                      text: 'NIFTY 50 Advances & Declines'
                    }
            }
        });
    })
}

function fiidata() {
    let url = 'https://oidata-server.herokuapp.com/api/fiidata';
    fetch(url)
        .then((res) => res.json())
        .then((out) => {
            let arr = out;
            let date = [];
            let fiicash = [];
            let diicash = [];
            let price = [];
            mdata.innerHTML= "";
            var temp = `<div class="nifty">${arr[0].ClosePrices[0].Symbol} : ${arr[0].ClosePrices[0].Close}</div>
            <em class="emtext">(Updated at : ${arr[0].Date.substr(0,10)})</em>`;
            mdata.insertAdjacentHTML('beforeend',temp);
            for (let i = 0; i < arr.length; i++) {
                date.push(arr[i].Date.substr(0,10));
                fiicash.push(arr[i].FIICashMarketNet);
                diicash.push(arr[i].DIICashMarketNet);
                price.push(arr[i].ClosePrices[0].Close);
            }
            let ctx = document.getElementById('fiiChart');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: date.reverse(),
                    datasets: [{
                        label: 'FII in Crores',
                        data: fiicash.reverse(),
                        borderWidth: 4,
                        borderColor: "rgb(133,62,187)",
                        backgroundColor: "rgba(230,230,0,0)",
                    },{
                        label: 'DII in Crores',
                        data: diicash.reverse(),
                        borderWidth: 4,
                        borderColor: "rgb(43,135,65)",
                        backgroundColor: "rgba(45,80,250,0)",
                    }]
                },
                options: {
                    maintainAspectRatio:
                        false,
                }
            });
        })
}


const stocks = document.getElementById('stocklist');
function data(filter){
    let url = 'https://api.stockedge.com/Api/AlertsApi/GetSavedAlertsByType/2005?relevantListings=' + filter;
    fetch(url)
        .then((res) => res.json())
        .then((out) => {
            let arr = out;
            stocks.innerHTML="";
            arr.forEach(ar => {
                var temp = `<div class="card">
                            <h3>${ar.Name} <span>${ar.Symb} </span></h3>
                            <h4>LTP : ${ar.Info.C1} (${ar.Info.C1ZG}%)</h4>
                            <p>Alert raised on : ${ar.Date.substr(0,10)}</p>
                            </div>`;
                stocks.insertAdjacentHTML('beforeend',temp);
            });
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



//start functions
fiidata();
advance();
data(10);
