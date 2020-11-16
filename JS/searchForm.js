class SearchForm {

    constructor(div) {
        this.searchBtn = document.getElementById('searchBtn')
        this.searchQuery = document.getElementById('searchQuery')
    }

    async onSearch(funct){
        this.searchBtn.addEventListener("click", funct)
    }
}
 