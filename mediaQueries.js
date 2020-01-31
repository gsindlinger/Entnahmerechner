const smartphone = [window.matchMedia("(orientation: portrait)"),
                    window.matchMedia("(orientation: landscape) and (max-width: 1024px)"),
                    window.matchMedia("(pointer: coarse) and (orientation: landscape)"),
                    window.matchMedia("(pointer: coarse)"),
                    window.matchMedia("(min-aspect-ratio: 2/1) and (max-width: 899px)"),
                    window.matchMedia("(min-aspect-ratio: 15/9)"),
                    window.matchMedia("(min-aspect-ratio: 2/1) and (max-width: 1600px)"),
                    window.matchMedia("(max-aspect-ratio: 4/5) and (max-width: 500px)")]


for (let i = 0; i < smartphone.length; i++) {
    funcSmartphone()
    smartphone[i].addListener(funcSmartphone)
}


function funcSmartphone() {


    let logo = document.getElementById("imgLogo")
    let titleHeader = document.getElementById("title").querySelectorAll("h1")
    //let navbar = document.getElementById("headerSpecial")
    if(smartphone[0].matches) {
       

        //Zeilenumbruch in Titel hinzufügen
        titleHeader[0].innerHTML = "Berechne Sie Ihren <br> optimalen Entnahmeplan"
    }else{

        //Zeilenumbruch in Titel hinzufügen
        titleHeader[0].innerHTML = "Berechne Sie Ihren optimalen Entnahmeplan"
    }
    


    if(smartphone[0].matches || smartphone[1].matches || smartphone[2].matches) {

         //Anpassen des Logos
         logo.src = "Uni_Ulm_Logo_Ausschnitt.svg"
    
        //Navbar hinzufügen
        //navbar.style.display = "flex";
        //inputVariables.style.display = "none";

        for (let i = 0; i < bindings.length; i++) {

            let parent = bindings[i].input.parentElement.parentElement
            //fragment.appendChild(parent)
            
            let headerBox = headerSpecial[i].querySelector(".popupHeaderSpecial")
            headerBox.appendChild(parent)
            if(i == 4) {
                let extraChild = headerBox.children[1]
                headerBox.children[1].remove
                headerBox.appendChild(extraChild)
                headerBox.appendChild(mainPopupDeviation)
            }

        }

        



    }else{


        //Anpassen des Logos
        logo.src = "Uni_ulm_logo.svg"

        //Navbar hinzufügen
        //navbar.style.display = "none";
        //inputVariables.style.display = "grid";
        
        //let headerSpecialTest = headerSpecial[0].querySelectorAll(".popupHeaderSpecial")
        //console.log(headerSpecial[0].querySelector(".popupHeaderSpecial"))
        if(headerSpecial[0].querySelector(".popupHeaderSpecial").childElementCount >= 2) {
            for (let i = 0; i < headerNormal.length; i++) {
                let box 
                box = headerSpecial[i].querySelector(".popupHeaderSpecial")
                if(i == 4) {
                    
                    console.log(box.children)
                    document.getElementById("popupDeviation").append(mainPopupDeviation)
                    
                    let extraChild = box.children[1]
                    headerNormal[i].children[1].prepend(extraChild)
                    console.log("")
                    console.log(box.children[1])
                    let extraChild2 = box.children[1]
                    box.append(extraChild2)


                }else{
                    box = box.lastElementChild
                    headerNormal[i].appendChild(box)
                }
               
                 
            }
        }
        
        


    }

}


function openSliderPopup(n) {
    for(let i = 0; i < headerSpecial.length; i++) {
        if(i == n) {
            headerSpecial[n].style.display = "inline-block"
            headerSpecial[n].parentNode.classList.add("activeInput")
        }else{
            closeSliderPopup(i)
        }
    }
}

function closeSliderPopup(n) {
    headerSpecial[n].style.display = "none"
    headerSpecial[n].parentNode.classList.remove("activeInput")
}



