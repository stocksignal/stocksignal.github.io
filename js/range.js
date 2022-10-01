const strike = [];
const calloi = [];
const putoi = [];
const myniftydata = [];

function getindexvalue(option) {
    const index = document.getElementById('index_value');

    fetch('https://oidata-server.herokuapp.com/api/indexdata')
        .then((res) => res.json())
        .then((out) => {
            if (option == 'niftyoichangedata') {
                index.innerHTML = '';
                index.innerHTML = out.nifty50.last_trade_price;
            } else if (option == 'bankniftyoichangedata') {
                index.innerHTML = '';
                index.innerHTML = out.niftybank.last_trade_price;
            } else {
                index.innerHTML = '';
            }
        });
}

function runoi(option) {
    getindexvalue(option);
    const url = 'https://oidata-server.herokuapp.com/api/' + option;
    fetch(url)
        .then(res => res.json())
        .then((out) => {

            var totalce = document.getElementById("totalce");
            var totalpe = document.getElementById("totalpe");
            var diffoi = document.getElementById("diffoi");
            let ce = 0, pe = 0;
            out.data.forEach(function (element) {
                ce = ce + element.calls_change_oi;
                pe = pe + element.puts_change_oi;
            });
            tce = ce;
            tpe = pe;
            doi = Math.abs(ce - pe);
            totalce.innerHTML = ce.toLocaleString('en-IN');
            totalpe.innerHTML = pe.toLocaleString('en-IN');
            diffoi.innerHTML = doi.toLocaleString('en-IN');

            var signal = document.getElementById('signal');
            if (doi > 5000000 && tpe > tce) {
                signal.innerText = "";
                signal.innerHTML = "Bullish";
                signal.style.color = 'var(--put)';

            } else if (doi > 5000000 && tce > tpe) {
                signal.innerText = "";
                signal.innerHTML = "Bearish";
                signal.style.color = 'var(--call)';
            } else {
                signal.innerHTML = "Neutral";
                signal.style.color = 'var(--font-color)';
            }

            //chart code
            let arr = out.data;
            for (let i = 0; i < arr.length; i++) {
                strike[i] = arr[i].strike_price
                calloi[i] = arr[i].calls_change_oi
                putoi[i] = arr[i].puts_change_oi
            }
            let ctx = document.getElementById('myChart');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: strike,
                    datasets: [{
                        label: 'Change in Call OI',
                        data: calloi,
                        borderWidth: 1,
                        backgroundColor: "rgb(224, 36, 33)",
                    },
                    {
                        label: 'Change in Put OI',
                        data: putoi,
                        backgroundColor: "rgb(33, 173, 20)",
                        borderWidth: 1
                    }]
                },
                options: {
                    maintainAspectRatio:
                        false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                }
            });
        })
        .catch(err => { throw err });
}

function changeoi(that) {
    if (that.value == 'niftyoichangedata') {
        localStorage.setItem('index', 'niftyoichangedata');
        localStorage.setItem('index1', 'nifty');
    } else if (that.value == 'bankniftyoichangedata') {
        localStorage.setItem('index', 'bankniftyoichangedata');
        localStorage.setItem('index1', 'banknifty');
    }
    // window.location.reload();
    runoi(that.value);
}

var option = localStorage.getItem('index');
if (!option) {
    localStorage.setItem('index', 'niftyoichangedata');
    localStorage.setItem('index1', 'nifty');
    var option = localStorage.getItem('index');
}
document.getElementById('index').value = option;
runoi(option);

function showChart() {
    localStorage.setItem('chart', 'oi');
    document.getElementById('pcrcontainer').style.display = 'none';
    document.getElementById('oichartcontainer').style.display = 'none';
    document.getElementById('ccontainer').style.display = 'block';

}

function hideChart() {
    localStorage.setItem('chart', 'pcr');
    document.getElementById('ccontainer').style.display = 'none';
    document.getElementById('oichartcontainer').style.display = 'none';
    document.getElementById('pcrcontainer').style.display = 'block';
}

function showoiChart() {
    localStorage.setItem('chart', 'oiindex');
    document.getElementById('ccontainer').style.display = 'none';
    document.getElementById('pcrcontainer').style.display = 'none';
    document.getElementById('oichartcontainer').style.display = 'block';
}

var chartx = localStorage.getItem('chart');
if (!chartx) {
    localStorage.setItem('chart', 'oi');
    showChart();
} else if (chartx == 'oi') {
    showChart();
}
else if (chartx == 'pcr') {
    hideChart();
}
else if (chartx == 'oiindex') {
    showoiChart();
}