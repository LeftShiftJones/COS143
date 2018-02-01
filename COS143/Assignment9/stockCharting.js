google.charts.load('current', { 'packages': ['corechart'] });
//google.charts.setOnLoadCallback(drawChart);
function getData() {
    console.log("get data: ticker=" + stockTicker.value
        + ", earliest=" + startDate.value
        + ", latest=" + endDate.value);
    var ajax = new XMLHttpRequest();
    ajax.responseType = "json";
    ajax.addEventListener("load", function () {
        console.log(this.response);
        console.log(startDate.innerHTML);
        if (this.response.dataset === undefined) {
            alert("ticker does not exist");
        } else {
            var row = stockTable.insertRow(-1);
            //Symbol
            var cell = row.insertCell(-1);
            cell.innerHTML = this.response.dataset.dataset_code;
            var close = this.response.dataset.data[0][4];
            var open = this.response.dataset.data[0][1];
            if (close < open) {
                cell.style.color = "black";
                cell.style.background = "pink";
            } else if (open < close) {
                cell.style.background = "lightgreen";
                cell.style.color = "black";
            }
            //Company Name
            cell = row.insertCell(-1);
            var re = /^[^(]+/;
            var companyName = re.exec(this.response.dataset.name)[0].trim();
            cell.innerHTML = companyName;
            //Open
            cell = row.insertCell(-1);
            cell.innerHTML = this.response.dataset.data[0][1];
            //Close
            cell = row.insertCell(-1);
            cell.innerHTML = this.response.dataset.data[0][4];
            //High
            cell = row.insertCell(-1);
            cell.innerHTML = this.response.dataset.data[0][2];
            //Low
            cell = row.insertCell(-1);
            cell.innerHTML = this.response.dataset.data[0][3];
            //volume
            cell = row.insertCell(-1);
            cell.innerHTML = this.response.dataset.data[0][5];
            cell = row.insertCell(-1);
            var printButton = document.createElement("input");
            printButton.setAttribute("type", "button");
            printButton.setAttribute("value", "Print Chart");
            printButton.setAttribute("class", "chartButtons");
            printButton.addEventListener("click", function () {
                drawChart(this.parentNode.parentNode.children[0].innerHTML);
            });
            cell.appendChild(printButton);
            cell = row.insertCell(-1);

            //Add to Portfolio Button
            var portfolioButton = document.createElement("input");
            portfolioButton.setAttribute("type", "button");
            portfolioButton.setAttribute("value", "Add to Portfolio");
            portfolioButton.setAttribute("class", "chartButtons");
            portfolioButton.addEventListener("click", function () {
                getPortfolio(this.parentNode.parentNode.children[0].innerHTML);
            });
            cell.appendChild(portfolioButton);
        }
    });
   

    var start = startDate.value;
    var end = endDate.value;
    ajax.open("GET", "https://www.quandl.com/api/v3/datasets/WIKI/"
        + stockTicker.value
        + ".json?"
        + "start_date="
        + start
        + "&"
        + "end_date="
        + end
        + "&"
        + "api_key=FDRaapU4txZNpXzAyhfe");
    ajax.send();
}

function getPortfolio(chicken) {

    var ajax = new XMLHttpRequest();
    ajax.responseType = "json";
    ajax.addEventListener("load", function () {
        console.log(this.response);
        if (this.response.dataset === undefined) {
            alert("ticker does not exist");
        } else {
            var row = portfolioTable.insertRow(-1);
            //Symbol
            var cell = row.insertCell(-1);
            cell.innerHTML = chicken;
            //Company Name
            cell = row.insertCell(-1);
            var re = /^[^(]+/;
            var companyName = re.exec(this.response.dataset.name)[0].trim();
            cell.innerHTML = companyName;
            //Shares Owned
            cell = row.insertCell(-1);
            cell.innerHTML = "100";
            //Previous Value
            cell = row.insertCell(-1);
            var previous = this.response.dataset.data[1][4];
            cell.innerHTML = "$"+previous;
            //Current Value
            cell = row.insertCell(-1);
            var current = this.response.dataset.data[0][4];
            cell.innerHTML = "$"+current;
            //% Change
            cell = row.insertCell(-1);
            var change = (((current-previous)/previous)*100).toFixed(2);
            if(change < 0) {
                cell.style.background = "pink";
            } else if(change > 0) {
                cell.style.background = "lightgreen";
            }
            cell.innerHTML = change + "%";

        }
    });
   

    var end = new Date();
    var start = new Date();
    start.setDate(end.getDate()-5);
    ajax.open("GET", "https://www.quandl.com/api/v3/datasets/WIKI/"
        + chicken
        + ".json?"
        + "start_date="
        + start
        + "&"
        + "end_date="
        + end
        + "&"
        + "api_key=FDRaapU4txZNpXzAyhfe");
        console.log("start=", start, " end=", end);
    ajax.send();
}


getDataButton.addEventListener("click", getData);

function drawChart(ticker) {
    var ajax = new XMLHttpRequest();
    ajax.responseType = 'json';
    ajax.addEventListener("load", function () {
        var dataset = this.response.dataset;
        var chart = new google.visualization.LineChart(document.getElementById('chart'));
        var dataTable = new google.visualization.DataTable();

        dataTable.addColumn('date', 'Date');
        dataTable.addColumn('number', 'High');
        dataTable.addColumn('number', 'Low');
        dataTable.addColumn('number', 'Close');
        dataTable.addColumn('number', 'Volume');

        var googleData = []; //Array for arrays
        for (var i = 0; i < dataset.data.length; i++) {
            var newData = [];
            var date = new Date(dataset.data[i][0]);
            newData.push(date);
            newData.push(dataset.data[i][2]);
            newData.push(dataset.data[i][3]);
            newData.push(dataset.data[i][4]);
            newData.push(dataset.data[i][5]);
            googleData.push(newData);
        }
        dataTable.addRows(googleData);

        console.log(dataTable);
        console.log(googleData);

        var options = {
            title: 'Performance Summary',
            legend: { position: 'top' },
            hAxis: {
                format: 'MM-dd-yyyy',
                title: 'Date'
            },
            vAxes: {
                0: { title: 'Price' },
                1: { title: 'Volume' }
            },
            series: {
                0: { targetAxisIndex: 0 },
                1: { targetAxisIndex: 0 },
                2: { targetAxisIndex: 0 },
                3: { targetAxisIndex: 1 }
            }
        };
        chart.draw(dataTable, options);
    });

    var start = startDate.value;
    var end = endDate.value;
    ajax.open("GET", "https://www.quandl.com/api/v3/datasets/WIKI/"
        + ticker
        + ".json?"
        + "start_date="
        + start
        + "&"
        + "end_date="
        + end
        + "&"
        + "api_key=FDRaapU4txZNpXzAyhfe");
    ajax.send();