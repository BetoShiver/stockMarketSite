class CompanyMain {
    constructor(div) {
        div.className = 'container rounded bg-light px-0  main';
        div.innerHTML = `<div id="form" class="container-fluid py-5 search-background rounded">
        </div>
        <div class="container-fluid">
            <div id="marqueeBox" class="row border marquee-row">
            </div>
        </div>
        <div id="resultsContainer" class="container-fluid py-4">
        </div>
        <div class="row company-profile pb-4" id='companyProfile'>
        </div>`;
    }
} 