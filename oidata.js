
function getpricecolor(){
    var theme = localStorage.getItem('theme');
    if(theme == 'dark'){
        return 'rgb(164, 190, 243)'
    } else{
        return 'rgb(52, 67, 188)'
    }
}

function makechart(time,tce,tpe,price){
    let oichart = document.getElementById('oiChart');
    
    var indexdata = {
        type: 'line',
        label: 'Index Price',
        data: price,
        backgroundColor: 'transparent',
        borderColor: getpricecolor(),
        yAxisID: "y-axis-pcr"
    };

    var calloidata = {
        type: 'line',
        label: 'Total CE',
        data: tce,
        backgroundColor: 'transparent',
        borderColor: 'rgba(43,135,65,0.7)',
        yAxisID: "y-axis-price",
        borderDash: [5, 5]
    };
    var putoidata = {
        type: 'line',
        label: 'Total PE',
        data: tpe,
        backgroundColor: 'transparent',
        borderColor: 'rgba(135,35,35,0.7)',
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
            line:{
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

function getoidata(){
    var index = localStorage.getItem('index');
    if (index == 'niftyoichangedata'){
        let url = 'https://oidata-server.herokuapp.com/oidata/niftyoi';
        fetch(url)
        .then((res) => res.json())
            .then((out) => {
                let arr = out;
                let time = [];
                let price = [];
                let tce = [];
                let tpe = [];
                
                for(let i=0; i<arr.length; i++){
                    // if(i%3==0){
                    if(true){
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
                }
                makechart(time,tce,tpe,price);
                populatetable(out);
            })
    } else if( index == 'bankniftyoichangedata'){
        let url = 'https://oidata-server.herokuapp.com/oidata/bankniftyoi';
        fetch(url)
        .then((res) => res.json())
            .then((out) => {
                let arr = out;
                let time = [];
                let price = [];
                let tce = [];
                let tpe = [];
                
                for(let i=0; i<arr.length; i++){
                    // if(i%3==0){/
                    if(true){
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
                }
                makechart(time,tce,tpe,price);
                populatetable(out);
            });
    }
}

getoidata();

document.querySelector('.theme-switch input[type="checkbox"]').addEventListener('click',()=>{
    getoidata();
})

function populatetable(out){
    let arr = [];
    for(let i=0; i<out.length; i++){
        // if(i%3==0){
        if(true){
            arr.push(out[i]);
        }
    }
    let rows = document.getElementById('oirows');
    rows.innerHTML='';

    let arrx = arr.reverse();
    var index = localStorage.getItem('index');
    if (index == 'niftyoichangedata'){
        for(let i=0; i<arrx.length; i++){
            let data = arrx[i].niftyoi;
            let ce = 0, pe = 0;
            data.forEach(d => {
                ce = ce + d.calls_change_oi;
                pe = pe + d.puts_change_oi;
            });
            diff = pe-ce;
            var temp = `<tr><td>${converttoist(arrx[i].timestamp)}</td>
            <td>${ce}</td><td>${pe}</td>
            ${diff<0? `<td style="color:var(--put);">${diff}</td>` : `<td style="color:var(--call);">${diff}</td>`}
            ${diff<0? '<td style="color:var(--put);">SELL</td>' : '<td style="color:var(--call);">BUY</td>'}
            ${diff<0? `<td style="color:var(--put);">${arrx[i].cmp}</td>` :`<td style="color:var(--call);">${arrx[i].cmp}</td>`}</tr>`;
            rows.insertAdjacentHTML('beforeend',temp);
        }
    } else if( index == 'bankniftyoichangedata'){
        for(let i=0; i<arrx.length; i++){
            let data = arrx[i].bankniftyoi;
            let ce = 0, pe = 0;
            data.forEach(d => {
                ce = ce + d.calls_change_oi;
                pe = pe + d.puts_change_oi;
            });
            diff = pe-ce;
            var temp = `<tr><td>${converttoist(arrx[i].timestamp)}</td>
            <td>${ce}</td><td>${pe}</td>
            ${diff<0? `<td style="color:var(--put);">${diff}</td>` : `<td style="color:var(--call);">${diff}</td>`}
            ${diff<0? '<td style="color:var(--put);">SELL</td>' : '<td style="color:var(--call);">BUY</td>'}
            ${diff<0? `<td style="color:var(--put);">${arrx[i].cmp}</td>` :`<td style="color:var(--call);">${arrx[i].cmp}</td>`}</tr>`;
            rows.insertAdjacentHTML('beforeend',temp);
        }

    }


}

function converttoist(mytime){
    var myDate = new Date(mytime);
    if(myDate.getMinutes() == 0){
        let strdate = myDate.getHours().toString() +" : "+ myDate.getMinutes().toString()+'0';
        return(strdate);
    }
    let strdate = myDate.getHours().toString() +" : "+ myDate.getMinutes().toString();
    return(strdate);
}
