/*global resorts, d3 */

//
//  TODO #3: Nest Data to Populate Drop Down List
//

//
//  TODO #4: Add Options 'none' to beginning of Array
//

//
//  TODO #4: Populate The Drop Down List
//

//
//  TODO #5: Add a change handler to the drop down list
//

//
//  TODO #1: print the bar graph
//

//
//  TODO #1: Encapsulate functionality in print function that takes resorts array and state string
//


//
//  TODO #2: Remove All Divs
//

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

//
//  TODO #6: Add highlight class to all selected States
//