var container = d3.select('body').append('div'),
    bars = {
        white: drawBox(container, 500, 100, 'white'),
        yellow: drawBox(container, 250, 100, 'yellow'),
        green: drawBox(container, 300, 300, '#0F0'),
        dotCount: 0
    };

// Click the white Bar
bars.white.on('click', function() {

    var cords = d3.mouse(this);
    console.log( cords );

    drawDot(this, cords);

});

// Draws Dots
function drawDot(itm, cords) {

    //
    //  TODO: Incorporate category10() color scale
    //

    d3.select(itm)
        .append('circle')
        .attr('cx', cords[0])
        .attr('cy', cords[1])
        .attr('r', 5);

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

