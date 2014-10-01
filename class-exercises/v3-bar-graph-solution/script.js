var scores = [];

// Loads Score Card Data
d3.csv('http://localhost:3000/score-card.csv', function(err, data) {

    // Course and round are the variables required
    var course = {
            name: '',
            holes: []
        },
        round = [];

    if (err) {
        throw err;
    }

    data.forEach(function(item, i) {
        var key;

        // The first row in the csv is the course parse course
        if (i === 0) {

            for (key in item) {
                if (parseInt(key)) {
                    course.holes.push({
                        hole: parseInt(key),
                        par: parseInt(item[key])
                    });
                } else {
                    course.name = key;
                }
            }


            // The rest of the rows are players, parse round
        } else {

            var obj = {
                player: '',
                strokes: []
            };

            for (key in item) {
                if (parseInt(key)) {
                    obj.strokes.push(parseInt(item[key]));
                } else {
                    obj.player = item[key];
                }
            }

            round.push(obj);

        }

    });

    // Graph The Data
    barGraphRound(round, course, 600, 500, "par");

    // Add Clicks to the buttons
    d3.selectAll('button').on('click', function() {
        barGraphRound(round, course, 600, 500, this.id);
    });

});

function barGraphRound(round, course, w, h, type) {

    var xScale,
        yScale,
        xAxisScale,
        yAxisScale,
        xAxis,
        yAxis,
        max,
        svg,
        colors,
    //sets a margin of 25 px (top and bottom only)
        margin = 25,
        filter = function(player, score) {
            return player.strokes.filter(function(stroke) {
                return stroke == score;
            }).length;
        };

    // Takes the round and converts it to usable score data
    round.forEach(function(player, i) {
        var query,
            hole = course.holes[i];

        if (type == "birdie") {
            query = hole.par-1;
        } else if (type == "bogie") {
            query = hole.par+1;
        } else if (type == "double") {
            query = hole.par+2;
        } else {
            query = hole.par;
        }

        if (scores[i]) {
            scores[i].player = player.player;
            scores[i].results = filter(player, query);
        } else {
            scores.push({
                player: player.player,
                results: filter(player, query)
            });
        }
    });

    // Removes the svg before redrawing it
    d3.select('svg').remove();

    max = d3.max(scores.map(function(score) {
        return score.results;
    }));

    // Adds yScale, and gives us more room with scale
    yScale = d3.scale.linear()
        .domain([0, max + 1])
        .range([0, h]);

    // Adds a scale for the yAxis
    yAxisScale = d3.scale.linear()
        .domain([0, 1 + max])
        .range([h - margin, 0]);

    // Creates a yAxis
    yAxis = d3.svg.axis()
        .scale(yAxisScale)
        .orient('left')
        .ticks(3);

    // Adds xScale with rangeBands, 20% space and half bar margin
    xScale = d3.scale.ordinal()
        .domain(d3.range(0, scores.length))
        .rangeBands([0, w], 0.20, 0.5);

    // Adds a Scale for the xAxis
    xAxisScale = d3.scale.ordinal()
        .domain(scores.map(function(d) { return d.player; }))
        .rangeBands([0, w], 0.20, 0.5);

    // Creates the xAxis
    xAxis = d3.svg.axis()
        .scale(xAxisScale)
        .orient('bottom');

    // Adds Unique Colors to each bar
    colors = d3.scale.category10();

    // Adds SVG Element
    svg = d3.select('#target')
        .append('svg');

    // Adds margins to the height
    svg.attr('height', h + (margin*2))
        .attr('width', w);

    // Adds the yAxis
    svg.append('g')
        .classed('axis', true)
        .attr('transform', 'translate(35,25)')
        .call(yAxis);

    // Adds the xAxis
    svg.append('g')
        .classed('ticksOnly', true)
        .attr('transform', 'translate(0, ' + h + ')')
        .call(xAxis);

    // Styles the names to match the bars in color
    svg.selectAll('.ticksOnly>g.tick>text')
        .attr('fill', function(d, i) {
            return colors(i);
        });

    // Adds each bar
    svg.selectAll('rect')
        .data(scores)
        .enter()
        .append('rect')
        .style('fill', function(d, i) {
            return colors(i);
        })
        .attr('width', xScale.rangeBand)
        .attr('x', function(d, i) {
            return xScale(i);
        })

        // Sets initial state
        .attr('height', function(d, i) {
            var r = d.lastHeight || 0;
            d.lastHeight = yScale(d.results);
            return r;
        })
        .attr('y', function(d, i) {
            var r = d.lastY || h;
            d.lastY = h - yScale(d.results);
            return r;
        })

        // Adds the transition
        .transition()

        // Sets the final state
        .attr('height', function(d, i) {
            return yScale(d.results);
        })
        .attr('y', function(d) {
            return h - yScale(d.results);
        })
        .duration(500)
        .ease('bounce');


}

