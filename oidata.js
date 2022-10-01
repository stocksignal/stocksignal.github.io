function makechart(time, tce, tpe, price) {
    let oichart = document.getElementById('oiChart');

    var indexdata = {
        type: 'line',
        label: 'Index Price',
        data: price,
        backgroundColor: 'transparent',
        borderColor: 'rgb(52, 67, 188)',
        borderWidth: 2,
        yAxisID: "y-axis-pcr"
    };

    var calloidata = {
        type: 'line',
        label: 'Total CE',
        data: tce,
        backgroundColor: 'transparent',
        borderColor: 'rgba(135,35,35,0.7)',
        borderWidth: 2,
        yAxisID: "y-axis-price",
        borderDash: [5, 5]
    };
    var putoidata = {
        type: 'line',
        label: 'Total PE',
        data: tpe,
        backgroundColor: 'transparent',
        borderColor: 'rgba(43,135,65,0.7)',
        borderWidth: 2,
        yAxisID: "y-axis-price",
        borderDash: [5, 5]
    };

    var oichartdata = {
        labels: time,
        datasets: [indexdata, calloidata, putoidata],
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
        elements: {
            point: {
                radius: 0,
                hoverRadius: 4,
            },
            line: {
                tension: 0.1
            }
        },
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

function getoidata() {
    var index = localStorage.getItem('index');
    if (index == 'niftyoichangedata') {
        let url = 'https://oidata-server.herokuapp.com/oidata/niftyoi';
        fetch(url)
            .then((res) => res.json())
            .then((out) => {
                let arr = out;
                let time = [];
                let price = [];
                let tce = [];
                let tpe = [];

                for (let i = 0; i < arr.length; i++) {
                    price.push(arr[i].cmp);
                    let data = arr[i].niftyoi;
                    time.push(converttoist(arr[i].timestamp));
                    let ce = 0, pe = 0;
                    data.forEach(d => {
                        ce = ce + d.calls_change_oi;
                        pe = pe + d.puts_change_oi;
                    });
                    tce.push(ce);
                    tpe.push(pe);
                }
                makechart(time, tce, tpe, price);
                populatetable(out);
            })
    } else if (index == 'bankniftyoichangedata') {
        let url = 'https://oidata-server.herokuapp.com/oidata/bankniftyoi';
        fetch(url)
            .then((res) => res.json())
            .then((out) => {
                let arr = out;
                let time = [];
                let price = [];
                let tce = [];
                let tpe = [];

                for (let i = 0; i < arr.length; i++) {
                    price.push(arr[i].cmp);
                    let data = arr[i].bankniftyoi;
                    time.push(converttoist(arr[i].timestamp));
                    let ce = 0, pe = 0;
                    data.forEach(d => {
                        ce = ce + d.calls_change_oi;
                        pe = pe + d.puts_change_oi;
                    });
                    tce.push(ce);
                    tpe.push(pe);
                }
                makechart(time, tce, tpe, price);
                populatetable(out);
            });
    }
}

function get_total_ce_pe_oi(oidata) {

    let ce = 0, pe = 0;
    oidata.forEach(d => {
        ce = ce + d.calls_change_oi;
        pe = pe + d.puts_change_oi;
    });
    return [ce, pe];
}

function populatetable(data) {

    let rows = document.getElementById('oirows');
    rows.innerHTML = '';

    var index = localStorage.getItem('index');

    if (index == 'niftyoichangedata') {

        for (let i = 0; i < data.length; i++) {

            let [prev_tce, prev_tpe] = [0, 0];
    
            let oidata = data[i].niftyoi;
            let [tce, tpe] = get_total_ce_pe_oi(oidata)
    
            if (i > 0) {
                let prev_oidata = data[i-1].niftyoi;
                [prev_tce, prev_tpe] = get_total_ce_pe_oi(prev_oidata)
            }

            let ce_change = tce - prev_tce;
            let pe_change = tpe - prev_tpe;

            let signal = "NEUTRAL";

            if(ce_change > 0 && pe_change < 0){
                signal = "SELL"
            } else if(ce_change < 0 && pe_change > 0){
                signal = "BUY"
            }

            var temp = `<tr>
            <td>${converttoist(data[i].timestamp)}</td>
            <td>${data[i].cmp}</td>
            <td style="color:var(--${ce_change > pe_change ? "call" : "put"});">${ce_change.toLocaleString('en-IN')}</td>
            <td style="color:var(--${ce_change > pe_change ? "call" : "put"});">${pe_change.toLocaleString('en-IN')}</td>
            <td>${signal}</td>`;
            rows.insertAdjacentHTML('afterend', temp);

        }
    } 
    else if (index == 'bankniftyoichangedata') {

        for (let i = 0; i < data.length; i++) {

            let [prev_tce, prev_tpe] = [0, 0];
    
            let oidata = data[i].bankniftyoi;
            let [tce, tpe] = get_total_ce_pe_oi(oidata)
    
            if (i > 0) {
                let prev_oidata = data[i-1].bankniftyoi;
                [prev_tce, prev_tpe] = get_total_ce_pe_oi(prev_oidata)
            }

            let ce_change = tce - prev_tce
            let pe_change = tpe - prev_tpe
            let signal = "NEUTRAL"

            if(ce_change > 0 && pe_change < 0){
                signal = "SELL"
            } else if(ce_change < 0 && pe_change > 0){
                signal = "BUY"
            }

            var temp = `<tr>
            <td>${converttoist(data[i].timestamp)}</td>
            <td>${data[i].cmp}</td>
            <td style="color:var(--${ce_change > pe_change ? "call" : "put"});">${ce_change.toLocaleString('en-IN')}</td>
            <td style="color:var(--${ce_change > pe_change ? "call" : "put"});">${pe_change.toLocaleString('en-IN')}</td>
            <td>${signal}</td>`;
            rows.insertAdjacentHTML('afterend', temp);

        }
    }
}

function converttoist(mytime) {
    var myDate = new Date(mytime);
    if (myDate.getMinutes() == 0) {
        let strdate = myDate.getHours().toString() + " : " + myDate.getMinutes().toString() + '0';
        return (strdate);
    }
    let strdate = myDate.getHours().toString() + " : " + myDate.getMinutes().toString();
    return (strdate);
}


getoidata();
