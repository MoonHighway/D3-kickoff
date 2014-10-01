var colorScale = d3.scale.category10(),
    container = d3.select('body').append('div'),
    bars = {
        white: drawBox(container, 500, 100, 'white'),
        yellow: drawBox(container, 250, 100, 'yellow'),
        green: drawBox(container, 300, 300, '#0F0'),
        dotCount: 0
    };

// Click the white Bar
bars.white.on('click', function() {
    var cords = d3.mouse(this);
    drawDot(this, cords);

    var yScaleYellow = d3.scale.linear()
        .domain([1, 500])
        .range([1, 250]);

    var yellowCords = [
        cords[0],
        yScaleYellow(cords[1])
    ];

    drawDot(bars.yellow[0][0], yellowCords);

    var scaleGreen = {
        x: d3.scale.linear().domain([1, 100]).range([1, 300]),
        y: d3.scale.linear().domain([1, 500]).range([1, 300])
    };

    var greenCords = [
        scaleGreen.x(cords[0]),
        scaleGreen.y(cords[1])
    ];

    drawDot(bars.green[0][0], greenCords);

    bars.dotCount++;

});

// Draws Dots
function drawDot(itm, cords) {

    d3.select(itm)
        .append('circle')
        .attr('cx', cords[0])
        .attr('cy', cords[1])
        .attr('r', 5)
        .style('fill', function(d, i) {
            return colorScale(bars.dotCount);
        });

    d3.select(itm)
        .append('text')
        .attr('x', cords[0] + 10)
        .attr('y', cords[1] + 5)
        .text('[' + Math.round(cords[0]) + ',' + Math.round(cords[1]) + ']')
        .style('fill', function(d, i) {
            return colorScale(bars.dotCount);
        });

}

// Draws Boxes
function drawBox(scope, h, w, c) {

    return scope.append('svg')
        .attr({
            height: h,
            width: w
        })
        .style('background-color', c);

}

