let urlParams = new URLSearchParams(window.location.search);
let loadingChart = document.getElementById('loading-chart')
let chart = document.getElementById('chart').getContext('2d')
let companyName = document.getElementById('company-name')
let price = document.getElementById('price')
let symbol = urlParams.get('symb')
let website = document.getElementById('website')
let chartDiv =document.getElementById('chartDiv')

getCompanyData()
getChart()

async function getCompanyData() {
    let response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`)
    let data = await response.json()
    let change = data.profile.changesPercentage
    change =parseFloat( change.slice(1,-1))
    if (!data.profile.image == '') {
        companyName.innerHTML = `<img src='${data.profile.image}' height="35">  ${data.profile.companyName} (${symbol})`    
    } else {
        companyName.innerHTML = `${data.profile.companyName} (${symbol})`
    }
    if (change >=0){
        price.innerHTML = `${data.profile.price} <span style="color:lightgreen;"> ${data.profile.changesPercentage}</span> `
    } else (
        price.innerHTML = `${data.profile.price} <span style="color:red;"> ${data.profile.changesPercentage}</span> `
    )
    if (data.profile.description) {
        description.innerHTML = ` <b>Description:</b> ${data.profile.description}`
    } else {
        description.innerHTML = ``
    }
    if (data.profile.website) {
        website.innerHTML = `<b>To visit ${data.profile.companyName}'s website, <a href="${data.profile.website}"> Click Here</a></b> `
    } else {

    }
}

async function getChart () {
    loadingChart.classList.add('spinner-border')
    chartDiv.classList.add('d-flex')
    chartDiv.classList.add('justify-content-center')
    let response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`)
    let chartData = await response.json() 
    let date = []
    let close = []
    for (let i = chartData.historical.length-1; i >= 0; i--) {
        date.push(chartData.historical[i].date)
        close.push(chartData.historical[i].close)
    }
    let progressChart = new Chart(chart, {
        type: 'line',
        data:{
            labels: date,
            datasets: [{
                label: 'Closing Price',
                data: close
            }]
        },
        options: {
            title:{
                display: true,
                text: `Closing Stock Price`,
                fontSize: 22
            },
            legend: {
                display:false
            }
        }
    } )
    loadingChart.classList.remove('spinner-border')
    chartDiv.classList.remove('d-flex')
    chartDiv.classList.remove('justify-content-center')
}

