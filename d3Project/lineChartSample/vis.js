
function lineChart () {

    var width = 850,
        height = 500,
        data = undefined,
        padding = padding = {top: 30, bottom: 40, left: 40, right: 40};

    function chart (selection) {

        console.log(selection);

        var startDate, endDate,
            dates = [],
            svg = selection.append("svg")
                .attr("height", height + padding.top + padding.bottom)
                .attr("width", width + padding.left + padding.right),
            yScale = d3.scale.linear(),
            xScale = d3.time.scale(),
            xAxis = d3.svg.axis(),
            yAxis = d3.svg.axis(),
            line = d3.svg.line(),
            xAxisPadding = 9,
            container = svg.append("g").attr("transform", "translate(" + padding.left  + "," + padding.top + ")"),
            colors = ['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c',
                      '#fdbf6f','#ff7f00','#cab2d6','#6a3d9a','#ffff99','#b15928'];

        startDate = d3.min(data.map (function(d) { return d.date; }));
        endDate = d3.max(data.map (function(d) { return d.date; }));
        yScale.domain([1, -1]).range([0, height]);
        xScale.domain([startDate, endDate]).range([xAxisPadding, width - 2]);
        line.x(function(d){ return xScale(d.date); })
            .y(function(d){ return yScale(d.value); })
            .interpolate("linear");


        xAxis.scale(xScale).orient("bottom").tickPadding(3).innerTickSize(15).outerTickSize(0);
        yAxis.scale(yScale).orient("left").tickSize(-width).ticks(2);


        container.append("g")
            .append("rect").attr("width", width).attr("height", height)
            .style("fill", "url(#gradient)");


        container.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr("class", "x axis")
            .call(xAxis);

        container.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + 0 +  ",0.5)")
            .call(yAxis);


        function zoomed() {
            container.selectAll("path")
                .attr("stroke-dasharray", "0 0")
                .attr("d", line);
            container.select(".x.axis").call(xAxis);
            container.select(".y.axis").call(yAxis);
        }

        var zoom = d3.behavior.zoom().x(xScale).scaleExtent([1, 2]).on("zoom", zoomed);
        svg.call(zoom)


        container.append("clipPath").attr("id","cpath")
            .append("rect")
            .attr("height", height).attr("width", width - xAxisPadding).attr("x", xAxisPadding);

        var path = container.append("path").datum(data)
            .attr("clip-path", "url(#cpath)")
            .attr("class","line").attr("d", line).style("stroke", colors[1]);


        //Referred: http://bl.ocks.org/duopixel/4063326
        var totalLength = path.node().getTotalLength();

        path.attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", totalLength)
            .transition()
            .duration(1000)
            .ease("linear")
            .attr("stroke-dashoffset", 0);

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

    chart.padding = function (value) {
        padding = value;
        return chart;
    }


    return chart;
}
