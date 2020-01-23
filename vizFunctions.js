

function vizSmiley(arr) {
    let sum = arr[0] + arr[1] + arr[2]
    let max = arr.indexOf(Math.max(...arr))
    
    let varBad = Math.round(arr[0]/sum*100)
    let varMedium = Math.round(arr[1]/sum*100)
    let varGood = Math.round(arr[2]/sum*100)

    let container = document.getElementById("vizMain")
    let help = document.getElementById("vizTopGood")
    let help2 = document.getElementById("textGood")
    let slideIcons = document.getElementById("vizSlideIcons")
    let help3 = document.getElementById("vizTopGood")


    let height
    let heightStart
    if(smartphone[0].matches) {
        height = (container.clientHeight - slideIcons.clientHeight - 3*help2.clientHeight)/3
        heightStart = height*0.95
    }else{
        height = container.clientHeight - slideIcons.clientHeight - help.clientHeight - help2.clientHeight
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

    let ageDiff = pensionEnd-pensionStart




    let container = document.getElementById("viz2")
    let width2 = Math.round(container.parentNode.clientWidth);
    let height2
    if(smartphone[0].matches) {
        height2 = Math.round(container.parentNode.clientHeight*0.95);
    }else if(smartphone[1].matches){
        height2 = Math.round(container.parentNode.clientHeight*0.98);
    }else{
        height2 = Math.round(container.parentNode.clientHeight)*0.9;    
    } 
    let helpStr = "0 0 " + width2 + " " + height2

    
    
    /*let width = 960
    let height = 300*/

    let margin = {top: 10, right: 30, bottom: 50, left: 70}
    width = width2 - margin.left - margin.right,
    height = height2 - margin.top - margin.bottom;



    var max = d3.max(arr)
    var min = d3.min(arr)


    var svg = d3.select("#viz2Histogram")
    .html("")
    .append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", helpStr)
    .append("g")
    .attr('transform', 'translate('+ margin.left +', '+ margin.top +')');

    /*var svg = d3.select('#viz2Histogram')
    .html("")
    .append("svg")
    //.attr("width", width + margin.left + margin.right)
    //.attr("height", width + margin.left + margin.right)
    .attr('viewBox','0 0 ' + width + ' ' + height)
    .attr('preserveAspectRatio','xMinYMin meet')
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")")*/

    
    
    var x = d3.scaleLinear()
        .domain([min-1,max+1])
        //.nice(numTicks)  
        .range([0, width]);

    

    
    const xAxisTicks = x.ticks()
    .filter(tick => Number.isInteger(tick));
    

    var histogram = d3.histogram()
    .domain(x.domain())  // then the domain of the graphic
    .thresholds(xAxisTicks);// then the numbers of bins

    
    var bins = histogram(arr)
    //console.log(bins)

   

    /*let count = 0
    for(let i = 0; i < bins.length; i++) {
        if (bins[i] === undefined || bins[i].length == 0) {
            count++
        }
    }

    if(count <= 4) {
        count-=2
    }*/

    


    /*if(deviation == 0) {
        bins[1]["x0"] -= 0.5
        bins[1]["x1"] -= 0.5
    }*/
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
        return x(d.x1) - x(d.x0) -1;   
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
             //.style("display", "inline-block");
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
        //.style("display", "none");
        .style("opacity", '0')
    });
    /*    .style("fill", function(d) {
        let retColor
        if(d.x0 < pensionEnd - tolerance) {
            retColor = "#FF8975"
        }else if (d.x0 > pensionEnd + tolerance) {
            retColor = "#7CCC7D"
        }else{
            retColor = "#FFC10E"
        }
        return retColor
    })*/

    svg.append("svg:line")
    .attr("x1", x(pensionEnd))
    .attr("y1", height)
    .attr("x2", x(pensionEnd))
    .attr("y2", 0)
    .attr("class", "reference-line")

    svg.append('text')
    .attr('x', -(height / 2)-margin.top)
    .attr('y', -50)
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'middle')
    .text('Wahrscheinlichkeit in %')

    svg.append('text')
        .attr('x', width / 2)
        .attr('y', height+ 40)
        .attr('text-anchor', 'middle')
        .text('Alter in Jahren')



}

function vizDifferentAges(agesArr, numbersAgesArr, iterations) {
    while (viz3Percentage.firstChild) {
        viz3Percentage.removeChild(viz3Percentage.firstChild);
    }

    //console.log(numbersAgesArr)



    let container = document.getElementById("viz3")
    let width2 = Math.round(container.parentNode.clientWidth)*0.95;
    let height2 = Math.round(container.parentNode.clientHeight)*0.3;
    //let helpStr = "0 0 " + width2 + " " + height2
    let helpArray = new Array(2)
   
    for(let j = 0; j < agesArr.length; j++) {
        helpArray[0] = numbersAgesArr[j]
        helpArray[1] = iterations-numbersAgesArr[j]

        if(j == 2) {
            //console.log(helpArray)
        }
        numbersAgesArr[j] = Math.round(numbersAgesArr[j]/iterations*100)
        


        /*Erstellen des Divs für den Titel und die Grafiken. Je nach
        Länge des übergebenen Arrays und in Abhängigkeit der Displaygröße
        wird für jedes Alter ein solches Div erstellt. Anschließend wird
        der Titel für das Alter und das SVG-Element angehängt*/

        let mainDiv = document.createElement("div")
        mainDiv.className = "centerContent flexColumn"
        mainDiv.style.width = 1/agesArr.length*width2 + "px"
        mainDiv.style.height = height2

        let header = document.createElement("div")
        header.className = "fontViz"
        header.innerText = Math.round(agesArr[j]) + " Jahre"
        mainDiv.appendChild(header)

        let viz = document.createElement("div")
        viz.style.width = 1/agesArr.length*width2 + "px"
        viz.style.height = height2*0.8 + "px"
        mainDiv.appendChild(viz)

        /*Erstellung des SVG-Pie Charts*/
        // set the dimensions and margins of the graph
        var width =  1/agesArr.length*width2
        var height = height2
        margin = 0.05*Math.min(width, height)

        // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
        var radius = Math.min(width, height) / 2 - margin

        var svg = d3.select(viz)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        // Compute the position of each group on the pie:
        var pie = d3.pie()
        .value(function(d) {return d.value; })
        .sort(null);
        var data_ready = pie(d3.entries(helpArray))

        // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        svg
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
                return '#1a9850'
            }else{
                return '#d73027'
            }
         })
        .attr("stroke", "white")
        .style("stroke-width", "0.2rem")


        svg.append("text")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .text(Math.round(numbersAgesArr[j]) + "%")
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

        viz3Percentage.appendChild(mainDiv)

    }
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








