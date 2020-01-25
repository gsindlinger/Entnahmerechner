/*vgl. https://www.w3schools.com/howto/howto_js_slideshow.asp*/


let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slideshow")
  let dots = document.getElementsByClassName("vizSlideIconsDetail")
  //let icons = document.getElementsByClassName("slideIcon")
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" activePage", "");
      //icons[i].className = dots[i].className.replace(" activeIcon", "");

    }
  if(slideIndex == 1) {
    slides[slideIndex-1].style.display = "grid";
  }else{
    slides[slideIndex-1].style.display = "flex";
  }
  dots[slideIndex-1].className += " activePage";

}



//Swipe-Gesten

function swipeLeft() {
  plusSlides(1)
}

function swipeRight() {
  plusSlides(-1)
}

//slide.setAttribute("data-swipe-threshold", slide.clientWidth*0.5)
slide.addEventListener('swiped-left', swipeLeft)
slide.addEventListener('swiped-right', swipeRight)