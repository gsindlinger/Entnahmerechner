/*Berechnet für einen vorgegeben Wert der Rente, Performance, ... den Wert der Entnahme
am Ende der Laufzeit. Diese Funktion wird benötigt, um schließlich zwei Werte zu bestimmen, welche
die lineare Abhängigkeit der optimalen Entnahme und der anderen Variablen zu beschreiben.*/

function evaluate(varEinmalbetrag, varRente, varPerformance, varLaufzeit) {
    let accountValue = varEinmalbetrag
    for(let i = 0; i < varLaufzeit; i++) {
        accountValue = (accountValue-varRente)*(1+varPerformance)
    }

    return accountValue;
}

/*Mit zwei Werten (0 und Einmalbetrag) wird schließlich die lineare Abhängigkeit bestimmt,
die eine optimale Entnahme berechnet.*/

function calcRente(varEinmalbetrag, varPerformance, varLaufzeit) {
    let a = 0
    let b = varEinmalbetrag
    let fa = evaluate(varEinmalbetrag,a,varPerformance,varLaufzeit)
    let fb = evaluate(varEinmalbetrag,b,varPerformance,varLaufzeit)
    
    let m = (fb-fa)/(b-a)
    let n = fa - m*a

    return -n/m
}

//Befüllt das Feld des Vorschlags mit der optimalen Entnahme unter Aufruf der oberen beiden Funktionen
function fillRente(einmalbetrag, performance, laufzeit) {
  
    let renteVal = Math.round(calcRente(einmalbetrag,performance,laufzeit)/(12*10))*10
    renteRange.input.min = Math.floor(Math.round(renteVal - 0.4*renteVal)/10)*10
    renteRange.input.max = Math.ceil(Math.round(renteVal + 0.2*renteVal)/10)*10
    renteRange.input.step = 10
  
    renteRange.input.value = renteVal
    renteRange.output.innerText = numberWithPoints(renteVal) + "€"
    rente.innerText = numberWithPoints(renteVal) + "€"
  
  
  
  }



