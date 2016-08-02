

function go() {
    updateDepArrAirlines(document.getElementById("endpoint").value);
}

function update() {
    updateDepArrAirlines(document.getElementById("endpoint").value);
}

function updateDepArrAirlines(connectString) {
    var data = 0;
    var query = "";
    var year = document.getElementById("year").value;
    var month = document.getElementById("month").value;
    var uniquecarriers = [];
    var ontimedepartures = [];
    var ontimearrivals = [];

    if (year == "0")
        year = "";
    else
        year = " and year = " + year + " ";
    if (month == "0")
        month = "";
    else
        month = " and month = " + month + " ";

    

    var query = "select uniquecarrier,100 - (round(sum(depdel15)/count(depdel15),2)*100) as ontime_departure,"+
                                     "100 - (round(sum(arrdel15)/count(arrdel15),2)*100) as ontime_arrival " +
                "from departures " +
                "where cancelled = 0  " + year + month +
                "group by uniquecarrier " +
                "order by 2 desc";

    apigClient.rootPost({}, { connectString: connectString, query: query })
        .then(function (response) {
            console.log(response);
            console.log(response.data.rows.length);
            for (var i = 0 ; i < response.data.rows.length; i++) {
                uniquecarriers.push(response.data.rows[i].uniquecarrier);
                ontimearrivals.push(response.data.rows[i].ontime_arrival);
                ontimedepartures.push(response.data.rows[i].ontime_departure);
            }
            airline.config.data.labels = uniquecarriers;
            airline.config.data.datasets[0].data = ontimearrivals;
            airline.config.data.datasets[1].data = ontimedepartures;
            airline.update();

        }).catch(function (response) {
            alert('Call failed');
            showError(response);
        });

}



var apigClient = apigClientFactory.newClient();
var airlineCodes = ["AA","UA","DL","WN","B6","AS","NK","F9","HA","G4","VX","FL"];
var airlineLabels = ["American", "United", "Delta", "Southwest","JetBlue","Alaska","Spirit", "Frontier", "Hawaiian","Allegiant","Virgin","AirTran"];
var airportCodes = [12892,12478,11298,14771];
var ctx = document.getElementById("airline");
var airline = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        labels: airlineLabels,
        datasets: [
            {
                label: 'On Time Departure (Percentage)',
                data: [0,0,0,0,0,0,0,0,0,0,0,0],
                backgroundColor: 'rgba(75, 192, 192, .4)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {
                label: 'On Time Arrival (Percentage)',
                data: [0,0,0,0,0,0,0,0,0,0,0,0],
                backgroundColor: 'rgba(153, 102, 255, 0.4)',
                borderColor: 'rgba(153, 102, 255,1)',
                borderWidth: 1
            }
        ]
    },
    options: {
        scales: {
            xAxes: [{
                ticks: {
                    beginAtZero:true,
                    max: 100
                }
            }]
        }
    }
});

var ctx = document.getElementById("airline_arrivals");
var airline_arrivals = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        labels: airlineLabels,
        datasets: [{
            label: 'On Time Departure (Percentage)',
            data: [0,0,0,0,0,0,0,0,0,0,0,0],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            xAxes: [{
                ticks: {
                    beginAtZero:true,
                    max: 100
                }
            }]
        }
    }
});

var ctx = document.getElementById("airport_departures");
var airport_departures = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        labels: ["LAX", "JFK", "DFW", "SFO"],
        datasets: [{
            label: 'On Time Departure (Percentage)',
            data: [0, 0, 0, 0],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            xAxes: [{
                ticks: {
                    beginAtZero:true,
                    max: 100
                }
            }]
        }
    }
});

var ctx = document.getElementById("airport_arrivals");
var airport_arrivals = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        labels: ["LAX", "JFK", "DFW", "SFO"],
        datasets: [{
            label: 'On Time Departure (Percentage)',
            data: [0, 0, 0, 0],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            xAxes: [{
                ticks: {
                    beginAtZero:true,
                    max: 100
                }
            }]
        }
    }
});


  $(document).ready(function(){
    $('.combobox').combobox();
  });