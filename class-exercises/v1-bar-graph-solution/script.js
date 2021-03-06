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

    var svg,
        scores = [],
        filterPar = function(player, type) {
            return player.strokes.filter(function(stroke, i) {
                var goal,
                    hole = course.holes[i];

                if (type == "birdie") {
                    goal = hole.par-1;
                } else if (type == "bogie") {
                    goal = hole.par+1;
                } else if (type == "double") {
                    goal = hole.par+2;
                } else {
                    goal = hole.par;
                }
                return stroke == goal;
            }).length;
        };

    // Takes the round and converts it to usable score data
    round.forEach(function(player, i) {
        if (scores[i]) {
            scores[i].player = player.player;
            scores[i].results = filterPar(player, type);
        } else {
            scores.push({
                player: player.player,
                results: filterPar(player, type)
            });
        }
    });

    // Removes the svg before redrawing it
    d3.select('svg').remove();

    // Adds SVG Element
    svg = d3.select('#target')
        .append('svg')
        .attr('height', h)
        .attr('width', w)
        .style('background-color', 'blue');

    var barWidth = w/(scores.length+1);
    var spacer = barWidth/scores.length;

    svg.selectAll('rect')
        .data(scores)
        .enter()
        .append('rect')
        .style('fill', 'yellow')
        .attr('width', barWidth)
        .attr('height', function(d, i) {
            return d.results * 20;  // Scaling each Bar
        })
        .attr('x', function(d, i) {
            return (i*(barWidth+spacer)) + spacer/2;
        })
        .attr('y', function(d) {
            return h - (d.results * 20); // Scaling each Bar
        });

}