class SearchForm {
  constructor(div) {
    div.innerHTML = ` 
        <div class="container">
            <div  class="row search-area  bg-light rounded">
                <div id="searchHeader" class="col-12 col-lg-6 h4 my-3 d-flex justify-content-center">
                    Please Type Company Symbol
                </div>
                <form id="form" class="col-8 col-lg-4 input-group">
                    <input  autocomplete="off" name:"searchQuery" id="searchQuery" type="text" class="search-query form-control my-3 rounded">
                    <div class="input-group-append">
                        <button id="searchBtn" class="rounded btn btn-outline-secondary bg-warning my-3 ml-2"
                            type="submit">
                            Search
                        </button>
                    </div>
                </form>
                <div class="col-3 col-lg-1 my-2 ml-2">
                    <div id="loading"></div>
                </div>
            </div>
        </div>`;
    this.loading = document.getElementById("loading");
  }

  async getCompanies(param) {
    if (param == "") {
      return;
    } else {
      searchBtn.disabled = true;
      searchBtn.innerText = "Loading...";
      this.loading.classList.add("spinner-border");
      let res = await fetch(
        `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${param}&limit=10&exchange=NASDAQ`
      );
      let data = await res.json();
      this.loading.classList.remove("spinner-border");
      return data;
    }
  }

  async addQuery() {
    if (searchQuery.value !== "") {
      window.history.pushState({}, "", `?query=${searchQuery.value}`);
    }
  }

  async onSearch(funct) {
    let debounceTimeout;

    let clearCompany = () => {
        let company = document.getElementById('companyProfile');
        if (company) {
          company.innerHTML = '';
        }
    }

    let handleClick = (e) => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
      e.preventDefault();
      clearCompany()
      this.getCompanies(searchQuery.value).then((data) => {
        if (searchQuery.value !== '') {
          funct(data);
          this.addQuery();
        }
      });
    };

    let handleInput = () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
      debounceTimeout = setTimeout(() => {
        this.getCompanies(searchQuery.value).then((data) => {
          if (searchQuery.value !== "") {
            funct(data);
            this.addQuery();
          }
        });
      }, 2000);
    }

    let searchOnLoad = async () => {
      let urlParams = new URLSearchParams(window.location.search);
      let pastQuery = urlParams.get("query");
      if (pastQuery === '') {
              window.history.pushState({}, '', `?`);

      } 
      if (pastQuery) {
        clearCompany()
        searchQuery.value = pastQuery;
        this.getCompanies(pastQuery).then((data) => {
          funct(data);
        });
      }
    };
      
    searchQuery.addEventListener("input", handleInput);

    searchBtn.addEventListener("click", handleClick);

    window.addEventListener("load", searchOnLoad);
  }
}
