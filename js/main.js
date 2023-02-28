/*
hw-06 - D3 Brushing & Linking
Modified: 02/27/2023
*/

// Set variables for the frame height and width
const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500; 
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

// Use the frame dimensions to create dimensions for the visual
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right; 

// Creates the first frame to hold the scatterplot
const FRAME1 = d3.select("#LengthScatterplot")
                  .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr('id', 'spsvg')
                    .attr("class", "frame");

// Builds the scatterplot to compare lengths
function build_length_scatter_plot() {
    d3.csv("data/iris.csv").then((data) => {

    // find max X from the data 
    const MAX_X1 = d3.max(data, (d) => { return parseFloat(d.Sepal_Length); });

    // Creates the scale function using data
    const X_SCALE1 = d3.scaleLinear() 
                      .domain([0, MAX_X1+0.1]) 
                      .range([0, VIS_WIDTH]); 

    // find max Y from the data 
    const MAX_Y1 = d3.max(data, (d) => { return parseFloat(d.Petal_Length); })
                      
    // Creates the scale function using data
    const Y_SCALE1 = d3.scaleLinear() 
                        .domain([0, MAX_Y1+0.1]) 
                        .range([VIS_HEIGHT, 0]); 

    var color_dict = {
        'virginica': 'Blue',
        'versicolor': 'Red',
        'setosa': 'Green'
      };
  
    // Plot Points using the X scale created above
    FRAME1.selectAll("points")  
        .data(data)  
        .enter()       
        .append("circle")  
          .attr("cx", (d) => { return (X_SCALE1(d.Sepal_Length) + MARGINS.left); }) 
          .attr("cy", (d) => { return (Y_SCALE1(d.Petal_Length) + MARGINS.left); }) 
          .attr("r", 3)
          .attr("name", "p1")
          .attr("id", (d) => { return 'dp' + d.id; })
          .attr("class", "point")
          .style('fill', function(d) {
            return color_dict[d.Species];
          })
          .style('opacity', .5)
          .style('stroke-width', 0);
    
    // Adds the title to the first scatterplot
    FRAME1.append("text")
        .attr("x", (VIS_WIDTH / 2 + MARGINS.left / 2))             
        .attr("y", (MARGINS.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "20px") 
        .style("font-weight", 900)  
        .text("Petal_Length vs Sepal_Length");

    // Adds an X axis to the scatter plot
    FRAME1.append("g") 
          .attr("transform", "translate(" + MARGINS.left + 
                "," + (VIS_HEIGHT + MARGINS.top) + ")") 
          .call(d3.axisBottom(X_SCALE1).ticks(10)) 
            .attr("font-size", '10px'); 

    // Adds a Y axis to the scatter plot
    FRAME1.append("g") 
        .attr("transform", "translate(" + MARGINS.left + 
            "," + (MARGINS.bottom) + ")") 
        .call(d3.axisLeft(Y_SCALE1).ticks(10)) 
            .attr("font-size", '10px'); 


  });
}

// Builds the frame to hold the next scatterplot
const FRAME2 = d3.select("#WidthScatterplot")
                  .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame");
  
  
// Function to build the scatterplot to compare width
function build_width_scatter_plot() {
    d3.csv("data/iris.csv").then((data) => {

    // find max X from the data 
    const MAX_X2 = d3.max(data, (d) => { return parseFloat(d.Sepal_Width); });

    // Creates the scale function using data
    const X_SCALE2 = d3.scaleLinear() 
                    .domain([0, MAX_X2+0.6]) 
                    .range([0, VIS_WIDTH]); 

    // find max Y from the data 
    const MAX_Y2 = d3.max(data, (d) => { return parseFloat(d.Petal_Width); })
                    
    // Creates the scale function using data
    const Y_SCALE2 = d3.scaleLinear() 
                        .domain([0, MAX_Y2+1]) 
                        .range([VIS_HEIGHT, 0]); 

    var color_dict = {
        'virginica': 'Blue',
        'versicolor': 'Red',
        'setosa': 'Green'
    };

    let brush_range;

    // Function to add borders and change opacity based on brush
    function brush_select(e) {
        brush_range = e.selection;
        let bar_select = new Set();
        for (let i = 0; i < data.length; i++) {
            let sel = document.getElementById('dp' + data[i].id);
            if (in_rect(data[i])){
                bar_select.add(data[i].Species)
                sel.style.opacity = '1';
                sel.style.strokeWidth = '1';
                sel.style.stroke = 'orange';
            }else{
                sel.style.opacity = '.5';
                sel.style.strokeWidth = '0';
            }
        }

        // Categorize points based on those selected by brush 
        let unselected = ['setosa', 'versicolor', 'virginica'].filter(x => !bar_select.has(x));
        let selected = Array.from(bar_select)

        // Gives a border and changes opacity of selected points
        for (let i = 0; i < selected.length; i++) {
            let sel = document.getElementById(selected[i]);
                sel.style.strokeWidth = '3';
                sel.style.stroke = 'orange';
        }
        // Sets unselected points back to default 
        for (let i = 0; i < unselected.length; i++) {
            let sel = document.getElementById(unselected[i]);
            sel.style.opacity = '.5';
            sel.style.strokeWidth = '0';
        }
    }

    // Applies the brush border changes to the bar chart based on selections
    function in_rect(d){
        return brush_range && X_SCALE2(d.Sepal_Width) + MARGINS.left >= brush_range[0][0] && X_SCALE2(d.Sepal_Width) +
            MARGINS.left <= brush_range[1][0] && Y_SCALE2(d.Petal_Width) + MARGINS.left >= brush_range[0][1] &&
            Y_SCALE2(d.Petal_Width) + MARGINS.left <= brush_range[1][1];
    }

    // create brush
    const brush = d3.brush()
        .extent([[0, 0], [FRAME_HEIGHT, FRAME_WIDTH]])
        .on('brush end', brush_select);

    // Plot Points using the X scale created above
    FRAME2.selectAll("points")  
        .data(data)  
        .enter()       
        .append("circle")  
        .attr("cx", (d) => { return (X_SCALE2(d.Sepal_Width) + MARGINS.left); }) 
        .attr("cy", (d) => { return (Y_SCALE2(d.Petal_Width) + MARGINS.left); }) 
        .attr("r", 3)
        .attr("opacity", 0.5)
        .attr("class", "point")
        .style('fill', function(d) {
            return color_dict[d.Species];
        });

    // Adds a title to the second scatterplot
    FRAME2.append("text")
        .attr("x", (VIS_WIDTH / 2 + MARGINS.left / 2))             
        .attr("y", (MARGINS.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "20px") 
        .style("font-weight", 900)  
        .text("Petal_Width vs Sepal_Width");

    // Adds an X axis to the scatter plot
    FRAME2.append("g") 
        .attr("transform", "translate(" + MARGINS.left + 
                "," + (VIS_HEIGHT + MARGINS.top) + ")") 
        .call(d3.axisBottom(X_SCALE2).ticks(5)) 
            .attr("font-size", '10px'); 

    // Adds a Y axis to the scatter plot
    FRAME2.append("g") 
        .attr("transform", "translate(" + MARGINS.left + 
            "," + (MARGINS.bottom) + ")") 
        .call(d3.axisLeft(Y_SCALE2).ticks(10)) 
            .attr("font-size", '10px');

    // append brush
    FRAME2.append('g')
        .attr('class', 'brush')
        .call(brush);


});
}

// Creates the third frame to hold the bar plot
const FRAME3 = d3.select("#CountBarplot")
                  .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame");

// Function to build the bar plot 
function build_bar_plot() {

    d3.csv("data/iris.csv").then((data) => {
  
    var color_dict = {
        'virginica': 'Blue',
        'versicolor': 'Red',
        'setosa': 'Green'
        };
    
    // Maps the data into a mapping so it can be visualized
    var flower_data = [{'setosa': 50}, {'versicolor': 50}, {'virginica': 50}]
    var mapped = flower_data.map(d => {
        return {
            species: Object.keys(d)[0],
            count: d[Object.keys(d)[0]]
        }
        });

    // Creates the scale function using data
    const X_SCALE3 = d3.scaleBand()
                    .domain(Object.keys(color_dict))
                    .range([MARGINS.left, VIS_WIDTH])
                    .padding(0.2);

    // find max Y from the data 
    const MAX_Y3 = d3.max(mapped, (d) => { return parseInt(d.count); })

    // Creates the scale function using data
    const Y_SCALE3 = d3.scaleLinear() 
                        .domain([0, MAX_Y3]) 
                        .range([VIS_HEIGHT, 0]); 

    // Plot Points using the X scale created above
    FRAME3.selectAll("bar")  
        .data(mapped)  
        .enter()       
        .append("rect")  
        .attr("class", "bar")
        .attr("x", (d) => { return X_SCALE3(d.species); }) 
        .attr("y", (d) => { return MARGINS.top + Y_SCALE3(d.count); })
        .attr('id', (d) => { return d.species })
        .attr("width", X_SCALE3.bandwidth())
        .attr("height", (d) => { return (VIS_HEIGHT - Y_SCALE3(d.count)); })
        .attr("fill", (d) => { return color_dict[d.species]; })
        .attr("opacity", 0.5);
        
    // Adds a title to the bar chart
    FRAME3.append("text")
        .attr("x", (VIS_WIDTH / 2 + MARGINS.left / 2))             
        .attr("y", (MARGINS.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "20px") 
        .style("font-weight", 900)  
        .text("Count of Species");

    // Adds an x-axis to the barchart with appropriate labels
    FRAME3.append("g")
        .attr("transform", "translate(0," + (VIS_HEIGHT+MARGINS.top) + ")")
        .call(d3.axisBottom(X_SCALE3));

    // Adds a y-axis to the barchart with appropriate labels
    FRAME3.append("g")
        .attr("transform", "translate(" + MARGINS.left + 
        "," + MARGINS.top + ")") 
        .call(d3.axisLeft(Y_SCALE3));
        });
  }  

// Calls the functions above to create the relevant plots
build_length_scatter_plot();
build_width_scatter_plot();
build_bar_plot();
