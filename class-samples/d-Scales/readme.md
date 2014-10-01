D3 Scales
=========
Scales are a vital part to data visualization, and D3 comes packed with tools to work with them.

[Quantitative Scales](https://github.com/mbostock/d3/wiki/Quantitative-Scales)
---------------------
* [Linear Scale Sample - Overview](http://jsbin.com/qaqesi/9/quiet)
* [Time Scale](http://jsbin.com/liqago/4/quiet)
* [Build Sample](http://jsbin.com/qaqesi/1/edit)

#### Simple Sample

        var data = [1,2,3,4,5,6,7,8,9,10];
        
        var linear = d3.scale.linear() 
                       .domain([1, 10]) 
                       .rangeRound([1, 100]);   
        
        var pow = d3.scale.pow().exponent(2);
        var log = d3.scale.log();
        
        var lines = [];
        var pows = [];
        var logs = [];
        
        data.forEach(function(number) {
          
          lines.push( linear(number) );
          pows.push( pow(number) );
          logs.push( log(number) );
          
        });
        
        console.log( data );
        console.log( lines );
        console.log( pows );
        console.log( logs );


[Ordinal Scales](https://github.com/mbostock/d3/wiki/Ordinal-Scales)
---------------------
* [Ordinal Sample (1 - 9)](http://jsbin.com/sabuwo/1/edit) 


### Bonus Challenge
Can you colors to the bars on your ski resort bar graph?
[solution](http://jsbin.com/nubuxe/1/quiet)

### Bonus Challenge
Can you build your own timeline with significant dates?

