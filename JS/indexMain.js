class IndexMain {
    constructor(div) {
        div.className = 'container mb-4 rounded bg-light px-0 main';
        div.innerHTML = `<div id="form" class="container-fluid rounded py-5 search-background">
        </div>
        <div class="container-fluid">
            <div id="marqueeBox" class="row border marquee-row">
            </div>
        </div>
        <div id="resultsContainer" class="container-fluid ">
        </div>`
    }
}