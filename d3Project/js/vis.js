
function lineChart () {

    var width = 850,
        height = 500,
        campusID = "#vis",
        data = undefined,
        padding = padding = {top: 30, bottom: 40, left: 40, right: 40};

    function chart () {

        var max = 0,
            dates = [],
            svg = d3.select(campusID).append("svg").attr("height", height).attr("width", width),
            yScale = d3.scale.linear(),
            xScale = d3.scale.ordinal(),
            xAxis = d3.svg.axis(),
            yAxis = d3.svg.axis(),
            line = d3.svg.line(),
            container = svg.append("g").attr("transform", "translate(" + (padding.left - 9)  + ",-13)"),
            colors = ['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c',
                      '#fdbf6f','#ff7f00','#cab2d6','#6a3d9a','#ffff99','#b15928'];

        //Find the maximum value ( {date: dateValue, value: dateValue}
        for (var field in data) {
            data[field].forEach(function(d){
                if (max < +d.value)
                    max = +d.value;

                if (!(d.date in dates))
                    dates.push(d.date);
            });

        }

        yScale.domain([max, 0]).range([padding.bottom, height - padding.top]);
        xScale.domain(dates).rangeRoundBands([padding.left, width - padding.right]);
        line.x(function(d){ return xScale(d.date); })
            .y(function(d){ return yScale(+d.value); });
        xAxis.scale(xScale).orient("bottom").outerTickSize(0);
        yAxis.scale(yScale).orient("left");

        svg.append("g")
            .attr("transform", "translate(0," + (height - padding.bottom + 2) + ")")
            .attr("class", "x axis")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + (padding.left - 1) +  ",-8)")
            .call(yAxis);

        Object.keys(data).sort().forEach(function (key, i) {

            var path = container.append("path")
                    .datum(data[key])
                    .attr("class", "line")
                    //.attr("id", function(d) { return "id_" + i; })
                    .attr("d", line)
                    .style("stroke", colors[i]);

            //Referred: http://bl.ocks.org/duopixel/4063326
            var totalLength = path.node().getTotalLength();

            path.attr("stroke-dasharray", totalLength + " " + totalLength)
                .attr("stroke-dashoffset", totalLength)
                .transition()
                .duration(1000)
                .ease("linear")
                .attr("stroke-dashoffset", 0);

        })
    }

    chart.draw = function () {
        chart();
    }

    chart.data = function (value) {
        data = value;
        return chart;
    }

    chart.width = function (value) {
        width = value;
        return chart;
    }

    chart.height = function (value) {
        height = value;
        return chart;
    }

    chart.campusID = function (value) {
        campusID = value;
        return chart;
    }

    chart.padding = function (value) {
        padding = value;
        return chart;
    }


    return chart;
}
