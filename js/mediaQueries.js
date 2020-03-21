/*Festlegen relevanter Mediaqueries*/
const smartphone = [window.matchMedia("(orientation: portrait)"),
                    window.matchMedia("(orientation: landscape) and (max-width: 1024px)"),
                    window.matchMedia("(pointer: coarse) and (orientation: landscape)"),
                    window.matchMedia("(pointer: coarse)"),
                    window.matchMedia("(min-aspect-ratio: 2/1) and (max-width: 899px)"),
                    window.matchMedia("(min-aspect-ratio: 15/9)"),
                    window.matchMedia("(min-aspect-ratio: 2/1) and (max-width: 1600px)"),
                    window.matchMedia("(max-aspect-ratio: 4/5) and (max-width: 500px)"),
                    window.matchMedia("(min-aspect-ratio: 3/2) and (max-width: 400px)")]

for (let i = 0; i < smartphone.length; i++) {
    funcSmartphone()
    smartphone[i].addListener(funcSmartphone)
}

/*Grundlegende Funktion, welche die Anpassungen zwischen mobilem und nicht-mobilen Endgerät
vornimmt. Das heißt insbesondere ein schmaleres Logo und das Umhängen der Input-Felder an die Kopfzeile
im Falle eines mobilen Endgeräts. Analog dazu muss dies natürlich auch umgekehrt beim Wechsel
von mobilem Gerät zu nicht mobilem Gerät rückgängig gemacht werden.*/

function funcSmartphone() {

    let popupDeviation = document.getElementById("mainPopupDeviation").querySelectorAll("p")
    let logo = document.getElementById("imgLogo")
    let titleHeader = document.getElementById("title").querySelectorAll("h1")

    if(smartphone[0].matches) {
        //Zeilenumbruch in Titel hinzufügen falls das Endgerät länger als breit ist
        titleHeader[0].innerHTML = "Berechne Sie <br> Ihren Entnahmeplan"
    }else{
        titleHeader[0].innerHTML = "Berechne Sie Ihren Entnahmeplan"
    }

    if(smartphone[0].matches || smartphone[1].matches || smartphone[2].matches) {

         //Anpassen des Logos
         logo.src = "Uni_Ulm_Logo_Ausschnitt.svg"
    
        //Anhängen der Input-Felder an den HeaderSpecial
        for (let i = 0; i < bindings.length; i++) {

            let parent = bindings[i].input.parentElement.parentElement
            
            let headerBox = headerSpecial[i].querySelector(".popupHeaderSpecial")
            headerBox.appendChild(parent)
            if(i == 4) {
                let extraChild = headerBox.children[2]
                headerBox.children[2].remove
                headerBox.appendChild(extraChild)
                headerBox.appendChild(mainPopupDeviation)
            }

        }
        //Anpassen des Textes im Popup-Deviation
        popupDeviation[0].innerHTML = ""
    }else{
        //Anpassen des Logos
        logo.src = "Uni_ulm_logo.svg"

        //Anhängen der Input-Felder an den ursprünglichen Platz in der HTML-Struktur
        if(headerSpecial[4].querySelector(".popupHeaderSpecial").childElementCount >= 4) {
            for (let i = 0; i < headerNormal.length; i++) {
                let box = headerSpecial[i].querySelector(".popupHeaderSpecial")

                if(i == 4) {
                    document.getElementById("popupDeviation").append(mainPopupDeviation)
                    let extraChild = box.children[2]
                    headerNormal[i].children[1].prepend(extraChild)
                    let extraChild2 = box.children[2]
                    box.append(extraChild2)
                }else{
                    box = box.lastElementChild
                    headerNormal[i].appendChild(box)
                }  
            }
        }
         //Anpassen des Textes im Popup-Deviation
         popupDeviation[0].innerHTML = "Das <b>Risiko der Anlage</b> hängt von der gewählten Rendite ab.<br>"
    }

}

/*Funktion, welche das Öffnen und Schließen der Input-Felder im Falle eines
mobilen Endgerät ermöglicht. Alle nicht aktivierten Input-Felder werden geschlossen, das aktivierte dementsprechend
angezeigt*/
function openSliderPopup(n) {
    for(let i = 0; i < headerSpecial.length; i++) {
        if(i == n) {
            headerSpecial[n].style.display = "block"
            headerSpecial[n].parentNode.classList.add("activeInput")
        }else{
            closeSliderPopup(i)
        }
    }
}

/*Schließt das gewählte Popup des zugehörigen Input-Feldes im Falle eines mobilen Endgeräts*/
function closeSliderPopup(n) {
    headerSpecial[n].style.display = "none"
    headerSpecial[n].parentNode.classList.remove("activeInput")
}



