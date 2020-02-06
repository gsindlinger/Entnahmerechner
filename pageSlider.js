

/*
Skript/Funktionen, welche das Wechseln der verschiedenen Visualisierungsseiten
ermöglicht.

vgl. https://www.w3schools.com/howto/howto_js_slideshow.asp*/


let slideIndex = 1;
showSlides(slideIndex);

// Wählen der Darstellung über den Next-/Previous-Button
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Wählen der Darstellung über die Slide-Icons
function currentSlide(n) {
  showSlides(slideIndex = n);
}

//Funktion, die den Wechseln je nach übergebenen Parameter handelt
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slideshow")
  let dots = document.getElementsByClassName("vizSlideIconsDetail")
  
  if (n > slides.length) {slideIndex = 1}

  if (n < 1) {slideIndex = slides.length}

  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }

  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" activePage", "");
    }
  if(slideIndex == 1) {
    slides[slideIndex-1].style.display = "grid";
  }else{
    slides[slideIndex-1].style.display = "flex";
  }
  dots[slideIndex-1].className += " activePage";

}



/*Zusätzliche Funktion zum Swipen bei mobilen Geräten

Diese Funktionen basieren auf der Datei von John Doherty*/

function swipeLeft() {
  plusSlides(1)
}

function swipeRight() {
  plusSlides(-1)
}

slide.addEventListener('swiped-left', swipeLeft)
slide.addEventListener('swiped-right', swipeRight)