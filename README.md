# hw-06
hw-06 - Brushing and Linking

Link to GitHub Pages: `[insert your clickable hyperlink here]`

Clone this repo and work locally. Be sure to push the final version of your code (and any significant updates along the way) before submitting. To work locally, you will need to set up a Python Simple Server. Instructions for this are included below.  

## Purpose

The purpose of this assignment is to practice creating a coordinated, multiview visualization.  

## Instructions

1. Resources to support this assignment are provided in the Resources section below.  

1. You can find a reference for what your final webpage should look like in the "reference" folder of your cloned directory. 

1. Create a GitHub Page for your repo and add the link to your GitHub Page above where you see `[insert your clickable hyperlink here]`. 

1. Using the index.html file included in your repo, an *external* stylesheet (no styling should be done inline; it should all be done via external css), and an *external* javascript file (no javascript code should be included in your html file; it should all be done via external js) please do the following: 

   - Make all font on your webpage Arial. 
   - Add a title: "hw-06".
   - Add a centered header: "hw-06 - D3 Brushing & Linking".
   - Create three columns on your webpage, they should be even thirds of the page.
   - In the left column, use D3 to create a Petal_Length vs Sepal_Length scatterplot. Choose three appropriate colors (think about color maps and data types) to represent the species of each point. Color points accordingly, with 50% opacity. Your chart does not need axis titles, but do add a header to title the chart.   
   - In the middle column, use D3 to create a Petal_Width vs Sepal_Width scatterplot. Color points as you did for the first scatterplot. Your chart does not need axis titles, but do add a header to title the chart. 
   - In the right column, create a bar chart that shows count of each iris species in the dataset. There are 50 of each type, and you may hard code the data for this plot. Color bars to match the coloring of points in the scatterplots. Your chart does not need axis titles, but do add a header to title the chart.  
   - Finally, add brushing and linking. 
      - If the user brushes over points in the second scatter plot, corresponding points in the first scatter plot should be highlighted with increased opacity and an orange border and corresponding bars should be highlighted with an orange border in the bar chart. 
   - Add a centered header to the bottom of your page. The header should say "Acknowledgements" in font smaller than the font used for your first header. Under this header, add a div. Inside of this div add a bulleted list of the resources you used to complete this assignment.  

## Python Simple Server

- In order to read data from csv files, you will need to use a python simple server. To do that, follow these steps:
  - `CD` or open a terminal / command prompt window in the same folder that holds your website code.
  - Start a python simple server with one of these commands (depending on how you set python up on your machine): `python -m http.server`, `python3 -m http.server`, or `py -m http.server`. 
  - After running the command, wait for the output: `Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/)`.
  - Open your web browser (Firefox or Chrome) and navigate to the URL: http://localhost:8000. This is where you will see your code rendered. 

## Resources 

* [HTML Page on w3schools](https://www.w3schools.com/html/default.asp). (On the left-hand side of the page there is a menu bar with links to various topics.) 

* [CSS Page on w3schools](https://www.w3schools.com/css/default.asp). (On the left-hand side of the page there is a menu bar with links to various topics.) 

**Note that there are different versions of D3 (we are using version 6), so make sure the tutorials you use are up-to-date (or you at least understand what is different about v6 versus older versions).**

* [Intro to D3 - Creative Coding for the Web](https://www.fluidencodings.com/teaching-materials/cc-for-the-web/v1/page.php?pid=svg)

* [D3 Data Joins - Creative Coding for the Web](https://www.fluidencodings.com/teaching-materials/cc-for-the-web/v1/page.php?pid=data-joins) 

* Intro to D3 in 10 basic examples: https://www.d3-graph-gallery.com/intro_d3js.html (highly recommend this resource)

* D3 Coursera by Enrico Bertini: https://www.coursera.org/learn/information-visualization-programming-d3js

* What is D3? https://d3js.org/

* Example D3 Charts: https://observablehq.com/@d3/gallery

* Interactive Data Visualization for the Web by Scott Murray: Available through Northeastern Library

* Tips and Tricks: https://leanpub.com/D3-Tips-and-Tricks/read (written for v3 but well written)

* Brushing: https://d3-graph-gallery.com/graph/interactivity_brush.html#realgraph 

## Submission

* Be sure to push all changes to your repo and follow all instructions above. 
* Submit your assignment on Gradescope  
