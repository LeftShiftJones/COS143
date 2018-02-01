/*
Assignment 8's javascript file
Ryan Jones | Thomas Taylor
*/

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function getData() {
    console.log("get data: ticker=" + stockTicker.value
        + ", earliest=" + startDate.value
        + ", latest=" + endDate.value);
    var ajax = new XMLHttpRequest();
    ajax.responseType = "json";
    ajax.addEventListener("load", function () {
        console.log(this.response);
        console.log(startDate.innerHTML);
        if(this.response.dataset === undefined) {
            alert("ticker does not exist");
        } else {
            console.log("High=" + this.response.dataset.data[0][2]);
            var row = stockTable.insertRow(-1);
            //Symbol
            var cell = row.insertCell(-1);
            cell.innerHTML = this.response.dataset.dataset_code;
            var close = this.response.dataset.data[0][4];
            var open = this.response.dataset.data[0][1];
            if(close <  open) {
                cell.style.color = "black";
                cell.style.background = "pink";
            } else if(open < close) {
                cell.style.background = "lightgreen";
                cell.style.color ="black";
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
            printButton.addEventListener("click", function() {
                chartData(this);
            });
            cell.appendChild(printButton);
            cell = row.insertCell(-1);
            var portfolioButton = document.createElement("input");
            portfolioButton.setAttribute("type", "button");
            portfolioButton.setAttribute("value", "Add to Portfolio");
            portfolioButton.setAttribute("class", "chartButtons");
            portfolioButton.addEventListener("clicl", function() {
                console.log("Added to portfolio");
            })
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

getDataButton.addEventListener("click", getData);

function chartData(button) {
    var sym = button.parentNode.children[0].innerHTML;
    var ajax = new XMLHttpRequest();
    ajax.responseType = 'json';
    ajax.addEventListener("load", function () {
        var dataset = this.response.dataset;
        if(dataset) {
            for(var i = dataset.data.length-1; i >=0; i--) {
                var newData = [];
                var date = new Date(dataset.data[i][0]);
                newData.push(date);
                newData.push(dataset.data[i][2]);
                newData.push(dataset.data[i][3]);
                newData.push(dataset.data[i][4]);
                newData.push(dataset.data[i][5]);
                googleData.push(newData);
            }

        } else {
            console.log("there was an error");
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

function drawChart() {

var chart = new google.visualization.LineChart(document.getElementById('chart'));

chart.draw(googleData, options);

  var options = {
    title: 'Company Performance',
    legend: { position: 'bottom' },
    series: {
        0: {axis: 'Price'},
        1: {axis: 'Volume'},
        0: {targetAxisIndex: 0},
        1: {targetAxisIndex: 1}
    },
    axes: {
        y: {
            Price: {label: 'Price'},
            Volume: {label: 'Volume'}
        }
    },
    vAxes: {
        0: {title: 'Price'},
        1: {title: 'Volume'}
    },

  };
}
