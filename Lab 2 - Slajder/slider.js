let slide = Math.floor(Math.random() * 5) + 1;
let timer1 = 0;
let timer2 = 0;

function setSlide(sliderNr) {
    clearTimeout(timer1);
    clearTimeout(timer2);
    slide = sliderNr - 1;
    hide();
    setTimeout(changeSlide, 500);
}

function hide() {
    $("#slider").fadeOut(500);
}

function changeSlide() {
    slide++;
    if (slide > 5) {
        slide = 1;
    }
    let file = "<img class=\"slide\" src=\"slajdy/slajd" + slide + ".jpg\" />";
    document.getElementById("slider").innerHTML = file;
    $("#slider").fadeIn(500);
    timer1 = setTimeout(changeSlide, 5000);
    timer2 = setTimeout(hide, 4500);
}
