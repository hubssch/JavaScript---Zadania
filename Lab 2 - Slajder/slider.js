const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector("#next");
const one = document.querySelector('#nr1');
const two = document.querySelector('#nr2');
const three = document.querySelector('#nr3');
const four = document.querySelector('#nr4');
const five = document.querySelector('#nr5');


const carousel = document.querySelector('.carousel');

const SLIDES_LENGTH = 5;
const SLIDE_WIDTH = 600;

let currentSlide = 0;

function setSlide(sliderNr)
{
   currentSlide = (sliderNr + SLIDES_LENGTH) % SLIDES_LENGTH;
   // console.log("cyrren", currentSlide);
   carousel.style.transform = `translateX(-${currentSlide * SLIDE_WIDTH}px)`;

   // console.log("slideNr", sliderNr);
}

prevBtn.addEventListener("click",() => {
   setSlide(currentSlide - 1);
})

nextBtn.addEventListener("click", () => {
   setSlide(currentSlide + 1);
})

one.addEventListener("click", () => {
    setSlide(0);
} )

two.addEventListener("click", () => {
    setSlide(1);
} )

three.addEventListener("click", () => {
    setSlide(2);
} )

four.addEventListener("click", () => {
    setSlide(3);
} )

five.addEventListener("click", () => {
    setSlide(4);
} )
