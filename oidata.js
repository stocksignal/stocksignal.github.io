function getpricecolor(){
    var theme = localStorage.getItem('theme');
    if(theme == 'dark'){
        return 'rgb(255,255,0)'
    } else{
        return 'rgb(0,0,255)'
    }
}
function makechart(time,diffoi,price){
    let oichart = document.getElementById('pcrChart');
    
    var indexdata = {
        label: 'Index Price',
        data: price,
        backgroundColor: 'transparent',
        borderColor: getpricecolor(),
        yAxisID: "y-axis-pcr"
    };

    var diffoidata = {
        label: 'Total CE - PE OI',
        data: diffoi,
        backgroundColor: 'transparent',
        borderColor: 'rgb(43,135,65)',
        yAxisID: "y-axis-price"
    };

    var oichartdata = {
        labels: time,
        datasets: [indexdata, diffoidata],
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        stacked: false,
    };

    var chartOptions = {
        maintainAspectRatio:
                false,
        scales: {
            xAxes: [{
                barPercentage: 1,
                categoryPercentage: 0.6
            }],
            yAxes: [{
                id: "y-axis-pcr",
                position: "left",
            }, {
                id: "y-axis-price",
                position: "right",
            }]
        }
    };

    new Chart(oichart, {
        type: 'line',
        data: oichartdata,
        options: chartOptions
    });

   
}
function getoidata(){
let url = 'https://oidata-server.herokuapp.com/oidata/niftyoi';
fetch(url)
.then((res) => res.json())
        .then((out) => {
            let arr = out;
            let time = [];
            let price = [];
            let diffoi = [];
            
            arr.forEach(ar => {
                price.push(ar.cmp);
                let data = ar.niftyoi;
                time.push(ar.timestamp.slice(11,16));
                let ce = 0, pe = 0;
                data.forEach(d => {
                    ce = ce + d.calls_change_oi;
                    pe = pe + d.puts_change_oi;
                });
                diffoi.push(ce-pe);
            });
            makechart(time,diffoi,price);

        })
}
getoidata();

document.querySelector('.theme-switch input[type="checkbox"]').addEventListener('click',()=>{
    getoidata();
})