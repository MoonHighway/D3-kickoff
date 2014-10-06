var width = 960,
    height = 500;

var projection = d3.geo.albersUsa()
    .scale(43000)
    .translate([width*14.2, height*4.35]);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var g = svg.append('g');


d3.json("http://localhost:3000/tahoe-topo.json", function (error, topology) {

    g.selectAll("path")
        .data(topojson.feature(topology, topology.objects.tahoe).features)
        .enter()
        .append("path")
        .attr("d", path);

    d3.json("http://localhost:3000/resorts.json", function(err, data) {

        var visitsScale = d3.scale.linear()
            .domain(d3.extent(data.map(function(d) {
                return d.visits;
            })))
            .range([1, 40]);

        var caResorts = data.filter( function (d) {
            return d.state == "CA";
        });

        svg.append("g")
            .attr("class", "bubble")
            .selectAll("circle")
            .data(caResorts)
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

        svg.append("g")
            .selectAll('text')
            .data(caResorts)
            .enter()
            .append('text')
            .attr("transform", function(d) {
                return "translate(" + projection([
                    d.longitude,
                    d.latitude
                ]) + ")"
            })
            .text(function(d, i) {
                return d.resort;
            });


    });

});
