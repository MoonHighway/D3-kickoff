var colorScale = d3.scale.category10(),
    container = d3.select('body').append('div'),
    bars = {
        white: drawBox(container, 500, 100, 'white'),
        yellow: drawBox(container, 250, 100, 'yellow'),
        green: drawBox(container, 300, 300, 'green')
    },
    txt = {
        white: addText(bars.white),
        yellow: addText(bars.yellow),
        green: addText(bars.green)
    };

d3.select('body').on("mousemove", function() {

    txt.white.text( d3.mouse(bars.white.node()) );
    txt.yellow.text( d3.mouse(bars.yellow.node()) );
    txt.green.text( d3.mouse(bars.green.node()) );

    d3.select('h1').text( d3.event.x + ", " + d3.event.y );

    console.log( d3.event );

});


function drawBox(scope, h, w, c) {

    return scope.append('svg')
        .attr({
            height: h,
            width: w
        })
        .style('background-color', c);
}

function addText(scope) {
    return scope.append('text')
        .attr("x", 10)
        .attr("y", 30);
}

