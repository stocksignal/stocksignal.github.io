function getcolor(){
    var theme = localStorage.getItem('theme');
    if(theme == 'dark'){
        return 'rgb(255,255,0)'
    } else{
        return 'rgb(0,0,255)'
    }
}
function makechart(time,diffoi){
    let oichart = document.getElementById('pcrChart');
    new Chart(oichart, {
        type: 'line',
        data: {
            labels: time,
            datasets: [{
                label: 'Difference in OI',
                data: diffoi,
                borderWidth: 2,
                backgroundColor: 'transparent',
                borderColor: getcolor(),
            }],
        },
        options: {
            elements:{
                line:{
                    tension: 0.4
                },
                point:{
                    fill: true,
                    radius: 0,
                    hoverRadius: 5,
                },
            },
            
            maintainAspectRatio:
                false,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
        }
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
                let data = ar.niftyoi;
                time.push(ar.timestamp.slice(11,16));
                let ce = 0, pe = 0;
                data.forEach(d => {
                    ce = ce + d.calls_change_oi;
                    pe = pe + d.puts_change_oi;
                });
                diffoi.push(pe-ce);
            });
            makechart(time,diffoi);
        })
}
getoidata();

document.querySelector('.theme-switch input[type="checkbox"]').addEventListener('click',()=>{
    getoidata();
})