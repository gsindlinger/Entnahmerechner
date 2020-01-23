function evaluate(varEinmalbetrag, varRente, varPerformance, varLaufzeit) {
    let accountValue = varEinmalbetrag
    for(let i = 0; i < varLaufzeit; i++) {
        accountValue = (accountValue-varRente)*(1+varPerformance)
    }

    return accountValue;
}

function calcRente(varEinmalbetrag, varPerformance, varLaufzeit) {
    let a = 0
    let b = varEinmalbetrag
    let fa = evaluate(varEinmalbetrag,a,varPerformance,varLaufzeit)
    let fb = evaluate(varEinmalbetrag,b,varPerformance,varLaufzeit)
    
    let m = (fb-fa)/(b-a)
    let n = fa - m*a

    return -n/m
}



