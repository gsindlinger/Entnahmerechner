/*Variablen */

const renteneintrittsalter = {
    input: document.getElementById("rangeRenteneintrittsalter"),
    output: document.getElementById('textRenteneintrittsalter')
  }
  
const rentenaustrittsalter = {
    input: document.getElementById('rangeRentenaustrittsalter'),
    output: document.getElementById('textRentenaustrittsalter')
  }
  
const renditeerwartung = {
    input: document.getElementById('rangeRenditeerwartung'),
    output: document.getElementById('textRenditeerwartung')
  }
  
const standardabweichung = {
    input: document.getElementById('rangeStandardabweichung'),
    output: document.getElementById('textStandardabweichung')
  }

const einmalbetrag = {
    input: document.getElementById('rangeEinmalbetrag'),
    output: document.getElementById('textEinmalbetrag')
}

const renteRange = {
    input: document.getElementById('rangeRente'),
    output: document.getElementById('textRente')
}

const bindings = [renteneintrittsalter,rentenaustrittsalter,einmalbetrag, renteRange,
      standardabweichung, renditeerwartung]

//Geschlecht: männlich = 0, weiblich = 1
let sex = 1
  
//Text Visualisation Header (Rente, Lebenserwartung)
const rente = document.getElementById("calcRente")
const percentageRentenaustrittsalter = document.getElementById("percentageRentenaustrittsalter")
const headerRentenaustrittsalter = document.getElementById("headerRentenaustrittsalter")
const prefixHeaderRentenaustrittsalter = document.getElementById("prefixPercentageRentenaustrittsalter")

//Checkbox Mu-Sigma Beziehung
const checkMuSigma = document.getElementById("checkboxMuSigma")

//Standardabweichung Gruppierungsarray
const sigmaArray = [0, 10, 20, 30, 40]

//Viz3 DOM
const quarters = [document.getElementById("viz3QuartersText1Quarter"), document.getElementById("viz3QuartersTextHalf"), document.getElementById("viz3QuartersText3Quarters")]
const viz3Percentage = document.getElementById("viz3Percentages")


//Smiley Divs
const divGood = document.getElementById("good")
const divMedium = document.getElementById("medium")
const divBad = document.getElementById("bad")

const textGood = document.getElementById("textGood")
const textMedium = document.getElementById("textMedium")
const textBad = document.getElementById("textBad")

const tabelle = document.getElementById("tabelle")
const table1 = document.getElementById("table1")
const table1Body = document.getElementById("table1Body")
const table1Head = document.getElementById("table1Head")

let kontrolle = new Array()
let kontrolle2 = new Array()


//Lebenserwartungsarray
//const sterbetafelW = [83,82,81,80,79,78,77,76,75,74,73,72,71,70,69,68,67,66,65,64,63,62,61,60,59,58,57,56,55,54,53,52,51,50,49,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,33,33,32,31,30,29,28,27,26,25,24,24,23,22,21,20,19,19,18,17,16,15,15,14,13,12,12,11,10,10,9,8,8,7,6,6,6,5,5,4,4,4,3,3,3,3,3,2,2,2]

//const sterbetafelM = [78,77,76,75,74,73,72,71,70,69,68,67,66,65,64,63,62,61,60,59,58,57,56,55,54,53,52,51,50,49,48,47,46,45,44,43,42,41,41,40,39,38,37,36,35,34,33,32,31,30,29,28,28,27,26,25,24,23,22,22,21,20,19,19,18,17,16,16,15,14,14,13,12,12,11,10,10,9,9,8,7,7,6,6,6,5,5,4,4,4,3,3,3,3,3,2,2,2,2,2]


//Berechnung der Visualisierungsgrößen
const slide = document.getElementById("vizSlide")

//Header Special
const headerSpecial = [
  document.getElementById("popupStartEntnahme"),
  document.getElementById("popupEndeEntnahme"),
  document.getElementById("popupStartkapital"),
  document.getElementById("popupMonatlicheEntnahme"),
  document.getElementById("popupRisiko"),
  document.getElementById("popupRendite")
]

const headerNormal = [
  document.getElementById("Renteneintrittsalter"),
  document.getElementById("Rentenaustrittsalter"),
  document.getElementById("Einmalbetrag"),
  document.getElementById("Rente"),
  document.getElementById("Standardabweichung"),
  document.getElementById("Renditeerwartung")
]

const headerSpecialParent = document.getElementById("headerSpecial").children
const mainPopupDeviation = document.getElementById("mainPopupDeviation")

//globale Variable zur optimalen Bestimmung der Größe des Histograms
let sizeHistogramHelper


