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
    for (let i =0; i< 10; i++) {
        let results =[]
        results[i] = document.createElement('li')
        results[i].innerHTML = `<a href="./company.html">${data[i].name} (${data[i].symbol})</a>`
        resultsList.appendChild(results[i])
    }

}

searchBtn.addEventListener("click", showResult )
