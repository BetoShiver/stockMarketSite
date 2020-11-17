class SearchForm {



    constructor(div) {
        div.innerHTML = ` 
        <div class="container">
            <div  class="row search-area  bg-light rounded">
                <div id="searchHeader" class="col-12 col-lg-5 h4 my-3 d-flex justify-content-center">
                    Please Type Company Symbol
                </div>
                <form class="col-8 col-lg-4 input-group">
                    <input  autocomplete="off" name:"searchQuery" id="searchQuery" type="text" class="search-query form-control my-3">
                    <div class="input-group-append">
                        <button id="searchBtn" class="query-btn rounded btn btn-outline-secondary bg-warning my-3"
                            type="submit">
                            Search
                        </button>
                    </div>
                </form>
                <div class="col-3 col-lg-1 my-2 ml-2">
                    <span id="loading"></span>
                </div>
            </div>
        </div>`
    }

    async onSearch(funct) {
        let companies = searchQuery.value
        searchBtn.addEventListener("click", funct)
    }
}
