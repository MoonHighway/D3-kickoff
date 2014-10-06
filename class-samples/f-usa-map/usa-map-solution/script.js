var width = 960,
    height = 500;

var projection = d3.geo.albersUsa()
    .scale(1000)
    .translate([width/2, height/2]);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("http://localhost:3000/us-10m.json", function (error, topology) {

    svg.append('g')
        .selectAll("path")
        .data(topojson.feature(topology, topology.objects.states).features)
        .enter().append("path")
        .attr("d", path);

    d3.json("http://localhost:3000/resorts.json", function(err, data) {

        var visitsScale = d3.scale.linear()
            .domain(d3.extent(data.map(function(d) {
                return d.visits;
            })))
            .range([1, 20]);

        svg.append("g")
            .attr("class", "bubble")
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("r", function(d, i) {
                return visitsScale(d.visits);
            })
            .attr("transform", function(d) {
                return "translate(" + projection([
                    d.longitude,
                    d.latitude
                ]) + ")"
            });

    });

});