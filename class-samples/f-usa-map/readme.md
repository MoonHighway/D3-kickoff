Creating a Maps
===============
Maps are created using SVG.  d3 has a built in geo.path() function that can be used to draw __topojson__ maps.


### Making Maps
1. [Make a GEO JSON Map Here](http://geojson.io/#map=11/39.0941/-120.0455)
2. Convert it to topojson

        $ topojson -o output.json input.json
        
3. Use the __d3.geo.path()__ to draw the map

    var path = d3.geo.path();
    
        var svg = d3.select("body").append("svg")
                .attr("width", 500)
                .attr("height", 350);
    
        var g = svg.append('g');
    
        d3.json("output.json", function (error, topo) {
    
            g.selectAll("path")
                    .data(topojson.feature(topo, topo.objects.yourObj).features)
                    .enter()
                    .append("path")
                    .attr("d", path);
        });
        
4. Zoom, rotate, and scale your map appropriately