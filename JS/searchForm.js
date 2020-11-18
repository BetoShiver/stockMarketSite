class SearchForm {

    constructor(div) {
        div.innerHTML = ` 
        <div class="container">
            <div  class="row search-area  bg-light rounded">
                <div id="searchHeader" class="col-12 col-lg-5 h4 my-3 d-flex justify-content-center">
                    Please Type Company Symbol
                </div>
                <form id="form" class="col-8 col-lg-4 input-group">
                    <input  autocomplete="off" name:"searchQuery" id="searchQuery" type="text" class="search-query form-control my-3">
                    <div class="input-group-append">
                        <button id="searchBtn" class="query-btn rounded btn btn-outline-secondary bg-warning my-3"
                            type="submit">
                            Search
                        </button>
                    </div>
                </form>
                <div class="col-3 col-lg-1 my-2 ml-2">
                    <div id="loading"></div>
                </div>
            </div>
        </div>`
        this.loading = document.getElementById('loading')
    }

    async getCompanies(param) {
        this.loading.classList.add('spinner-border')
        let res = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${param}&limit=10&exchange=NASDAQ`)
        let data = await res.json()
        this.loading.classList.remove('spinner-border')
        return data
    }

    async onSearch(funct) {
        let debounceTimeout

        searchQuery.addEventListener('input', () => {

            if (debounceTimeout) {
                clearTimeout(debounceTimeout)
            }
            debounceTimeout = setTimeout(() => {
                this.getCompanies(searchQuery.value)
                    .then((data) => {
                        funct(data)
                    })
            }, 2000)
        })

        searchBtn.addEventListener("click", (e) => {
            if (debounceTimeout) {
                clearTimeout(debounceTimeout)
            }
            let companies = e
            companies.preventDefault()
            this.getCompanies(searchQuery.value)
                .then((data) => {
                    funct(data)
                })
            window.history.pushState({}, '', `?query=${searchQuery.value}`)
        })

        window.addEventListener('load', async () => {
            let urlParams = new URLSearchParams(window.location.search);
            let pastQuery = urlParams.get('query')
            if (pastQuery) {
                searchQuery.value = pastQuery
                this.getCompanies(pastQuery)
                    .then((data) => {
                        funct(data)
                    })
            }
        })

    }
}

