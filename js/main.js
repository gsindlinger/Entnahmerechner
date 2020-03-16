window.addEventListener("orientationchange", function() {
  updateValue()
})
window.addEventListener("resize", resizeChart)
window.addEventListener("DOMContentLoaded", function() {
  fillRente(getEinmalbetrag(), getPerformance(), calcLaufzeit(), true)
  updateValue()
  if(smartphone[0].matches || smartphone[1].matches || smartphone[2].matches) {
    openSliderPopup(0)
  }
  funcSmartphone()
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./serviceworker.js');
  }
})

for (binding of bindings) {
  const input = binding.input
  const output = binding.output
  input.addEventListener('change', updateValue)
  input.addEventListener('input', updateDisplay.bind(binding))
  updateDisplay.apply(binding, [true])
}

function updateValue() {
  calculateViz(getPerformance(),getDeviation(), getEinmalbetrag(),
  getStartAge(),getEndAge())
}

function updateDisplay(shouldPreventUpdateValue) {
  const input = this.input
  const output = this.output
  let renteAlterStart = parseInt(renteneintrittsalter.input.value)
  let renteAlterEnde = parseInt(rentenaustrittsalter.input.value)

  let step

  if(isNaN(parseInt(input.step))) {
    step = 1
  }else{
    step = parseInt(input.step)
  }


  if(input.id == "rangeRenditeerwartung") {
    output.innerText = input.value + "%"

    if(checkMuSigma.checked == false) {
      standardabweichung.input.disabled = true;
      let sigma = sigmaFromPerformance(parseInt(input.value))
      //from https://stackoverflow.com/questions/8584902/get-closest-number-out-of-array
      let closest = closestNumberInArrayIndex(sigma, sigmaArray)
      standardabweichung.input.value = closest
      standardabweichung.output.innerText = textDeviation(parseInt(closest))
    }
  }else if(input.id == "rangeEinmalbetrag") {
    if(parseInt(input.value) <= parseInt(renteRange.input.value)*12) {
      window.alert("Die monatliche Entnahme darf nicht höher sein, als das Startkapital durch 12 Monate dividiert!")
      input.value = Math.ceil(parseInt(renteRange.input.value)*12/5000)*5000
    }
    output.innerText = numberWithPoints(input.value) + "€"
  }else if(input.id == "rangeStandardabweichung" && checkMuSigma.checked == true) {
    output.innerText = textDeviation(parseInt(input.value))




    /*Verhindern, dass Renteintrittsalter und -austrittsalter sich fälschlicher-
    weise überschneiden*/
  }else if(input.id == "rangeRenteneintrittsalter") {
      if(parseInt(input.value) >= renteAlterEnde) {
        window.alert("Das Rentenaustrittsalter muss mindestens ein Jahr über dem Renteneintrittsalter liegen!")
        input.value = renteAlterEnde - step
        renteAlterStart = renteAlterEnde - step
      }
      output.innerText = input.value
      renteAlterStart = parseInt(input.value)

      rentenaustrittsalter.input.min = parseInt(input.value) + step

    }else if(input.id == "rangeRentenaustrittsalter") {
      if(parseInt(input.value) <= renteAlterStart) {
          window.alert("Das Rentenaustrittsalter muss mindestens ein Jahr über dem Renteneintrittsalter liegen!")
          input.value = renteAlterStart + step
          output.innerText = input.value
      }
      output.innerText = input.value
      renteAlterEnde = parseInt(input.value)

      renteneintrittsalter.input.max = Math.min(parseInt(input.value) - 1,75)
      fillPercentageHeader(renteAlterEnde)


    }else if(input.id == "rangeRente") {
      if(parseInt(input.value)*12 >= parseInt(einmalbetrag.input.value)) {
        window.alert("Die monatliche Entnahme darf nicht höher sein, als das Startkapital durch 12 Monate dividiert!")
        input.value = einmalbetrag.input.value - step
      }
      output.innerText = numberWithPoints(input.value) + "€"
    }else{
      output.innerText = input.value
    }

    /*Ersetzen des Textes in den Boxen*/

  if (input.id != "rangeRente") {
    fillRente(getEinmalbetrag(),getPerformance(),renteAlterEnde-renteAlterStart, false)
  }



}
