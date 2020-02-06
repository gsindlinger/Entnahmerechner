
function numberWithPoints (x) {
/*Funktion, die 1000-Trennzeichen bei Zahlen einfügt
vgl. https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript*/
return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

function roundDigitsNum(x, num) {
  /*Rundet die Zahl x auf die angegebene Anzahl an Nachkommastellen num*/
  return (Math.round(x * Math.pow(10,num))/Math.pow(10,num))
}
  
function getStartAge() {
  return parseInt(renteneintrittsalter.input.value)
}

function getEndAge() {
  return parseInt(rentenaustrittsalter.input.value)
}

function calcLaufzeit() {
  return parseInt(rentenaustrittsalter.input.value) - parseInt(renteneintrittsalter.input.value)
}

function getEinmalbetrag() {
  return parseInt(einmalbetrag.input.value)
}

function getPerformance() {
  return parseInt(renditeerwartung.input.value)/100
}

function getDeviation() {
/*Die Zuordnung der Standardabweichung ist abhängig von den vorgegebenen, 
  möglichen Werten für die Standardabweichung
  
  Je nachdem, ob der Nutzer das Risiko an die Rendite gekoppelt hat oder nicht,
  wird der Wert ermittelt*/
  let helpInt
  if(checkMuSigma.checked == false) {
    helpInt = sigmaFromPerformance(parseInt(renditeerwartung.input.value))
  }else{
    switch(parseInt(standardabweichung.input.value)) {
      case 0:
        helpInt = sigmaArray[0]
        break
      case 1:
        helpInt = sigmaArray[1]
        break
      case 2:
        helpInt = sigmaArray[2]
        break
      case 3:
        helpInt = sigmaArray[3]
        break
      case 4:
        helpInt = sigmaArray[4]
        break
    }
  
  }
  return helpInt/100
  
}

function openPopup() {
  /*Öffnet das zusätzliche Fenster der Standardabweichung 
  (also, ob dieses Feld manuell bearbeitet werden kann)

  Abhängig von dem gewählten Medium wird zusätzlich der Pfeil der Darstellung
  angepasst*/
  var popup
  let arrow
  arrow = document.getElementById("popupDeviationSpecialHeader")
  if(smartphone[0].matches) {
    if(arrow.style.transform == "rotate(90deg)") {
      mainPopupDeviation.style.display = "inline-block"
      arrow.style.transform = "rotate(270deg)"
    }else{
      mainPopupDeviation.style.display = "none"
      arrow.style.transform = "rotate(90deg)"
    }
  
  }else if(smartphone[1].matches) {
    if(arrow.style.transform == "rotate(0deg)") {
      mainPopupDeviation.style.display = "inline-block"
      arrow.style.transform = "rotate(180deg)"
    }else{
      mainPopupDeviation.style.display = "none"
      arrow.style.transform = "rotate(0deg)"
    }
  
  }else{
    popup = document.getElementsByClassName("popup")
    popup[0].style.display = "flex"
  }
  
}

function closePopup(i) {
    var popup = document.getElementsByClassName("popup")
    popup[i].style.display = "none"
}


function changeArrowRotationOnOrientationChange() {
  /*Ändert die Ausrichtung des Pfeiles des zusätzlichen Popups der Standardabweichung*/
  arrow = document.getElementById("popupDeviationSpecialHeader")
    if(smartphone[0].matches) {
    if(arrow.style.transform == "rotate(180deg)") {
      arrow.style.transform = "rotate(270deg)"
    }else if(arrow.style.transform == "rotate(0deg)"){
      arrow.style.transform = "rotate(90deg)"
    }
  }else{
    if(arrow.style.transform == "rotate(90deg)") {
      arrow.style.transform = "rotate(0deg)"
    }else if(arrow.style.transform == "rotate(270deg)"){
      arrow.style.transform = "rotate(180deg)"
    }
  }
}

function resizeChart() {
  /*Funktion, die beim Resize-Event getriggert wird*/
  slide.setAttribute("data-swipe-threshold", slide.clientWidth*0.5)
  changeArrowRotationOnOrientationChange()
  updateValue()
  funcSmartphone()
}


//Gibt den Text für das Feld Standardabweichung zurück
function textDeviation(inputInt) {
  let helpText
      switch(inputInt) {
        case 0:
          helpText = "Kein Risiko"
          break
        case 1:
          helpText = "Geringes Risiko"
          break
        case 2:
          helpText = "Mittleres Risiko"
          break
        case 3:
          helpText = "Hohes Risiko"
          break
        case 4:
          helpText = "Sehr hohes Risiko"
          break
      }
  return helpText
}

function sigmaFromPerformance(performance) {
  /*Es gilt:
    0% = m*2%+c
    20% = m*6%+c

    => m = 5, c = -10
  */
  if(performance <= 2) {
    return 0
  }else{
    return 5*performance-10
  }
}


//Ermöglicht das Bearbeiten/Bzw. verhindert das Bearbeiten der Volatilität
function activateSigma() {
  let buttons = document.querySelectorAll(".buttonDeviation")
  

  if(checkMuSigma.checked == true) {
    standardabweichung.input.disabled = false
    standardabweichung.input.classList.remove("noPointerEvents")
    for(let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("buttonStandardabweichung")
    }
    updateValue()

  }else{
    standardabweichung.input.disabled = true

    let sigma = sigmaFromPerformance(parseInt(renditeerwartung.input.value))
    //from https://stackoverflow.com/questions/8584902/get-closest-number-out-of-array
    let closest = closestNumberInArrayIndex(sigma, sigmaArray)
    standardabweichung.input.value = closest
    standardabweichung.output.innerText = textDeviation(parseInt(closest))

    for(let i = 0; i < buttons.length; i++) {
      buttons[i].classList.add("buttonStandardabweichung")
    }
    standardabweichung.input.classList.add("noPointerEvents")

  }

  

}


//from https://stackoverflow.com/questions/8584902/get-closest-number-out-of-array
function closestNumberInArrayIndex (num, arr) {
  var currIndex = 0;
  var curr = arr[0];
  var diff = Math.abs (num - curr);
  for (var val = 0; val < arr.length; val++) {
      var newdiff = Math.abs (num - arr[val]);
      if (newdiff < diff) {
          diff = newdiff;
          curr = arr[val];
          currIndex = val
      }
  }
  return currIndex;
}


/*Funktion, die den zweiten Teil der Kopfzeile mit dem Anteil der Menschen, die das Endalter erreichen, berechnet*/
function fillPercentageHeader(endAge) {
  /*Quelle: Gomperz-Makeham-Gesetz Norberg, Ragnar: Basic Life Insurance Mathematics, http://web.math.ku.dk/~mogens/lifebook.pdf  / Seite 35)*/
  let startAge = 0
  headerRentenaustrittsalter.innerText = endAge + " Jahre"
  let helpNum = Math.exp(-0.0005*(endAge-startAge))*
    Math.exp(-0.000866969*Math.exp(0.087497925*(endAge-startAge)-1))

  if(helpNum <= 0.05) {
    percentageRentenaustrittsalter.innerText = Math.round(helpNum*100)+1 + "%"
    prefixHeaderRentenaustrittsalter.innerText = "Weniger als"
  }else{
    percentageRentenaustrittsalter.innerText = Math.ceil(helpNum*10)*10 + "%" 
    prefixHeaderRentenaustrittsalter.innerText = "Ca."
  }
  
}




  //Erstellt eine CSV-Datei aus einem Array
  function createCSV(array) {
    let csvContent = "data:text/csv;charset=utf-8," 
    + array.map(e => e.join(";")).join("\n");

    let encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  }



//Erhöht den Range Slider Wert

function changeRangeValue(idRangeName, plusMinus) {
  let input = document.getElementById(idRangeName)

  /*Wichtig: Voraussetzung, dass dies funktioniert ist, 
  dass Text und Range ID identische Suffix-Bezeichnungen haben*/
  let output = document.getElementById(idRangeName.replace("range","text"))
  let step
  
  if(isNaN(parseInt(input.step))) {
    step = 1
  }else{
    step = parseInt(input.step)
  }

  if(plusMinus == 1) {
    input.value = parseInt(input.value) + step
  }else{
    input.value = parseInt(input.value) - step
  }

  if(idRangeName == "rangeEinmalbetrag" || idRangeName == "rangeRente") {
    output.innerText = numberWithPoints(input.value) + "€"
  }else if(idRangeName == "rangeStandardabweichung" && checkMuSigma.checked == true) {
    output.innerText = textDeviation(parseInt(input.value))
  }else if(idRangeName == "rangeRenditeerwartung"){
    output.innerText = input.value + "%"

    if(checkMuSigma.checked == false) {
      standardabweichung.input.disabled = true;
      let sigma = sigmaFromPerformance(parseInt(binding.input.value))
      //from https://stackoverflow.com/questions/8584902/get-closest-number-out-of-array
      let closest = closestNumberInArrayIndex(sigma, sigmaArray)
      standardabweichung.input.value = closest
      standardabweichung.output.innerText = textDeviation(parseInt(closest))
    }
  }else{
    output.innerText = input.value
  }
  
  
  if(idRangeName!="rangeRente") {
    fillRente(getEinmalbetrag(), getPerformance(), calcLaufzeit())
  }
  calculateViz(getPerformance(),getDeviation(), getEinmalbetrag(),
  parseInt(renteneintrittsalter.input.value), parseInt(rentenaustrittsalter.input.value))
}

