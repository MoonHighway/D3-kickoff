Working with Data
=================
The following samples demonstrate how to work with array data using D3.

####  Min and Max

        var arr = [1,3,5,3,5,8,9,3,12,5,8,9,6];
        
        var min = d3.min(arr);
        var max = d3.max(arr);
        
        console.log("between " + min + " and " + max);    //   between 1 and 12

#### Extent

        var arr = [1,3,5,3,5,8,9,3,12,5,8,9,6];
        
        var ext = d3.extent(arr);
        
        console.log( ext );  // [1, 12]


####  Sum Median, Mean

        var arr = [1,3,5,3,5,8,9,3,12,5,8,9,6];
        
        var sum = d3.sum(arr);
        var median = d3.median(arr);
        var mean = d3.mean(arr);
        
        console.log( sum );        //  77
        console.log( median );     //  5
        console.log( mean );       //  5.923076923076923


####  Sorting Arrays

        var arr = [1,3,5,3,5,8,9,3,12,5,8,9,6];
        
        var asc = arr.sort(d3.ascending);
        console.log( asc );                         //  [1, 3, 3, 3, 5, 5, 5, 6, 8, 8, 9, 9, 12]
        
        var desc = arr.sort(d3.descending);
        console.log( desc );                        //  [12, 9, 9, 8, 8, 6, 5, 5, 5, 3, 3, 3, 1]

####  Quantile

        var arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
        
        var beginning = d3.quantile(arr, 0);
        var first_q = d3.quantile(arr, 0.25);
        var half = d3.quantile(arr, 0.50);
        var third_q = d3.quantile(arr, 0.75);
        var end = d3.quantile(arr, 1);
        
        console.log(beginning);                  // 1
        console.log(first_q);                    // 5.75
        console.log(half);                       // 10.5
        console.log(third_q);                    // 15.25
        console.log(end);                        // 20


#### Bisect

        var arr = [1,2,3,3,4,4.5,4.9,5,5.5,5.9,19,20];
        
        
        // Gets the insertion index to maintain order
        var beginning = d3.bisect(arr, 3);
        var first_q = d3.bisect(arr, 4);
        var half = d3.bisect(arr, 4.2);
        var third_q = d3.bisect(arr, 4.6);
        var end = d3.bisect(arr, 17);
        
        console.log(beginning);                    // 4
        console.log(first_q);                      // 5
        console.log(half);                         // 5
        console.log(third_q);                      // 6
        console.log(end);                          // 10



####  Using On Objects

        var arr = [
            {
                "resort": "Squaw Valley",
                "currentBase": 222,
                "forecast": 12,
                "difficulty": "expert",
                "state": "CA",
                "latitude": 39.196299,
                "longitude": -120.235446,
                "visits": 250412
            },
            {
                "resort": "Kirkwood",
                "currentBase": 330,
                "forecast": 24,
                "difficulty": "expert",
                "state": "CA",
                "latitude": 38.702308,
                "longitude": -120.072244,
                "visits": 148213
            },
            {
                "resort": "Heavenly",
                "currentBase": 134,
                "forecast": 16,
                "difficulty": "intermediate",
                "state": "CA",
                "latitude": 38.939926,
                "longitude": -119.977187,
                "visits": 298213
                
            },
            {
                "resort": "Snowbird",
                "currentBase": 303,
                "forecast": 6,
                "difficulty": "expert",
                "state": "UT",
                "latitude": 40.583284,
                "longitude": -111.650758,
                "visits": 138787
                
            },
            {
                "resort": "Alpental",
                "currentBase": 212,
                "forecast": 2,
                "difficulty": "expert",
                "state": "WA",
                "latitude": 47.438104,
                "longitude": -121.417603,
                "visits": 38787
            },
            {
                "resort": "Vail",
                "currentBase": 230,
                "forecast": 20,
                "difficulty": "advanced",
                "state": "CO",
                "latitude": 39.640264,
                "longitude": -106.374195,
                "visits": 538724
            },
            {
                "resort": "The Canyons",
                "currentBase": 412,
                "forecast": 2,
                "difficulty": "intermediate",
                "state": "UT",
                "latitude": 40.686284,
                "longitude": -111.553521,
                "visits": 200123
            },
            {
                "resort": "Big Sky",
                "currentBase": 305,
                "forecast": 23,
                "difficulty": "expert",
                "state": "MT",
                "latitude": 45.261781,
                "longitude": -111.308024,
                "visits": 100991
                
            },
            {
                "resort": "Sun Valley",
                "currentBase": 340,
                "forecast": 2,
                "difficulty": "advanced",
                "state": "ID",
                "latitude": 43.697129,
                "longitude": -114.351717,
                "visits": 216337
            },
            {
                "resort": "Taos",
                "currentBase": 222,
                "forecast": 12,
                "difficulty": "advanced",
                "state": "NM",
                "latitude": 36.596000,
                "longitude": -105.454500,
                "visits": 201445
        
            },
            {
                "resort": "Ski Liberty",
                "currentBase": 175,
                "forecast": 4,
                "difficulty": "beginner",
                "state": "PA",
                "latitude": 39.770025,
                "longitude": -77.373256,
                "visits": 411121
            },
            {
                "resort": "Steamboat Springs",
                "currentBase": 275,
                "forecast": 10,
                "difficulty": "advanced",
                "state": "CO",
                "latitude": 40.484977,
                "longitude": -106.831716,
                "visits": 217500
            },
            {
                "resort": "Mad River Glen",
                "currentBase": 200,
                "forecast": 8,
                "difficulty": "advanced",
                "state": "VT",
                "latitude": 44.202570,
                "longitude": -72.916820,
                "visits": 198231
            },
            {
                "resort": "Mount Bachelor",
                "currentBase": 205,
                "forecast": 3,
                "difficulty": "advanced",
                "state": "OR",
                "latitude": 43.979167,
                "longitude": -121.688611,
                "visits": 277313
            },
            {
                "resort": "Boyne Mountain",
                "currentBase": 245,
                "forecast": 1,
                "difficulty": "intermediate",
                "state": "MI",
                "latitude": 45.332073,
                "longitude": -85.020465,
                "visits": 222222
            },
             {
                "resort": "Jackson Hole",
                "currentBase": 415,
                "forecast": 9,
                "difficulty": "expert",
                "state": "WY",
                "latitude": 43.479929,
                "longitude": -110.762428,
                "visits": 319312
            }
        ];
        
#### Max or Min

        // The Max Current Base
        var max = d3.max(arr, function(resort) {
          return resort.currentBase;
        });
        
        var maxResort = arr.filter(function(resort) {
          return resort.currentBase == max;
        })[0];
        
        console.log( maxResort.resort + ": " + max );

#### Extent

        // The Max Current Base
        var ext = d3.extent(arr, function(resort) {
          return resort.currentBase;
        });
        
        
        console.log( ext );

#### Sorting

        // Sort By Current Base
        arr.sort(function(a,b) {return b.currentBase-a.currentBase;});
        
        var namesAndTotals = arr.map(function(resort) {
          return {
            name: resort.resort,
            total: resort.currentBase
          };
        });
        
        namesAndTotals.forEach(function(item) {
          console.log(item.name + ": " + item.total);
        });
    
####  Nesting Data

        // Groups Records By State, then difficulty;
        var nest = d3.nest()
          .key(function(d) {
             return d.state;
          })
          .key(function(d) {
             return d.difficulty;
          })
          .entries(arr);
        
        console.log( nest );

        

*note: [more info at d3 API](https://github.com/mbostock/d3/wiki/Arrays)*

