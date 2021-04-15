const mdata = document.getElementById('mdata');
const ca = document.getElementById('csv-display');

function fiidata() {
    let url = 'https://api.stockedge.com/Api/FIIDashboardApi/getLatestSevenDaysFIIActivities?lang=en';
    fetch(url)
        .then((res) => res.json())
        .then((out) => {
            let arr = out;
            mdata.innerHTML= "";
            for (let i = 0; i < 6; i++) {
                var temp = `<div class="fiicard">
                            <p>${arr[i].Date.substr(0,10)}</p>
                            <div class="fiicard-inside">
                                <div class="card-inside">
                                    <p>Cash Market</p>
                                    <h4>FII : ${arr[i].FIICashMarketNet}<br>DII : ${arr[i].DIICashMarketNet}</h4>
                                </div>
                                <div class="card-inside">
                                    <p>FII on Index</p>
                                    <h4>Futures : ${arr[i].FIIIndexFutureNet}<br>Options : ${arr[i].FIIIndexOptionNet}</h4>
                                </div>
                                <div class="card-inside">
                                    <p>FII on Stocks</p>
                                    <h4>Futures : ${arr[i].FIIStockFutureNet}<br>Options : ${arr[i].FIIStockOptionNet}</h4>
                                </div>
                            </div>
                            </div>`;
                mdata.insertAdjacentHTML('beforeend',temp);
            }
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
                            <h3>${ar.Name} [${ar.Symb}]</h3>
                            <h4>${ar.Info.C1} (${ar.Info.C1ZG}%)</h4>
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

//corporate actions data
function csvToJSON(csv, delimiter) {
    var lines = csv.split("\n");
    var result = [];
    var headers;
    headers = lines[0].split(delimiter);

    for (var i = 1; i < lines.length; i++) {
        var obj = {};

        if(lines[i] == undefined || lines[i].trim() == "") {
            continue;
        }

        var words = lines[i].split(",");
        for(var j = 0; j < words.length; j++) {
            obj[headers[j].trim()] = words[j];
        }

        result.push(obj);
    }
    return result;
}
  

function getarraydata(res){
    let word_array = csvToJSON(res,',');
    console.log(word_array);
    ca.innerHTML = "";
    word_array.forEach(arr => {
        var temp = `<div class="ca-card">
        <h3>${arr.company.slice(1,arr.company.length-1)} : [${arr.symbol.slice(1,arr.symbol.length-1)}]</h3>
        <p>${arr.purpose.slice(2,arr.purpose.length-1)}</p>
        <p id="dates">Ex-Date: ${arr.ex_date.slice(1,arr.ex_date.length-1)}<br>
        Record Date: ${arr.record_date.slice(1,arr.record_date.length-1)}</p>
        </div>`;
    ca.insertAdjacentHTML('beforeend',temp);
    });
}
$.ajax({
    url: "/data/cadata.csv",
    async: true,
    success: function(response){ 
        getarraydata(response)
    },
    dataType: "text"
});


//start functions
fiidata();
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