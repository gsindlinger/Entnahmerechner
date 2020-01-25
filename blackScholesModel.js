
//Modelliert Black Scholes
//https://github.com/d3/d3-random
function blackScholesProcess(mu, sigma, retArray, currentStateArray) {

  let normalDist = d3.randomNormal(0,1)  
  //Drift-Correction
  //let retArray = new Array()
  //let currentStateArray
  //currentStateArray.push(1)
  //retArray.push(0)




  //for (let i = 1; i < duration; i++) {
      let i = retArray.length
        //console.log("i: " + i)
      let randNum = normalDist()
      currentStateArray.push(
      currentStateArray[i-1]*Math.exp((mu-0.5*Math.pow(sigma,2)+sigma*randNum)))
      retArray.push(currentStateArray[i]/currentStateArray[i-1]-1)

    //}
  return [retArray, currentStateArray]
}


function calcAgeProzess(performance, sigma, einmalbetrag, renteVal, laufzeit) {

    

    //const blackScholes = blackScholesProcess(Math.log(1+performance), sigma, laufzeit+30)
    let iVorEntnahme = einmalbetrag
    let helpArray = new Array()
    helpArray.push(einmalbetrag)
    let i = 1

    let quarterArray = new Array(3)
    let checkQuarterArray = [0,0,0]


    let renditeArray = new Array()
    let currentStateArray = new Array()
    renditeArray.push(0)
    currentStateArray.push(1)
    while (true) {
        //Überprüfe, wann Abbruchbedingung erfüllt ist
        
        
        [renditeArray, currentStateArray] = blackScholesProcess(Math.log(1+performance),sigma,renditeArray, currentStateArray)
        let iBlackScholes = roundDigitsNum(renditeArray[i],4)
        
        /*
        Falls man eine optimale Verwendung der renteVal anstrebt macht es Sinn
        die renteVal in jedem Schritt neu zu berechnen

        renteVal = roundDigitsNum(calcrenteVal(iVorEntnahme,iBlackScholes,laufzeit-i),2)
        */

        let iNachEntnahme = roundDigitsNum(iVorEntnahme-renteVal,2)

        if(iNachEntnahme < einmalbetrag*0.75 && checkQuarterArray[0] == 0) {
            quarterArray[0] = i
            checkQuarterArray[0] = 1
        }
        if(iNachEntnahme < einmalbetrag*0.5 && checkQuarterArray[1] == 0) {
            quarterArray[1] = i
            checkQuarterArray[1] = 1
        }
        if(iNachEntnahme < einmalbetrag*0.25 && checkQuarterArray[2] == 0) {
            quarterArray[2] = i
            checkQuarterArray[2] = 1
        }
        
        if(i > laufzeit + 20 || iNachEntnahme <= 0.005*einmalbetrag) {
            //arrEntnahme.push([alterStart+i,i, null,iVorEntnahme,0, 0])
            break
        }else if(i == 100) {
            //window.alert("Ein möglicher Pfad würde länger als 100 Jahre halten - Abbruch an dieser Stelle")
            break
        }else{
            //arrEntnahme.push([iNachEntnahme, iVorEntnahme])
            iVorEntnahme = roundDigitsNum(iNachEntnahme*(1+iBlackScholes),2)
            helpArray.push(iVorEntnahme)
        }
        i++



        
    }

    for(let j = 0; j < quarterArray.length; j++) {
        if(quarterArray[j] == undefined) {
            quarterArray[j] = i
        }
    }
    kontrolle.push(renditeArray)
    kontrolle2.push(helpArray)
    return i
    
}

function calculateViz(performance, sigma, einmalbetrag, 
    alterStart, alterEnde) {
    

        
    //Abhängig von den Input-Parametern wird der Zufallesgenerator geseeted
    Math.seedrandom("Test" + performance + sigma + einmalbetrag + alterStart + alterEnde)    


    kontrolle = new Array()
    kontrolle2 = new Array()
    const toleranz = 1
    

    //Abhängig vom Device soll die Anzahl der Iterationen angepasst werden
    let iterations
    if(smartphone[3].matches) {
        iterations = 4000
    }else{
        iterations = 8000
    }
    
    const laufzeit = alterEnde-alterStart
    let renteVal = renteRange.input.value*12

    let smileyArray = [0,0,0]
    let histogramArray = new Array()


    /*//Percentage-Viz
    let numAges

    if(laufzeit < 5) {
        numAges = 2
    }else if(laufzeit < 10) {
        numAges = 3
    }else if(laufzeit < 15){
        numAges = 4
    }else if(laufzeit < 25) {
        numAges = 5
    }else{
        numAges = 6
    }

 
    let agesArray = equidistantArr(alterStart, alterEnde+5, numAges)
    let agesArray2 = new Array(agesArray.length)
    for(j = 0; j < agesArray.length; j++) {
        agesArray2[j] = 0
    }*/

    let agesArray = new Array()
    let agesArray2 = new Array()

    
    let startAgePercentage = Math.ceil((alterStart + 6)/5)*5
    let endAgePercentage = Math.ceil((alterEnde+11)/5)*5
    if(endAgePercentage-startAgePercentage > 25) {
        for(let j = startAgePercentage; j <= endAgePercentage; j+=10) {
                agesArray.push(j)
                agesArray2.push(0)
        }
    }else{
        for(let j = startAgePercentage; j <= endAgePercentage; j+=5) {
            agesArray.push(j)
            agesArray2.push(0)
        }
    }
    
    



    //Percentage-Table-Viz
    /*let percArray = new Array()
    let step
    let ageDifference = endAlter-startAlter
    if(ageDifference < 5) {
        step = 2
    }else if(ageDifference < 10) {
        step = 3
    }else if(ageDifference < 18) {
        step = 4
    }else if(ageDifference < 30) {
        step = 5
    }else{
        step = 6
    }

    for(let j = startAlter; j < endAlter; j+= step) {
        percArray.push([j+startAlter,0])

    }*/


    
    for(let i = 0; i<iterations; i++) {
        let compVal = calcAgeProzess(performance,sigma,einmalbetrag,renteVal, laufzeit)
        //Perc-Viz
        /*for(let j = 0; j < percArray.length; j++) {
            if(compVal < percArray[j]) {
                percArray[j][1]++
            }
        }*/


        histogramArray.push(compVal+alterStart)
        if(compVal < laufzeit-toleranz) {
            smileyArray[0]++
        }else if(compVal > laufzeit+toleranz) {
            smileyArray[2]++
        }else{
            smileyArray[1]++
        }

        for(let j = 0; j < agesArray.length; j++) {
            if (compVal + alterStart >= agesArray[j]) {
                agesArray2[j]++
            }
        }

    }

    
    vizSmiley(smileyArray)
    vizHistogram(histogramArray, sigma, alterStart, alterEnde, toleranz)
    vizDifferentAges(agesArray, agesArray2, iterations)
    
}

