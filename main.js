window.addEventListener("orientationchange", function() {
  //changeArrowRotationOnOrientationChange()
  updateValue()
})
window.addEventListener("resize", resizeChart)
window.addEventListener("DOMContentLoaded", function() {
  updateValue()
  if(smartphone[0].matches || smartphone[1].matches || smartphone[2].matches) {
    openSliderPopup(0)
  }
})

for (binding of bindings) {
  const input = binding.input
  const output = binding.output

  if(smartphone[3].matches) {
    input.addEventListener('change', updateValue)
  }
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
  }else if(input.id == "rangeEinmalbetrag" || input.id == "rangeRente") {
      output.innerText = numberWithPoints(input.value) + "€"
  }else if(input.id == "rangeStandardabweichung" && checkMuSigma.checked == true) {
    output.innerText = textDeviation(parseInt(input.value))




    /*Verhindern, dass Renteintrittsalter und -austrittsalter sich fälschlicher-
    weise überschneiden*/
  }else if(input.id == "rangeRenteneintrittsalter") {
      if(parseInt(input.value) >= renteAlterEnde) {
        window.alert("Das Rentenaustrittsalter muss mindestens ein Jahr über dem Renteneintrittsalter liegen!")
        input.value = renteAlterEnde - 1
        renteAlterStart = renteAlterEnde - 1
      }
      output.innerText = input.value
      renteAlterStart = parseInt(input.value)

      rentenaustrittsalter.input.min = parseInt(input.value) + 1

    }else if(input.id == "rangeRentenaustrittsalter") {
      if(parseInt(input.value) <= renteAlterStart) {
          window.alert("Das Rentenaustrittsalter muss mindestens ein Jahr über dem Renteneintrittsalter liegen!")
          input.value = renteAlterStart + 1
          output.innerText = input.value
      }
      output.innerText = input.value
      renteAlterEnde = parseInt(input.value)

      renteneintrittsalter.input.max = Math.min(parseInt(input.value) - 1,75)
      fillPercentageHeader(renteAlterEnde)


    }else{
    output.innerText = input.value
  }

    /*Ersetzen des Textes in den Boxen*/

  if (input.id != "rangeRente") {
    fillRente(getEinmalbetrag(),getPerformance(),renteAlterEnde-renteAlterStart)
  }else{
    if(parseInt(input.value) >= einmalbetrag.input.value) {
      window.alert("Die Entnahme darf maximal den Wert der Rente besitzen!")
      input.value = einmalbetrag.input.value - 1
      output.innerText = numberWithPoints(input.value) + "€"
    }
  }


  if(!smartphone[3].matches && shouldPreventUpdateValue !== true) {
    updateValue()
  }

}
