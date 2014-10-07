var pars = [{"player":"Blaise","results":5},{"player":"Kevin","results":6},{"player":"Jeff","results":4},{"player":"Todd","results":3}];
var parPieData = pars.map(function(player) {
return {
    label: player,
    value: player.results
}
});

var cScale = d3.scale.ordinal()
.domain(pars)
.range(['red','green','yellow','blue']);

var parPie = d3.layout.pie()
.value(function (d) {
return d.value;
});

var arc = d3.svg.arc()
.outerRadius(300);

d3.select('body')
    .append('svg')
    .attr('width', 600)
    .attr('height', 600)
    .append('g')
    .attr('transform', 'translate(300,300)')
    .selectAll('path')
    .data(parPie(parPieData))
    .enter()
    .append('g')
    .classed('wedge', true);


d3.selectAll('g.wedge')
    .append('path')
    .attr('fill', function (d, i) {
        return cScale(i);
    })
    .attr('d', arc);

d3.selectAll('g.wedge')
    .append('text')
    .text(function (d) {
        return d.data.label.player;
    })
    .attr('text-anchor', 'middle')
    .attr('fill', 'white')
    .attr('transform', function (d, i) {
        d.innerRadius = 0;
        d.outerRadius = 300;
        return 'translate(' + arc.centroid(d) + ')';
    });
