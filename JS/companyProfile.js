class CompanyProfile {
  constructor(div) {
    div.innerHTML = `<div id="company-name" class="col-12 text-center h2 font-size-bold">
                Loading company Profile
            </div>
            <div id="price" class="col-12 py-5 text-center h1">
            </div>
            <div class='d-none' id='lengthBtn'>
              <label for="timeLength">Showing:</label>

              <select id='selectedTime' name="timeLength" id="timeLength">
                <option value="allTime">All time</option>
                <option value="7days">last 7 days</option>
                <option value="30days">last 30 days</option>
              </select>
            </div>
            <div id="chartDiv" class="col-12 pb-4">
                <div id="loading-chart" class="">
                    <canvas id="chart"></canvas>
                </div>
            </div>
            <div id="description" class="col-12 pt-3">
            </div>
            <div id="website" class="col-12 mt-3">
            </div>`;
    this.searchHeader = document.getElementById('searchHeader');
    this.searchHeader.innerText = 'Look For a Different Company';
    this.companyName = document.getElementById('company-name');
    this.profile = document.getElementById('companyProfile');
    this.urlParams = new URLSearchParams(window.location.search);
    this.symbol = this.urlParams.get('symb');
    this.timeSelected = document.getElementById('selectedTime');
    this.timeSelected.addEventListener('change', this.getSelected);
    this.timeLength = this.timeSelected.value;
  }

  checkIfCompanySymbol() {
    if (!this.symbol) {
      return 'no symbol';
    }
  }

  async getCompanyData() {
    if (this.checkIfCompanySymbol() === 'no symbol') {
      this.profile.innerHTML = '';
      return;
    } else {
      let website = document.getElementById('website');
      let price = document.getElementById('price');
      let response = await fetch(
        `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${this.symbol}`
      );
      let data = await response.json();
      let change = '';
      if (data.profile) {
        if (data.profile.changesPercentage) {
          change = data.profile.changesPercentage;
          change = parseFloat(change.slice(1, -1));
        }

        if (!data.profile.image == '') {
          this.companyName.innerHTML = `<img src='${data.profile.image}' height="35">  ${data.profile.companyName} (${this.symbol})`;
        } else {
          this.companyName.innerHTML = `${data.profile.companyName} (${this.symbol})`;
        }
        if (change >= 0) {
          price.innerHTML = `$${data.profile.price} <span style="color:lightgreen;"> ${data.profile.changesPercentage}</span> `;
        } else
          price.innerHTML = `$${data.profile.price} <span style="color:red;"> ${data.profile.changesPercentage}</span> `;
        if (data.profile.description) {
          description.innerHTML = ` <b>Description:</b> ${data.profile.description}`;
        } else {
          description.innerHTML = ``;
        }
        if (data.profile.website) {
          website.innerHTML = `<b>To visit ${data.profile.companyName}'s website, <a href="${data.profile.website}" target=”_blank”o> Click Here</a>.</b> `;
        }
      } else {
        this.companyName.innerText = `${this.symbol}\'s information is not available.`;
      }
    }
  }

  async getChart() {
    if (this.checkIfCompanySymbol() === 'no symbol') {
      return;
    } else {
      let lengthBtn = document.getElementById('lengthBtn');
      let loadingChart = document.getElementById('loading-chart');
      let chart = document.getElementById('chart').getContext('2d');
      let chartDiv = document.getElementById('chartDiv');
      loadingChart.classList.add('spinner-border');
      chartDiv.classList.add('d-flex');
      chartDiv.classList.add('justify-content-center');
      let chartData = await this.fetchChartData();
      let lifeLength = chartData.historical.length - 1;
      this.setChart(chartData, lifeLength);
      loadingChart.classList.remove('spinner-border');
      chartDiv.classList.remove('d-flex');
      chartDiv.classList.remove('justify-content-center');
      lengthBtn.classList.remove('d-none');
    }
  }

  async fetchChartData() {
    let response = await fetch(
      `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${this.symbol}?serietype=line`
    );
    let chartData = await response.json();
    return chartData;
  }

  async getSelected() {
    let urlParams = new URLSearchParams(window.location.search); 
    let symbol = urlParams.get('symb');
    let selection = document.getElementById('selectedTime');
    selection= selection.value
    let response = await fetch(
      `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`
    );
    let chartData = await response.json();
    let length = chartData.historical.length - 1;
    if (selection === '7days') {
      if (length > 7) {
        length = 7;
      }
    }
    if (selection === '30days') {
      if (length > 30) {
        length = 30;
      }
    }
     let date = [];
     let close = [];
     for (let i = length; i >= 0; i--) {
       date.push(chartData.historical[i].date);
       close.push(chartData.historical[i].close);
     }
     let progressChart = new Chart(chart, {
       type: 'line',
       data: {
         labels: date,
         datasets: [
           {
             label: 'Closing Price',
             data: close
           }
         ]
       },
       options: {
         title: {
           display: true,
           text: `Closing Stock Price`,
           fontSize: 22
         },
         legend: {
           display: false
         }
       }
     });
  }

  setChart(chartData, length) {
    let date = [];
    let close = [];
    for (let i = length; i >= 0; i--) {
      date.push(chartData.historical[i].date);
      close.push(chartData.historical[i].close);
    }
    let progressChart = new Chart(chart, {
      type: 'line',
      data: {
        labels: date,
        datasets: [
          {
            label: 'Closing Price',
            data: close
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: `Closing Stock Price`,
          fontSize: 22
        },
        legend: {
          display: false
        }
      }
    });
  }

  async load() {
    this.getChart();
    this.getCompanyData();
  }
}

