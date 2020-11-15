
class Marquee {

    constructor(div) {
        this.stocks = []
        this.marquee = document.createElement('ul')
        div.appendChild(this.marquee)
    }

    async load() {
        let response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/stock/list`)
        let data = await response.json()
        this.marquee.classList.add('col-12')
        this.marquee.classList.add('marquee')
        for (let i = 0; i < 25; i++) {
            this.stocks[i] = document.createElement('li')
            this.stocks[i].innerHTML = `${data[i].symbol} <span class = 'text-success'>$${data[i].price}</span>`
            this.marquee.appendChild(this.stocks[i])
        }
    }  
}


