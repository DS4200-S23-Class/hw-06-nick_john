/*
hw-06 - D3 Brushing & Linking
Modified: 02/27/2023
*/


const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500; 
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};


const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right; 

const FRAME1 = d3.select("#LengthScatterplot")
                  .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr('id', 'spsvg')
                    .attr("class", "frame");



function build_length_scatter_plot() {
    d3.csv("data/iris.csv").then((data) => {

    // find max X from the data 
    const MAX_X1 = d3.max(data, (d) => { return parseFloat(d.Sepal_Length); });

    // Creates the scale function using data
    const X_SCALE1 = d3.scaleLinear() 
                      .domain([0, MAX_X1]) 
                      .range([0, VIS_WIDTH]); 

    // find max Y from the data 
    const MAX_Y1 = d3.max(data, (d) => { return parseFloat(d.Petal_Length); })
                      
    // Creates the scale function using data
    const Y_SCALE1 = d3.scaleLinear() 
                        .domain([0, MAX_Y1]) 
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
          .attr("opacity", 0.5)
          .attr("class", "point")
          .style('fill', function(d) {
            return color_dict[d.Species];
        });

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


const FRAME2 = d3.select("#WidthScatterplot")
                  .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr('id', 'spsvg')
                    .attr("class", "frame");
  
  

function build_width_scatter_plot() {
    d3.csv("data/iris.csv").then((data) => {

    // find max X from the data 
    const MAX_X2 = d3.max(data, (d) => { return parseFloat(d.Sepal_Width); });

    // Creates the scale function using data
    const X_SCALE2 = d3.scaleLinear() 
                    .domain([0, MAX_X2]) 
                    .range([0, VIS_WIDTH]); 

    // find max Y from the data 
    const MAX_Y2 = d3.max(data, (d) => { return parseFloat(d.Petal_Width); })
                    
    // Creates the scale function using data
    const Y_SCALE2 = d3.scaleLinear() 
                        .domain([0, MAX_Y2]) 
                        .range([VIS_HEIGHT, 0]); 

    var color_dict = {
        'virginica': 'Blue',
        'versicolor': 'Red',
        'setosa': 'Green'
    };

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
        .call(d3.axisBottom(X_SCALE2).ticks(10)) 
            .attr("font-size", '10px'); 

    // Adds a Y axis to the scatter plot
    FRAME2.append("g") 
        .attr("transform", "translate(" + MARGINS.left + 
            "," + (MARGINS.bottom) + ")") 
        .call(d3.axisLeft(Y_SCALE2).ticks(10)) 
            .attr("font-size", '10px'); 


});
}

const FRAME3 = d3.select("#CountBarplot")
                  .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr('id', 'spsvg')
                    .attr("class", "frame");

function build_bar_plot() {

    d3.csv("data/iris.csv").then((data) => {
  
    var color_dict = {
        'virginica': 'Blue',
        'versicolor': 'Red',
        'setosa': 'Green'
        };
    
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
                        .range([VIS_HEIGHT, MARGINS.top]); 

    // Plot Points using the X scale created above
    FRAME3.selectAll("bar")  
        .data(mapped)  
        .enter()       
        .append("rect")  
        .attr("class", "bar")
        .attr("x", (d) => { return X_SCALE3(d.species); }) 
        .attr("y", (d) => { return Y_SCALE3(d.count); }) 
        .attr("width", X_SCALE3.bandwidth())
        .attr("height", (d) => { return (VIS_HEIGHT - Y_SCALE3(d.count)); })
        .attr("fill", (d) => { return color_dict[d.species]; })
        .attr("opacity", 0.5);
        
    FRAME3.append("text")
        .attr("x", (VIS_WIDTH / 2 + MARGINS.left / 2))             
        .attr("y", (MARGINS.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "20px") 
        .style("font-weight", 900)  
        .text("Count of Species");

  FRAME3.append("g")
      .attr("transform", "translate(0," + VIS_HEIGHT + ")")
      .call(d3.axisBottom(X_SCALE3));

    FRAME3.append("g")
    .attr("transform", "translate(" + MARGINS.left + 
    "," + 0 + ")") 
      .call(d3.axisLeft(Y_SCALE3));
    });
  }  


build_length_scatter_plot();
build_width_scatter_plot();
build_bar_plot();
