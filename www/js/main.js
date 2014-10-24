(function($) {

    var dummyData = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: "My Second dataset",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };

    var parsing = {
        getLabels : function(data) {
            var labels = [];

            for(var i = 0; i < data.length; i++) {
                labels.push(data[i].Player);
            }

            return labels;
        },
        getDataSet : function(data, field) {
            var dataSet = [];

            for(var i = 0; i < data.length; i++) {
                dataSet.push(data[i][field]);
            }

            return dataSet;
        }
    };

    $(document).ready(function(){

        var realData = [];

        $.ajax({
            type: "GET",
            dataType: 'json',
            url: "/ajax.php",
            beforeSend: function() {
            },
            success: function(response) {
                //console.log(response);
                var labels = parsing.getLabels(response);

                var totalTackles = parsing.getDataSet(response, "DEFENSIVE_TOTAL_TACKLES");

                var defensiveSacks = parsing.getDataSet(response, "DEFENSIVE_SACKS");

                var defensiveCombineTackles = parsing.getDataSet(response, "DEFENSIVE_COMBINE_TACKLES");

                var allDatasets = [];
                allDatasets.push({
                    label: "Defensive Total Tackles",
                    fillColor: "rgba(220,220,220,0.5)",
                    strokeColor: "rgba(220,220,220,0.8)",
                    highlightFill: "rgba(220,220,220,0.75)",
                    highlightStroke: "rgba(220,220,220,1)",
                    data: totalTackles
                });
                allDatasets.push({
                    label: "Defensive Sacks",
                    fillColor: "rgba(151,187,205,0.5)",
                    strokeColor: "rgba(151,187,205,0.8)",
                    highlightFill: "rgba(151,187,205,0.75)",
                    highlightStroke: "rgba(151,187,205,1)",
                    data: defensiveSacks
                });
                allDatasets.push({
                    label: "Defensive Combine Tackles",
                    fillColor: "rgba(51, 49, 36, 0.1)",
                    strokeColor: "rgba(51, 49, 36, 0.5)",
                    highlightFill: "rgba(51, 49, 36, 0.75)",
                    highlightStroke: "rgba(51, 49, 36, 1)",
                    data: defensiveCombineTackles
                });

                var graphData = {
                    labels: labels,
                    datasets: allDatasets

                };

                // make demo chart

                // Get the context of the canvas element we want to select
                var ctx = document.getElementById("myChart").getContext("2d");
                var myNewChart = new Chart(ctx).Bar(graphData);
            },
            complete: function () {
            }
        });


    });
})(jQuery);
