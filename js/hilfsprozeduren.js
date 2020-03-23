
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
  
  if(arrow.style.transform == "rotate(90deg)") {
    if (smartphone[0].matches || smartphone[1].matches || smartphone[2].matches) {
      mainPopupDeviation.style.display = "block"
    }
    arrow.style.transform = "rotate(270deg)"
  }else{
    if (smartphone[0].matches || smartphone[1].matches || smartphone[2].matches) {
      mainPopupDeviation.style.display = "none"
    }
    arrow.style.transform = "rotate(90deg)"
  }
  
  /*}else if(smartphone[1].matches) {
    if(arrow.style.transform == "rotate(90deg)") {
      mainPopupDeviation.style.display = "inline-block"
      arrow.style.transform = "rotate(270deg)"
    }else{
      mainPopupDeviation.style.display = "none"
      arrow.style.transform = "rotate(90deg)"
    }
  */
  if(!(smartphone[0].matches || smartphone[1].matches)) {
    popup = document.getElementsByClassName("popup")
    popup[0].style.display = "flex"
  }
  
}

function closePopup(i) {
    var popup = document.getElementsByClassName("popup")
    popup[i].style.display = "none"
}

function closeAllPopups() {
  for(let i = 0; i < headerNormal.length; i++) {
    closeSliderPopup(i)
  }
  closeFooterPopup()
  closeProposalPopup()
  closePopup(0)

}


function changeArrowRotationOnOrientationChange() {
  /*Ändert die Ausrichtung des Pfeiles des zusätzlichen Popups der Standardabweichung*/
  arrow = document.getElementById("popupDeviationSpecialHeader")
    if(smartphone[0].matches || smartphone[2].matches) {
    if(arrow.style.transform == "rotate(270deg)") {
      arrow.style.transform = "rotate(270deg)"
    }else{
      arrow.style.transform = "rotate(90deg)"
    }
  }
}

function resizeChart() {
  /*Funktion, die beim Resize-Event getriggert wird*/
  slide.setAttribute("data-swipe-threshold", slide.clientWidth*0.5)
  //changeArrowRotationOnOrientationChange()
  updateValue()
  funcSmartphone()
}


//Wechselt in Abhängigkeit der Buttons Weiter/Zurück, dass die dementsprechenden Input-Felder gewechselt werden
function changeInputOnButtonClick(fromNum, toNum) {
  if(fromNum != -1) {
    closeSliderPopup(fromNum)
  }
  if(toNum != -1) {
    openSliderPopup(toNum)
  }
}

//Öffnen der Infopopups beim Hovern
function showInfoPopup(str) {
  let box = document.getElementById(str).children[0]
  let box2
  for(let i = 2; i < 4; i++) {
    box2 = box.children[i]
    box2.classList.remove("notVisiblePopup")
    box2.classList.add("visiblePopup")
  }
}

//Verstecken des Infopopups beim Verlassen des Bereichs-Hovern
function hideInfoPopup(str) {
  let box = document.getElementById(str).children[0]
  let box2
  for(let i = 2; i < 4; i++) {
    box2 = box.children[i]
    box2.classList.remove("visiblePopup")
    box2.classList.add("notVisiblePopup")
} 
}

//Öffnen des Popups zum Vorschlag übernehmen
function showStandardwertUebernehmenPopup(str) {
  let box = document.getElementById(str)
  box.classList.add("visiblePopup")
  box.classList.remove("notVisiblePopup")
}

//Öffnen des Popups zum Vorschlag übernehmen
function hideStandardwertUebernehmenPopup(str) {
  let box = document.getElementById(str)
  box.classList.remove("notvisiblePopup")
  box.classList.add("notVisiblePopup")
}

/*Funktion zur Zuordnung des Standardwertes eines jeden
Eingabefeldes: Diese wird beim Klicken auf den Reset-Knopf
ausgelöst*/
function vorschlagUebernehmen(n) {
  switch (n) {
    case 0:
      bindings[0].input.value = 67
      bindings[0].output.innerText = 67
      break
    case 1:
      bindings[1].input.value = 90
      bindings[1].output.innerText = 90
      fillPercentageHeader(90)
      break
    case 2:
      bindings[2].input.value = 100000
      bindings[2].output.innerText = numberWithPoints(100000) + "€"
      break
    case 3:
      fillRente(getEinmalbetrag(),getPerformance(),calcLaufzeit(), true)
      break
    case 5:
      bindings[5].input.value = 4
      bindings[5].output.innerText = 4 + "%"

      if(checkMuSigma.checked == false) {
        standardabweichung.input.disabled = true;
        let sigma = sigmaFromPerformance(parseInt(4))
        //from https://stackoverflow.com/questions/8584902/get-closest-number-out-of-array
        let closest = closestNumberInArrayIndex(sigma, sigmaArray)
        standardabweichung.input.value = closest
        standardabweichung.output.innerText = textDeviation(parseInt(closest))
      }
      break
  }
  updateValue()
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
    standardabweichung.input.classList.add("PointerEvents")
    let inputFieldDeviation = document.getElementById("wholeInputDeviation")
    let inputTextDeviation = document.getElementById("textStandardabweichung")
    
    //Erhöht die Sättigung des Eingabefeldes wenn der Nutzer das Risiko selbst auswählen kann
    inputTextDeviation.classList.remove("opacityLow")
    inputTextDeviation.classList.add("opacityHigh")
    inputFieldDeviation.classList.remove("opacityLow")
    inputFieldDeviation.classList.add("opacityHigh")

    for(let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("buttonStandardabweichung")
    }
    updateValue()

  }else{
    standardabweichung.input.disabled = true
    standardabweichung.input.classList.add("noPointerEvents")
    standardabweichung.input.classList.remove("PointerEvents")

    //Vermindert die Sättigung des Eingabefeldes wenn das Risiko automatisch berechnet wird
    let inputFieldDeviation = document.getElementById("wholeInputDeviation")
    let inputTextDeviation = document.getElementById("textStandardabweichung")
    inputTextDeviation.classList.remove("opacityHigh")
    inputTextDeviation.classList.add("opacityLow")
    inputFieldDeviation.classList.remove("opacityHigh")
    inputFieldDeviation.classList.add("opacityLow")

    let sigma = sigmaFromPerformance(parseInt(renditeerwartung.input.value))
    //from https://stackoverflow.com/questions/8584902/get-closest-number-out-of-array
    let closest = closestNumberInArrayIndex(sigma, sigmaArray)
    standardabweichung.input.value = closest
    standardabweichung.output.innerText = textDeviation(parseInt(closest))

    for(let i = 0; i < buttons.length; i++) {
      buttons[i].classList.add("buttonStandardabweichung")
    }
  }
}

//from https://stackoverflow.com/questions/8584902/get-closest-number-out-of-array
function closestNumberInArrayIndex (num, arr) {
  var currIndex = 0;
  var curr = arr[0];
  var diff = Math.abs (num - curr);
  for (var val = 0; val < arr.length; val++) {
      var newdiff = Math.abs (num - arr[val]);
      if (newdiff <= diff) {
          diff = newdiff;
          curr = arr[val];
          currIndex = val
      }
  }
  if(currIndex == 0 && getPerformance() > 0.02) {
    currIndex++
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
  }else if(helpNum >= 0.90) {
    percentageRentenaustrittsalter.innerText = 90 + "%"
    prefixHeaderRentenaustrittsalter.innerText = "Mehr als"
  }else{
    percentageRentenaustrittsalter.innerText = Math.ceil(helpNum*10)*10 + "%" 
    prefixHeaderRentenaustrittsalter.innerText = "Ca."
  }
}

/*Erhöht/Vermindert den Range Slider Wert eines Eingabefeldes: 
Wird durch das Klicken auf die Felder neben den RangeSlidern ausgelöst*/
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

  if(idRangeName == "rangeEinmalbetrag") {
    if(parseInt(input.value) <= parseInt(renteRange.input.value)*12) {
      window.alert("Die monatliche Entnahme darf nicht höher sein, als das Startkapital durch 12 Monate dividiert!")
      input.value = Math.ceil(parseInt(renteRange.input.value)*12/5000)*5000
    }
    output.innerText = numberWithPoints(input.value) + "€"
  }else if(input.id == "rangeRenteneintrittsalter") {
    if(parseInt(input.value) >= parseInt(rentenaustrittsalter.input.value)) {
      window.alert("Das Rentenaustrittsalter muss mindestens ein Jahr über dem Renteneintrittsalter liegen!")
      input.value = parseInt(rentenaustrittsalter.input.value) - step
      renteneintrittsalter.input.value = rentenaustrittsalter.input.value - step
    }
    output.innerText = input.value
    renteneintrittsalter.input.value = parseInt(input.value)

    rentenaustrittsalter.input.min = parseInt(input.value) + step
  }else if(input.id == "rangeRentenaustrittsalter") {
    if(parseInt(input.value) <= parseInt(renteneintrittsalter.input.value)) {
        window.alert("Das Rentenaustrittsalter muss mindestens ein Jahr über dem Renteneintrittsalter liegen!")
        input.value = parseInt(renteneintrittsalter.input.value) + step
        output.innerText = input.value
    }
    output.innerText = input.value
    rentenaustrittsalter.input.value = parseInt(input.value)

    renteneintrittsalter.input.max = Math.min(parseInt(input.value) - 1,75)


  }else if (idRangeName == "rangeRente"){
    if(parseInt(input.value)*12 >= parseInt(einmalbetrag.input.value)) {
      window.alert("Die monatliche Entnahme darf nicht höher sein, als das Startkapital durch 12 Monate dividiert!")
      input.value = einmalbetrag.input.value - step
    }
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
    fillRente(getEinmalbetrag(), getPerformance(), calcLaufzeit(), false)
  }
  calculateViz(getPerformance(),getDeviation(), getEinmalbetrag(),
  parseInt(renteneintrittsalter.input.value), parseInt(rentenaustrittsalter.input.value))
  fillPercentageHeader(parseInt(rentenaustrittsalter.input.value))
}

/*Spezielle Behandlung des Eingabefeldes der Standardabweichung:
Das Klick-Event soll nur dann etwas bewirken, wenn die Checkbox zur Kopplung
von Mu und Sigma aktiviert ist, der Nutzer also das Risiko selbstständig auswählt*/
function changeRangeValueDeviation(idRangeName, plusMinus) {
  if(checkMuSigma.checked == true) {
    changeRangeValue(idRangeName, plusMinus)
  }
}

function openDeviationPopup() {
  if(standardabweichung.input.disabled == true) {
    openPopup()
  }
}

function openFooterPopup() {
  let footerPopup = document.getElementById("infoPopup")
  footerPopup.style.display = "inline"
}

function closeFooterPopup() {
  let footerPopup = document.getElementById("infoPopup")
  footerPopup.style.display = "none"
}





