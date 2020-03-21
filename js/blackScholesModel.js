//Abhängig vom Device soll die Anzahl der Iterationen angepasst werden
let iterations
if(smartphone[3].matches) {
    iterations = 5000
}else{
    iterations = 10000
}

//Modelliert den Black-Scholes-Prozess unter der Wahl der Parameter. Dabei wird die d3-RandomNormal-Library verwendet
//https://github.com/d3/d3-random
function blackScholesProcess(mu, sigma, retArray, currentStateArray) {

    let normalDist = d3.randomNormal(0,1)  
    let i = retArray.length
    let randNum = normalDist()
    currentStateArray.push(
    currentStateArray[i-1]*Math.exp((mu-0.5*Math.pow(sigma,2)+sigma*randNum)))
    retArray.push(currentStateArray[i]/currentStateArray[i-1]-1)

    return [retArray, currentStateArray]
}


/*Modelliert EINEN kompletten Entnahmeprozess unter Berücksichtigung der Black-Scholes-Formel*/
function calcAgeProzess(performance, sigma, einmalbetrag, renteVal, laufzeit) {

    

    let iVorEntnahme = einmalbetrag
    let helpArray = new Array()
    helpArray.push(einmalbetrag)
    let i = 1

    let renditeArray = new Array()
    let currentStateArray = new Array()
    renditeArray.push(0)
    currentStateArray.push(1)
    while (true) {
        
        [renditeArray, currentStateArray] = blackScholesProcess(Math.log(1+performance),sigma,renditeArray, currentStateArray)
        let iBlackScholes = roundDigitsNum(renditeArray[i],4)
        let iNachEntnahme = roundDigitsNum(iVorEntnahme-renteVal,2)

        /*Abbruchbedingung: Wenn der Betrag kleiner als eine Toleranzmenge ist(0.005*einmalbetrag) oder
        die Iterationen die Laufzeit um 20 Jahre überschreitet wird abgebrochen. Die zweite Bedingung dient lediglich
        zur Absicherung und wird eigentlich nicht verwendet*/
        if(i > laufzeit + 20 || iNachEntnahme <= 0.005*einmalbetrag) {
            break
        }else if(i == 100) {
            break
        }else{
            iVorEntnahme = roundDigitsNum(iNachEntnahme*(1+iBlackScholes),2)
            helpArray.push(iVorEntnahme)
        }
        i++
    }
    return i
}

/*Simuliert den Entnahmeprozess je nach Wahl der iterations dementsprechend häufig und gibt das Ergebnis
an die Visualisierungsfunktionen (vizFunctions) weiter*/
function calculateViz(performance, sigma, einmalbetrag, alterStart, alterEnde) {

    //Abhängig von den Input-Parametern wird der Zufallsgenerator geseeted
    Math.seedrandom("Test" + performance + sigma + einmalbetrag + alterStart + alterEnde)    

    const toleranz = 1
    
    const laufzeit = alterEnde-alterStart
    let renteVal = renteRange.input.value*12

    let smileyArray = [0,0,0]
    let histogramArray = new Array()
    let agesArray = new Array()
    let agesArray2 = new Array()

    //Setze die beiden globalen Arrays auf ein leeres Array zurück
    viz3SelectAgesArray.length = 0
    viz3SelectAgesArray2.length = 0

    /*Wahl der angezeigten Altersgrößen für das Donut-Chart und Vorbereiten der Arrays
    zum Verarbeiten der Simulationen*/
    let startAgePercentage = Math.ceil((alterStart + 6)/5)*5
    let endAgePercentage = Math.ceil((alterEnde+11)/5)*5
    if(alterEnde - alterStart < 5) {
        for(let j = startAgePercentage-5; j < startAgePercentage + 5; j+=5) {
            agesArray.push(j)
            agesArray2.push(0)
        }
    }else if(endAgePercentage-startAgePercentage > 25) {
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

    for(let j = alterStart + 1; j <= endAgePercentage; j++) {
        viz3SelectAgesArray.push(j)
        viz3SelectAgesArray2.push(0)
    }
    
    /*Hauptschleife der Funktion, welche die Simulation je nach Wahl der iterations ausführt
    und die dementsprechenden Werte in die Viz-Arrays speichert*/
    for(let i = 0; i<iterations; i++) {
        let compVal = calcAgeProzess(performance,sigma,einmalbetrag,renteVal, laufzeit)
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

        for(let j = 0; j < viz3SelectAgesArray.length; j++) {
            if (compVal + alterStart >= viz3SelectAgesArray[j]) {
                viz3SelectAgesArray2[j]++
            }
        }

    }

    //Aufruf der Visualisierungs-Funktionen mit den berechneten Informationen von zuvor
    vizSmiley(smileyArray)
    vizHistogram(histogramArray, sigma, alterStart, alterEnde, toleranz)
    vizDifferentAges(agesArray, agesArray2, iterations)
}

