class SearchResult extends SearchForm {
    constructor(div) {
        super(div)
        this.loading = document.getElementById('loading')
        this.resultsList = document.getElementById('resultsList')
    }

    async renderResults(companies) {
        this.loading.classList.add('spinner-border')
        let res = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${this.searchQuery.value}&limit=10&exchange=NASDAQ`)
        let data = await res.json()
        this.loading.classList.remove('spinner-border')
        this.resultsList.innerHTML = ''
        if (data.length === 0) {
            let noResult = document.createElement('li')
            noResult.innerHTML = `<b class='h2'>No Results Found</b>`
            this.resultsList.appendChild(noResult)
            return
        }
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
            this.resultsList.appendChild(results[i])
        }
    }
}
