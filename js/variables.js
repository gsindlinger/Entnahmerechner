/*Sammle alle Input-Felder mit ihrem zugehörigen Text in einzelnen Arrays*/

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
  
/*Variablen für den Text, der bei der Visualisierung als Kopfzeile dient
 (Vorschlag zur optimalen Entnahme, Lebenserwartung)*/
const rente = document.getElementById("calcRente")
const percentageRentenaustrittsalter = document.getElementById("percentageRentenaustrittsalter")
const headerRentenaustrittsalter = document.getElementById("headerRentenaustrittsalter")
const prefixHeaderRentenaustrittsalter = document.getElementById("prefixPercentageRentenaustrittsalter")

//Checkbox Mu-Sigma Beziehung
const checkMuSigma = document.getElementById("checkboxMuSigma")

/*Festgelegte Werte für die Standardabweichung, die ausgewählt werden können
0 = kein Risiko
10 = geringes Risiko
...
40 = sehr hohes Risiko
*/
const sigmaArray = [0, 10, 20, 30, 40]

//Viz1-Variablen (Smiley-Chart)
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

//Viz3-Variablen (Donut-Chart)
const viz3Percentage = document.getElementById("viz3Percentages")


/*Variable des Visualisierungsbereich
v.a. zur Berechnung der Visualisierungsgrößen verwendet*/
const slide = document.getElementById("vizSlide")

//Unterscheidung der Header zwischen mobilem und nicht mobilem Gerät
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

//globale Variable zur optimalen Bestimmung der Größe des Histograms (vgl. Erläuterungen zu div2Test in der index.html-Datei)
let sizeHistogramHelper


//RangeSlider für DonutChart
const donutChartSlider = document.getElementById("viz3SelectAgeRange")

//Array zum Speichern der Werte für Donut Chart
let viz3SelectAgesArray = new Array()
let viz3SelectAgesArray2 = new Array()


