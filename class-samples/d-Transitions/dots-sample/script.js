buildData(50, 100, function(data) {

    var w = window.innerWidth,
        c = d3.scale.category10(),
        xScale = d3.scale.ordinal()
            .domain(data.map(function(d) { return d.amount; }))
            .rangePoints([25, w - 25]),
        sizeScale = d3.scale.linear()
            .domain([1, 100])
            .range([1, 20]);

    canvas = d3.select('body')
        .append('svg')
        .attr({
            height: 100,
            width: w
        })
        .style({
            'background-color': '#EEE',
        });


    canvas.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .on('click', function(d, i) {

            d3.select(this)
                .transition()
                .duration(500)
                .attr('r', 100)
                .ease('elastic', 20);

            canvas.
                transition()
                .delay(100)
                .ease('bounce')
                .attr('height', parseInt( canvas.attr('height') ) + 20);

        })
        .attr({
            cx: function(d, i) {
                return xScale(d.amount);
            },
            cy: function(d, i) {
                return d.amount;
            },
            r: 0
        })
        .transition()
        .duration(1000)
        .delay(function(d, i) {
            return i * 20;
        })
        .attr('r', function(d, i) {
            return sizeScale(d.size);
        })
        .style({
            'fill': function(d, i) {
                return c(i);
            }
        });


});

function buildData(num, max, done) {

    var i, d = [];

    for (i=0; i<num; i++) {
        d.push({
            amount: Math.round(Math.random()*max),
            size: Math.round(Math.random()*max)
        });
    }

    console.log(d);

    done(d);

}