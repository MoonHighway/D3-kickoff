//  Nest Data to Populate Drop Down List
var nest = d3.nest()
    .key(function(d) {
        return d.state;
    })
    .entries(resorts);

console.log(nest);

// Add Options 'none' to beginning of Array
nest.unshift({ key: 'none' });

//  Populate The Drop Down List
var ddl = d3.select('select');

ddl.selectAll('option')
    .data(nest)
    .enter()
    .append('option')
    .text(function(d) {
        return d.key;
    });

// Add a change handler to the drop down list
ddl.on('change', function() {
    var state = d3.select(this).node().value;
    print(resorts, state);
});

// print the bar graph
print(resorts);

// Encapsulate functionality in print function that takes resorts array and state string
function print(resorts, state) {

    //  Remove All Divs
    d3.select("body div").remove();

    // Sort the Array by base totals
    resorts.sort(function(a,b) {return b.currentBase-a.currentBase;});

    // Add a <div class="line"> for each resort, setup data here
    d3.select("body")
        .append("div")
        .attr("class", "chart")
        .selectAll("div.line")
        .data(resorts)
        .enter()
        .append("div")
        .attr("class","line");

    // Append a <div class="label"> to each <div class="line">
    d3.selectAll("div.line")
        .append("div")
        .attr("class", "label")
        .text(function(d) {
            return d.resort;
        });

    // Append the <div class="bar"> to each <div class="line">
    d3.selectAll('div.line')
        .append("div")
        .attr("class", "bar")
        .style("width", function (d) {
            return d.currentBase + "px";
        })
        .text(function(d) {
            return d.currentBase + "\"";
        });

    // Add highlight class to all selected States
    d3.selectAll('div.bar')
        .filter(function (d) {
            return d.state == state;
        })
        .classed('highlight', true);

}


