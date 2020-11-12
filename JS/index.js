let searchBtn = document.getElementById('searchBtn')
let searchQuery = document.getElementById('searchQuery')
let results = document.getElementById('results')
let loading = document.getElementById('loading')
let resultsList = document.getElementById('resultsList')


let showResult = async () => {
    loading.classList.add('spinner-border')
    let res = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchQuery.value}&limit=10&exchange=NASDAQ`)
    let data = await res.json()
    loading.classList.remove('spinner-border')
    resultsList.innerHTML = ''
    for (let i = 0; i < 10; i++) {
        var res2 = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${data[i].symbol}`)

        let data2 = await res2.json()
        let results = []
        let change = data2.profile.changesPercentage
        change = parseFloat(change.slice(1, -1))
        results[i] = document.createElement('li')
        if (change >= 0) {
            results[i].innerHTML = `<img src='${data2.profile.image}' height="35"> <a href="./company.html?symb= ${data[i].symbol}"> ${data[i].name} (${data[i].symbol})</a><span style="color:lightgreen;"> ${data2.profile.changesPercentage}</span> `
        } else {
            results[i].innerHTML = `<img src='${data2.profile.image}' height="35"> <a href="./company.html?symb= ${data[i].symbol}"> ${data[i].name} (${data[i].symbol})</a><span style="color:red;"> ${data2.profile.changesPercentage}</span> `
        }
        resultsList.appendChild(results[i])
    }
}


searchBtn.addEventListener("click", showResult)
