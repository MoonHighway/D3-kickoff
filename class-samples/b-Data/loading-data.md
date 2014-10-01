Loading Data Samples
====================
D3 has tools that can help you load data.

Running the server
------------------
1. navigate to the __data-server__ folder

        [D3-intro] $ cd data-server
        [data-server] $ 

2. Install the web server files

        [data-server] $ npm install
        
3. Run the Server

        [data-server] $ npm start
        
4. A server will be running on __[http://localhost:3000/](http://localhost:3000/)__


#### Loading JSON

        d3.json("http://localhost:3000/resorts.json", function(err, data) {
          
          if (err) {
            throw err;
          }
          
          data.forEach(function(resort) {
            console.log(resort.resort + ", " + resort.state);
          });
          
        });

#### Loading CSV


        d3.csv("http://localhost:3000/course.csv", function(err, data) {
          
          if (err) {
            throw err;
          }
          
          console.log(data);
          
        });

#### Loading TSV


        d3.tsv("http://localhost:3000/timeline.tsv", function(err, data) {
                  
          if (err) {
            throw err;
          }
          
          data.forEach(function(time) {
            console.log(time.Date + " - " + time["Event Title"]);
          });
          
        });
        
        
#### Challenge
1. Goto __[JS BIN CHALLENGE](http://jsbin.com/defevu/7/edit)__
2. Load the resort data from resorts.json on the local data server
3. [solution](http://jsbin.com/defevu/8/edit)
        