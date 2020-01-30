//Abhängig vom Device soll die Anzahl der Iterationen angepasst werden
let iterations
if(smartphone[3].matches) {
    iterations = 4000
}else{
    iterations = 8000
}

let widthHelper = 0
let heightHelper = 0



function vizSmiley(arr) {
    //Größenbestimmung - viz2Test hat Größe 6rem
    let elem = document.getElementById("viz2Test")
    sizeHistogramHelper = elem.offsetHeight



    let sum = arr[0] + arr[1] + arr[2]
    let max = arr.indexOf(Math.max(...arr))
    
    let varBad = Math.round(arr[0]/sum*100)
    let varMedium = Math.round(arr[1]/sum*100)
    let varGood = Math.round(arr[2]/sum*100)

    let container = document.getElementById("vizSlide")
    let help = document.getElementById("vizTopGood")
    let help2 = document.getElementById("textGood")


    let height
    let heightStart
    if(smartphone[0].matches) {
        if(help2.clientHeight = 0) {
            height = (container.clientHeight - 3*sizeHistogramHelper)/3
        }else{
            height = (container.clientHeight - 3*help2.clientHeight)/3
        }
        
        heightStart = height*0.95
    }else{
        if(help.clientWidth == 0) {
            height = container.clientHeight - 4/3*sizeHistogramHelper - 2/3*sizeHistogramHelper
        }else{
            height = container.clientHeight - help.clientHeight - help2.clientHeight
        }
        
        heightStart = height*0.85
        heightStart = Math.min(heightStart, container.clientWidth/3)
    }

    textBad.innerText = varBad + "%"
    textMedium.innerText = varMedium + "%"
    textGood.innerText = varGood + "%"

    switch(max) {
        case 0: 
            divBad.style.height = heightStart + "px"
            if (varMedium/varBad < 0.2) {
                divMedium.style.height = 0.2*heightStart + "px"
            }else{
                divMedium.style.height = Math.round(varMedium/varBad*heightStart) + "px"
            }

            if (varGood/varBad < 0.2) {
                divGood.style.height = 0.2*heightStart + "px"
            }else{
                divGood.style.height = Math.round(varGood/varBad*heightStart) + "px"
            }
            break
        case 1:
            divMedium.style.height = heightStart + "px"
            
            if (varBad/varMedium < 0.2) {
                divBad.style.height = 0.2*heightStart + "px";
            }else{
                divBad.style.height = Math.round(varBad/varMedium*heightStart) + "px"
            }

            if (varGood/varMedium < 0.2) {
                divGood.style.height = 0.2*heightStart + "px"
            }else{
                divGood.style.height = Math.round(varGood/varMedium*heightStart) + "px"
            }
            break
        case 2:
            divGood.style.height = heightStart + "px"
            
            if (varBad/varGood < 0.2) {
                divBad.style.height = 0.2*heightStart + "px"
            }else{
                divBad.style.height = Math.round(varBad/varGood*heightStart) + "px"
            }
            
            if (varMedium/varGood < 0.2) {
                divMedium.style.height = 0.2*heightStart + "px"
            }else{
                divMedium.style.height = Math.round(varMedium/varGood*heightStart) + "px"
            }
            break
        default: 
            divBad.style.height = heightStart + "px"
            divMedium.style.height = heightStart + "px"
            divGood.style.height = heightStart + "px"
    
    
    }


    /*    divBad.style.paddingBottom = 0.05*height + "px"
    divMedium.style.paddingBottom = 0.05*height + "px"
    divGood.style.paddingBottom = 0.05*height + "px"
    
    divBad.style.paddingTop = 0.05*height + "px"
    divMedium.style.paddingTop = 0.05*height + "px"
    divGood.style.paddingTop = 0.05*height + "px"
    */
    
	

    //Index 0 gehört zu Bad
    

}










    





function vizHistogram(arr, deviation, pensionStart, pensionEnd, tolerance) {

    


    var viz2 = d3.select("#viz2")
    .html("")

    viz2.append("div")
    .attr("id", "viz2Header")
    .attr("class", "centerContent alignCenter")
    .append("h2")
    .text("Wie lange reicht das Geld?")


    viz2.append("div")
    .attr("id", "viz2Display")
    .attr("class", "centerContent alignCenter")
    .append("div")
    .attr("id", "viz2Histogram")
    .attr("class", "centerContent alignCenter")


    let container = document.getElementById("vizSlide")
    let changeVizIcons = container.lastElementChild
    let width2 = container.clientWidth - 2*changeVizIcons.clientWidth;

    //console.log(document.getElementById("viz2Header").clientHeight)
    let height2 = container.clientHeight - sizeHistogramHelper
    //d3.select("#viz2Test").remove()
    
    /*if(smartphone[0].matches) {
        height2 = Math.round(container.clientHeight*0.95);
    }else if(smartphone[1].matches){
        height2 = Math.round(container.clientHeight*0.98);
    }else{
        height2 = Math.round(container.clientHeight)*0.9;    
    } */
    let helpStr = "0 0 " + width2 + " " + height2

    
    
    /*let width = 960
    let height = 300*/
    let helpMargin
    helpMargin = 0.8*sizeHistogramHelper

    let margin = {top: 0, right: 0, bottom: helpMargin, left: 1.2*helpMargin}
    width = width2 - margin.left - margin.right,
    height = height2 - margin.top - margin.bottom;



    var max = d3.max(arr)
    var min = d3.min(arr)

    var svg = d3.select("#viz2Histogram")
    .html("")
    .append("svg")
    .attr("viewBox", helpStr)
    .attr("width", width2)
    .attr("height", height2)
    .append("g")
    .attr('transform', 'translate('+ margin.left +', '+ margin.top +')');
    
    
    var x = d3.scaleLinear()
        .domain([min-1,max+1])
        .range([0, width]);

    

    
    const xAxisTicks = x.ticks()
    .filter(tick => Number.isInteger(tick));
    

    var histogram = d3.histogram()
    .domain(x.domain())  // then the domain of the graphic
    .thresholds(xAxisTicks);// then the numbers of bins

    
    var bins = histogram(arr)

    var ymax = d3.max(bins, (d) => Math.max((d.length))/arr.length*100+5,100)

    var y = d3.scaleLinear()
    .range([height, 0]);
    y.domain([0, ymax]);   // d3.hist has to be called before the Y axis obviously
    svg.append("g")
    .style("font-size", "1.2rem")
    .style("font-family","'Montserrat', serif")
    .call(d3.axisLeft(y)
            .tickFormat(function(d) { return d + "%"; }));


    /*Code zur Farbzuordnung: Problem ist immer wieder, dass zu viel
    rot am Anfang bzw. zu viel grün am Ende zu einem Ungleichgewicht sorgen.activePage
    
    Deswegen soll die Mitte und das 90% Quantil bestimmt werden um diese als Farbgrenzen zu
    definieren*/

    let middle
    let end
    let sum = 0
    let j = 0

    for(let i = 0; i < bins.length; i++) {
        sum += bins[i].length

        if(bins[j].x1 >= pensionEnd) {
            if(bins[j+2] != undefined) {
                middle = bins[j+2].x0
            }else{
                middle = bins[j].x0
            }
            
        }else{
            j++
        }
        
        if(sum > 0.90*arr.length) {
            end = bins[i].x0
            break
        }
    }

    var colorScale = d3.scalePow()
        .exponent(0.001)
        .domain([bins[0].x0, middle, end])
        .range(['#d73027','#87A34A', '#1a9850'])
        .interpolate(d3.interpolateHcl);

    var tooltip = d3.select("body").append("div").attr("class", "tooltip");
    

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .style("font-size", "1.2rem")
        .style("font-family","'Montserrat', serif")
        .call(d3.axisBottom(x)
        .tickValues(xAxisTicks)
        .tickFormat(d3.format('d'))
        );

       
    
    svg.append('g')
    .attr('class', 'grid')
    .call(d3.axisLeft()
        .scale(y)
        .tickSize(-width, 0)
        .tickFormat(''))



    svg.selectAll("rect")
    .data(bins)
    .enter()
    .append("rect")
    .attr("x", 1)
    .attr("transform", function(d) {
        if (bins[1].x1-bins[1].x0 < 2) {
            return "translate(" + x(d.x0-0.5) + "," + y(d.length/arr.length*100) + ")"  
        }else{
            return "translate(" + x(d.x0) + "," + y(d.length/arr.length*100) + ")"  
        }
            
    })
    .attr("width", function(d) {
        return Math.max(x(d.x1) - x(d.x0) -1, 0);   
    })
    .attr("height", function(d) { 
            return height - y(d.length/arr.length*100) 
        })
        
    .attr("fill", function(d) {
            if(d.x0 <= end && d.x0 >= pensionStart) {
                return colorScale(d.x0);
            }else if(d.x0 > end){
                return '#1a9850';
            }else{
                return '#d73027';
            }
            
    })


    .on("mouseover", function(){
          d3.select(this).transition()
             .duration('50')
             .attr('opacity', '.85');     

             tooltip.transition()
             .duration('200')
             .style("opacity", '1')
             
    })

    .on("mousemove", function(d){
        tooltip
        .style("left", d3.event.pageX - 50 + "px")
        .style("top", d3.event.pageY - 70 + "px")
        .html(("Alter: " + d.x0 + "-" + d.x1) + "<br>" + Math.round(d.length/arr.length*100) + "%");
    })
    .on("mouseout", function(){
        d3.select(this).transition()
             .duration('50')
             .attr('opacity', '1');

        tooltip.transition()
        .duration('200')
        .style("opacity", '0')
    });

    svg.append("svg:line")
    .attr("x1", x(pensionEnd))
    .attr("y1", height)
    .attr("x2", x(pensionEnd))
    .attr("y2", 0)
    .attr("class", "reference-line")

    svg.append('text')
    .attr('x', -(height / 2)-margin.top)
    .attr('y', -margin.left/1.4)
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'middle')
    .text(function(){
        if(smartphone[4].matches) {
            return 'Prob. in %'
        }else{
            return "Wahrscheinlichkeit in %"
        }
    })

    svg.append('text')
        .attr('x', width / 2 - margin.left/2)
        .attr('y', height + helpMargin)
        .attr('text-anchor', 'middle')
        .text('Alter in Jahren')



}

function vizDifferentAges(agesArr, numbersAgesArr, iterations) {
    while (viz3Percentage.firstChild) {
        viz3Percentage.removeChild(viz3Percentage.firstChild);
    }

    //console.log(numbersAgesArr)



    let container = document.getElementById("vizSlide")
    let changeVizIcons = container.lastElementChild
    let width2 = container.clientWidth - 2*changeVizIcons.clientWidth;
    let height2
    let width3
    let height3
    let heightComp
    let bool = true
    document.getElementById("viz3SelectAgeContainer").style.display = "flex"
    if(smartphone[6].matches) {
        height2 = (container.clientHeight - sizeHistogramHelper)*0.8
        bool = false
        document.getElementById("viz3SelectAgeContainer").style.display = "none"
        document.getElementById("viz3").style.alignItems = "space-evenly"
    }else{
        height2 = (container.clientHeight - sizeHistogramHelper)*0.33
        if(smartphone[0].matches) {
            height3 = (container.clientHeight - sizeHistogramHelper)*0.8 - 2.8*sizeHistogramHelper
            heightComp = (container.clientHeight - sizeHistogramHelper)*0.8 - 2*sizeHistogramHelper
        }else{
            height3 = (container.clientHeight - sizeHistogramHelper)*0.8 - 2*sizeHistogramHelper
            heightComp = height3
        }
        if (heightComp < height2) {
            bool = false
            document.getElementById("viz3SelectAgeContainer").style.display = "none"
            height2 = (container.clientHeight - sizeHistogramHelper)*0.9
            document.getElementById("viz3").style.alignItems = "space-evenly"
        }else{
            if(smartphone[0].matches) {
                document.getElementById("viz3").style.justifyContent = "center"
            }else{
                document.getElementById("viz3").style.alignItems = "center"
            }
        }
        width3 = Math.min(height3, width2)
    }
    
    //let helpStr = "0 0 " + width2 + " " + height2
    let helpArray = new Array(2)
   
    for(let j = 0; j < agesArr.length; j++) {
        helpArray[0] = numbersAgesArr[j]
        helpArray[1] = iterations-numbersAgesArr[j]
        numbersAgesArr[j] = Math.round(numbersAgesArr[j]/iterations*100)

        
        let mainDiv = document.createElement("div")
        mainDiv.className = "centerContent flexColumn"
        mainDiv.style.width = 1/agesArr.length*width2 + "px"
        mainDiv.style.height = Math.min(height2, 1/agesArr.length*width2)

        displayDonut(agesArr, numbersAgesArr, mainDiv, j, width2,  Math.min(height2, 1/agesArr.length*width2), helpArray, j)

       

        viz3Percentage.appendChild(mainDiv)

    }

    widthHelper = width3
    heightHelper = height3
    console.log(heightHelper)


    //Erstellen des Divs zum Auswählen des Alters
    if(!smartphone[4].matches && bool == true) {

        let container2 = document.getElementById("viz3SelectAgeDonut")
        container2.innerHTML = ""
        let j = Math.round((viz3SelectAgesArray.length-1)/2)
        helpArray[0] = viz3SelectAgesArray2[j]
        helpArray[1] = iterations - viz3SelectAgesArray2[j]

        //Anpassen der Grenzen für den Slider
        donutChartSlider.min = viz3SelectAgesArray[0]
        donutChartSlider.max = viz3SelectAgesArray[viz3SelectAgesArray.length-1]
        donutChartSlider.value = viz3SelectAgesArray[j]

        let mainDiv = document.createElement("div")
        mainDiv.className = "centerContent flexColumn"
        mainDiv.style.width = "100%"
        mainDiv.style.height = height3
        mainDiv.style.alignItems = "center"
        mainDiv.id = "donutInputDiv"



        agesArr = [viz3SelectAgesArray[j]]
        numbersAgesArr =  [Math.round(viz3SelectAgesArray2[j]/iterations*100)]
    
        displayDonut(agesArr, numbersAgesArr, mainDiv, 0, width3, height3, helpArray, -1)
        
        container2.appendChild(mainDiv)

    }
    


}

//donutChartSlider.addEventListener('input', changeDonutValue(0))

function changeDonutValue(n) {
    if(n == 1) {
        donutChartSlider.value = parseInt(donutChartSlider.value) + 1
    }else if(n == -1) {
        donutChartSlider.value = parseInt(donutChartSlider.value) - 1
    }

    let j = viz3SelectAgesArray.indexOf(parseInt(donutChartSlider.value))
    let helpArray = new Array(2)
    helpArray[0] = viz3SelectAgesArray2[j]
    helpArray[1] = iterations - viz3SelectAgesArray2[j]

    let inputDiv = document.getElementById("donutInputDiv")
    if(inputDiv != null) {
        let width = widthHelper
        let height = heightHelper
        console.log(heightHelper)
        inputDiv.innerHTML = ""

        console.log(width, height)

        let numbersAgesArr = [Math.round(viz3SelectAgesArray2[j]/iterations*100)]

        displayDonut([viz3SelectAgesArray[j]], numbersAgesArr, 
            inputDiv, 0, width, height, helpArray, -1)
    }
    
}




function displayDonut(agesArr, numbersAgesArr, mainDiv, j, width2, height2, helpArray, index) {

    /*Erstellen des Divs für den Titel und die Grafiken. Je nach
        Länge des übergebenen Arrays und in Abhängigkeit der Displaygröße
        wird für jedes Alter ein solches Div erstellt. Anschließend wird
        der Titel für das Alter und das SVG-Element angehängt*/


        let header = document.createElement("div")
        header.className = "fontViz"
        header.innerText = Math.round(agesArr[j]) + " Jahre"
        header.style.width = "100%"
        mainDiv.appendChild(header)

        let viz = document.createElement("div")
        viz.className = "centerContent"
        viz.style.width = 1/agesArr.length*width2 + "px"
        viz.style.height = height2 + "px"
        mainDiv.appendChild(viz)

        /*Erstellung des SVG-Pie Charts*/
        // set the dimensions and margins of the graph
        var width =  Math.min(1/agesArr.length*width2, height2)
        var height = width
        let margin = 0.05*Math.min(width, height)

        let innerBevel = "innerbevel" + index

        // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
        var radius = Math.min(width, height)/ 2 - margin
        // Compute the position of each group on the pie:
        var pie = d3.pie()
        .value(function(d) {return d.value; })
        .sort(null);
        var data_ready = pie(d3.entries(helpArray))
 


        var svg = d3.select(viz)
        
        svg.append("svg")
        .attr("width", width)
        .attr("height", height)
        //.attr("viewBox", 0 + " " + 0 + " " + width + " " + height)
        
        svg = svg.select("svg")
        
        svg.append("defs")
        
        var defs = svg.select("defs")
            defs.append("mask")
                .attr("id", innerBevel)
            mask = defs.select("#" + innerBevel)
            mask.append("rect")
                .attr("width", "200%")
                .attr("height", "200%")
                .attr("fill", "black")
            mask.append("circle")
                .attr("cx", "0")
                .attr("cy", "0")
                .attr("r", 0.8*radius)
                .attr("fill", "white")

        svg.append("g")
            .attr("transform", "translate(" + (radius+margin) + "," + (radius+margin) + ")")

        var mainG = svg.select("g")
            //first G
            mainG.append("g")
                .attr("id", "firstG")
            var g = mainG.select("#firstG")
            
            g
            .selectAll('whatever')
            .data(data_ready)
            .enter()
            .append('path')
            
            .attr('d', d3.arc()
            .innerRadius(0.8*radius)
            .outerRadius(radius)
            )

            .attr('fill', function(d){ 
                if(d.data.key == 0) {
                    return '#1a9850'
                }else{
                    return '#d73027'
                }
            })

            if (!(Math.round(numbersAgesArr[j]) > 91)) {
                g
                .selectAll('whatever')
                .data(data_ready)
                .enter()
                .append('circle')
                .attr("cx", function(d) {
                    var help = d3.arc()
                                .innerRadius(0.6*radius)
                                .outerRadius(0.8*radius)
                    var helpStr = help(d).split(",")
                    return helpStr[6]
                })
                .attr("cy", function(d) {
                    var help = d3.arc()
                                .innerRadius(0.6*radius)
                                .outerRadius(0.8*radius)
                    var helpStr = help(d).split(",")
                    return helpStr[7].substr(0,helpStr[7].indexOf("L"))
                })
                .attr("r", 0.2*radius)
                .attr('fill', function(d){ 
                    if(d.data.key == 0) {
                        return '#1a9850'
                    }else{
                        return '#d73027'
                    }
                })

            }

            //2nd G

            mainG.append("g")
                .attr("id", "scndG")
                .attr("mask", "url(#" + innerBevel + ")")
            g = mainG.select("#scndG")
            
            g
            .selectAll('whatever')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', d3.arc()
            .innerRadius(0.6*radius)
            .outerRadius(radius)
            )

            


            .attr('fill', function(d){ 
                if(d.data.key == 0) {
                    return '#0B4022'
                }else{
                    return '#400E0B'
                }
            })
            console.log("2: ", 0.8*radius)

            if (!(Math.round(numbersAgesArr[j]) > 91)) {

                g
                .selectAll('whatever')
                .data(data_ready)
                .enter()
                .append('circle')
                .attr("cx", function(d) {
                    var help = d3.arc()
                                .innerRadius(0.6*radius)
                                .outerRadius(0.8*radius)
                    var helpStr = help(d).split(",")
                    return helpStr[6]
                })
                .attr("cy", function(d) {
                    var help = d3.arc()
                                .innerRadius(0.6*radius)
                                .outerRadius(0.8*radius)
                    
                    var helpStr = help(d).split(",")
                    return helpStr[7].substr(0,helpStr[7].indexOf("L"))
                })
                .attr("r", 0.2*radius)
                .attr('fill', function(d){ 
                    if(d.data.key == 0) {
                        return '#0B4022'
                    }else{
                        return '#400E0B'
                    }
                })
            }
            

        mainG.append("text")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .text(Math.round(numbersAgesArr[j]) + "%")
        .attr("class", "fontHeader")
        .style("font-size", function() {
            if(agesArr.length > 6) {
                return "1rem"
            }else if(agesArr.length > 4){
                return "1.2rem"
            }else if(index == -1 && 0.4*radius < sizeHistogramHelper/6*1.7) {
                return "1rem"
            }else{
                return "1.7rem"
            }
        })
        .style("padding-top", "1rem")



}


function vizDifferentAgesSelect(agesArr, numbersAgesArr, iterations) {
    let vizSelect = document.getElementById("viz3SelectAge")
    
    while (vizSelect.firstChild) {
        vizSelect.removeChild(vizSelect.firstChild);
    }

    //console.log(numbersAgesArr)



    let container = document.getElementById("vizSlide")
    let changeVizIcons = container.lastElementChild
    let width2 = container.clientWidth - 2*changeVizIcons.clientWidth;
    let height2
    height2 = (container.clientHeight - sizeHistogramHelper)*0.5
    let j = Math.round((agesArr.length - 1)/2)
    
    //let helpStr = "0 0 " + width2 + " " + height2
    let helpArray = new Array(2)
   
    helpArray[0] = numbersAgesArr[j]
    helpArray[1] = iterations-numbersAgesArr[j]

        let textPercentage = Math.round(numbersAgesArr[j]/iterations*100)
        


        /*Erstellen des Divs für den Titel und die Grafiken. Je nach
        Länge des übergebenen Arrays und in Abhängigkeit der Displaygröße
        wird für jedes Alter ein solches Div erstellt. Anschließend wird
        der Titel für das Alter und das SVG-Element angehängt*/

        let mainDiv = document.createElement("div")
        mainDiv.className = "centerContent flexColumn"
        mainDiv.style.width = 1/2*width2 + "px"
        mainDiv.style.height = height2

        let header = document.createElement("div")
        header.className = "fontViz"
        header.innerText = Math.round(agesArr[j]) + " Jahre"
        mainDiv.appendChild(header)

        let viz = document.createElement("div")
        viz.className = "centerContent"
        viz.style.width = 1/2*width2 + "px"
        viz.style.height = height2-header.clientHeight + "px"
        mainDiv.appendChild(viz)

        /*Erstellung des SVG-Pie Charts*/
        // set the dimensions and margins of the graph
        var width =  width2*0.1
        var height = height2*0.7
        let margin = 0.05*Math.min(width, height)

        // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
        var radius = Math.min(width, height) / 2 - margin
        // Compute the position of each group on the pie:
        var pie = d3.pie()
        .value(function(d) {return d.value; })
        .sort(null);
        var data_ready = pie(d3.entries(helpArray))
 
        var radiusInner = 0.8*radius
        console.log(radiusInner)

        var svg = d3.select(viz)
        
        svg.append("svg")
        .attr("width", Math.min(width, height))
        .attr("height", Math.min(width, height))
        
        svg = svg.select("svg")
        
        svg.append("defs")
        
        var defs = svg.select("defs")
            defs.append("mask")
                .attr("id", "innerbevel")
            mask = defs.select("#innerbevel")
            
            mask.append("circle")
                .attr("cx", "0")
                .attr("cy", "0")
                .attr("r", 0.8*height)
                .attr("fill", "white")

            mask.append("rect")
                .attr("fill", "black")
            

            defs.append("mask")
                .attr("id", "centrehole")
            mask = defs.select("#centrehole")
            mask.append("rect")
                .attr("x", "-100%")
                .attr("y", "-100%")
                .attr("width", "200%")
                .attr("height", "200%")
                .attr("fill", "white")
            mask.append("circle")
                .attr("cx", "0")
                .attr("cy", "0")
                .attr("r", 0.6*radius)
                .attr("fill", "white")

        svg.append("g")
            .attr("transform", "translate(" + (radius+margin) + "," + (radius+margin) + ")")
            .attr("mask", "url(#centrehole)")

        var mainG = svg.select("g")
            //first G
            mainG.append("g")
                .attr("id", "firstG")
            var g = mainG.select("#firstG")
            
            g
            .selectAll('whatever')
            .data(data_ready)
            .enter()
            .append('path')
            
            .attr('d', d3.arc()
            .innerRadius(0.8*radius)
            .outerRadius(radius)
            )

            .attr('fill', function(d){ 
                if(d.data.key == 0) {
                    return '#1a9850'
                }else{
                    return '#d73027'
                }
            })

            if (!(Math.round(textPercentage) < 5 || Math.round(textPercentage) > 95)) {
                g
                .selectAll('whatever')
                .data(data_ready)
                .enter()
                .append('circle')
                .attr("cx", function(d) {
                    var help = d3.arc()
                                .innerRadius(0.6*radius)
                                .outerRadius(0.8*radius)
                    var helpStr = help(d).split(",")
                    return helpStr[6]
                })
                .attr("cy", function(d) {
                    var help = d3.arc()
                                .innerRadius(0.6*radius)
                                .outerRadius(0.8*radius)
                    var helpStr = help(d).split(",")
                    return helpStr[7].substr(0,helpStr[7].indexOf("L"))
                })
                .attr("r", 0.2*radius)
                .attr('fill', function(d){ 
                    if(d.data.key == 0) {
                        return '#1a9850'
                    }else{
                        return '#d73027'
                    }
                })

            }

            //2nd G

            mainG.append("g")
                .attr("id", "scndG")
                .attr("mask", "url(#innerbevel)")
            g = mainG.select("#scndG")
            
            g
            .selectAll('whatever')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', d3.arc()
            .innerRadius(0.6*radius)
            .outerRadius(0.8*radius)
            )

            .attr('fill', function(d){ 
                if(d.data.key == 0) {
                    return '#0B4022'
                }else{
                    return '#400E0B'
                }
            })


            if (!(Math.round(textPercentage) < 5 || Math.round(textPercentage) > 95)) {

                g
                .selectAll('whatever')
                .data(data_ready)
                .enter()
                .append('circle')
                .attr("cx", function(d) {
                    var help = d3.arc()
                                .innerRadius(0.6*radius)
                                .outerRadius(0.8*radius)
                    var helpStr = help(d).split(",")
                    return helpStr[6]
                })
                .attr("cy", function(d) {
                    var help = d3.arc()
                                .innerRadius(0.6*radius)
                                .outerRadius(0.8*radius)
                    
                    var helpStr = help(d).split(",")
                    return helpStr[7].substr(0,helpStr[7].indexOf("L"))
                })
                .attr("r", 0.2*radius)
                .attr('fill', function(d){ 
                    if(d.data.key == 0) {
                        return '#0B4022'
                    }else{
                        return '#400E0B'
                    }
                })
            }
            

    
        


        mainG.append("text")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .text(Math.round(textPercentage) + "%")
        .attr("class", "fontHeader")
        .style("font-size", "1.7rem")
        .style("padding-top", "1rem")

        
        //.style("opacity", 0.7)

        /*let iconContainer = document.createElement("div")
        iconContainer.className = "viz3PercentageAgeIcon"
        main.appendChild(iconContainer)

        let icon = document.createElement("img")
        icon.style
        if(numbersAgesArr[j] > 50) {
            icon.src = "svg/check.svg"
            icon.alt = "Check Icon"
        }else{
            icon.src = "svg/stop.svg"
            icon.alt = "Stop Icon"
        }
        iconContainer.appendChild(icon)

        

        let text = document.createElement("div")
        text.className = "viz3PercentageText"
        text.innerText = numbersAgesArr[j] +"%"
        main.appendChild(text)*/

        vizSelect.appendChild(mainDiv)

}

        
    



/*https://stackoverflow.com/questions/15164655/generate-html-table-from-2d-javascript-array*/
function makeTable(array, element) {
    element.innerHTML = ""
    
    for (let i = 0; i < array.length; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < array[i].length; j++) {
            let cell = document.createElement('td');
            let text
            if(array[i][j] == null) {
                text = document.createTextNode("");
            }else{
                text = document.createTextNode(array[i][j]);
            }
            cell.appendChild(text)
            row.appendChild(cell)
        }
        table1Body.appendChild(row)
    }
}








