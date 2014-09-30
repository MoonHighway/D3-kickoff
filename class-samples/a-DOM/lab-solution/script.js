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
