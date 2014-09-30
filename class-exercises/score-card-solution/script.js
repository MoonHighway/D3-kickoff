/*global round, course, d3 */

var scoreCard,
    thead,
    tbody;

// Adding round totals
round.forEach(function(player) {
    var total = player.strokes.reduce(function(prev, next) {
        return prev + next;
    });
    player.strokes.push(total);
});

// Adding course par
course.holes.push({
    hole: 'par',
    par: course.holes.reduce(function(prev, next) {
        if (typeof prev === "number") {
            return prev + next.par;
        } else {
            return prev.par + next.par;
        }
    })
});

//  Creating a table and adding it ot the body
scoreCard = d3.select('body')
    .append('table')
    .classed('scoreCard', true);

thead = scoreCard.append('thead');

//  Adding a row to the header with the course name
thead.append('tr')
    .append('th')
    .attr('rowspan', 2)
    .classed('course-title', true)
    .text(course.name);

//  Adding the rows representing the course holes
thead.select('tr')
    .selectAll('td')
    .data(course.holes)
    .enter()
    .append('td')
    .text(function(d, i) {
        return 'hole ' + d.hole;
    });

thead.append('tr');

thead.select('tr:last-child')
    .selectAll('td')
    .data(course.holes)
    .enter()
    .append('td')
    .text(function(d, i) {
        return d.par;
    });

//  Adding the course pars for each hole
tbody = scoreCard.append('tbody');

//  Creating a <tr> row for each player, adding the players name as a header
tbody.selectAll('tr')
    .data(round)
    .enter()
    .append('tr')
    .append('th')
    .text(function(d, i) {
        return d.player;
    });

//  Adding player scores to their row and coloring the birdies and bogies
tbody.selectAll("tr")
    .data(round)
    .selectAll("td")
    .data(function(d, i) {
        return d.strokes;
    })
    .enter()
    .append('td')

    //  Color code the score card
    .style('color', function(d, i) {

        if (course.holes[i]) {
            return (d > course.holes[i].par) ? "red" : (d < course.holes[i].par) ? "green" : "black";
        } else {
            return (d > 72) ? "red" : (d < 72) ? "green" : "black";
        }


    })
    .text(function(d, i) {
        return d;
    });
