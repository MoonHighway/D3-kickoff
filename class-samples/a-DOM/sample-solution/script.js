/*global d3 */

var tech = "HTML5,CSS3,Javascript,D3,jQuery,YUI,Underscore,Backbone,Bootstrap,Node js,Express,EJS,Morgan,CORS,Mocha,Chai,Mongo,Mongoose,Jasmine,Sinon,Angular";

var data = tech.split(",");

data = data.map(function(tech) {
    return {
        name: tech,
        size: Math.floor(Math.random() * 800) + 100
    };
});

console.log("New Data");
console.log(data);

function draw(data) { // <- B

    d3.select("body").selectAll("div")
        .data(data)
        .enter()
        .append("div");

    d3.select("body").selectAll("div")
        .data(data)
        .style("width", function(d) {
            return d.size + 'px';
        })
        .attr("data-tech", function(d) {
            return d.name;
        })
        .text(function (d, i) {
            return i + ": " + d.name;
        });

    d3.select("body").selectAll("div")
        .data(data)
        .exit()
        .remove();
}

draw(data);

setInterval(function () {
    var moved = data.shift();
    data.push(moved);
    draw(data);
}, 1500);
