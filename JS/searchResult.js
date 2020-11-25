class SearchResult {
  constructor(div) {
    div.innerHTML = `
        <div class="row search-area  bg-light rounded my-2">
            <div id="results" class="col-12 h4 my-3 ">
                <ul id="resultsList"></ul>
            </div>
        </div>`;
    this.searchQuery = document.getElementById("searchQuery");
    this.searchBtn = document.getElementById("searchBtn");
  }

  async renderResults(data) {
    while (resultsList.hasChildNodes()) {
      resultsList.removeChild(resultsList.firstChild);
    }
    if (data.length === 0) {
      let noResult = document.createElement("li");
      noResult.innerHTML = `<b class='h2'>No Results Found</b>`;
      resultsList.appendChild(noResult);
      this.searchBtn.disabled = false;
      this.searchBtn.innerText = "Search";
      return;
    }
    let top = Math.min(data.length, 10);
    let resultsTitle = document.createElement("li");
    resultsList.innerHTML = `<b class='resultsTitle'>Results</b>`;
    resultsTitle.classList.add("resultsTitle");
    resultsList.appendChild(resultsTitle);
    for (let i = 0; i < top; i++) {
      var res2 = await fetch(
        `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${data[i].symbol}`
      );
      let data2 = await res2.json();
      let results = [];
      try {
        let change = data2.profile.changesPercentage;
        change = parseFloat(change.slice(1, -1));
        results[i] = document.createElement("li");
        if (change >= 0) {
          results[
            i
          ].innerHTML = `<img src='${data2.profile.image}' height="35"> <a href="./company.html?symb= ${data[i].symbol}"> ${data[i].name} (${data[i].symbol})<span style="color:lightgreen;"> ${data2.profile.changesPercentage}</span></a> `;
        } else {
          results[
            i
          ].innerHTML = `<img src='${data2.profile.image}' height="35"> <a href="./company.html?symb= ${data[i].symbol}"> ${data[i].name} (${data[i].symbol})<span style="color:red;"> ${data2.profile.changesPercentage}</span></a> `;
        }
      } catch {
        results[i] = document.createElement("li");
        results[i].innerHTML =`<a href="./company.html?symb= ${data[i].symbol}"> ${data[i].name} (${data[i].symbol})</a> `;
      }
      resultsList.appendChild(results[i]);
    }
    this.searchBtn.disabled = false;
    this.searchBtn.innerText = "Search";
  }
}
