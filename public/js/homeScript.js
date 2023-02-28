// Animated Circles
const circles = document.querySelectorAll(".circle");
const mainImg = document.querySelector(".main-circle img");

let mX = 0;
let mY = 0;
const z = 50;

const animateCircles = (e, x, y) => {
  if (x < mX) {
    circles.forEach((circle) => {
      circle.style.left = `${z}px`;
    });
    mainImg.style.left = `${z}px`;
  } else if (x > mX) {
    circles.forEach((circle) => {
      circle.style.left = `-${z}px`;
    });
    mainImg.style.left = `-${z}px`;
  }

  if (y < mY) {
    circles.forEach((circle) => {
      circle.style.top = `${z}px`;
    });
    mainImg.style.top = `${z}px`;
  } else if (y > mY) {
    circles.forEach((circle) => {
      circle.style.top = `-${z}px`;
    });
    mainImg.style.top = `-${z}px`;
  }

  mX = e.clientX;
  mY = e.clientY;
};
// End of Animated Circles

document.body.addEventListener("mousemove", (e) => {
  let x = e.clientX;
  let y = e.clientY;

  mouseCircleFn(x, y);
  animateCircles(e, x, y);

  const hoveredEl = document.elementFromPoint(x, y);

  stickyElement(x, y, hoveredEl);

  mouseCircleTransform(hoveredEl);
});

// About Me Text
const aboutMeText = document.querySelector(".about-me-text");
const aboutMeTextContent =
  "Veränderungen sind am Anfang hart, in der Mitte chaotisch und am Ende wunderbar!";

Array.from(aboutMeTextContent).forEach((char) => {
  const span = document.createElement("span");
  span.textContent = char;
  aboutMeText.appendChild(span);

  span.addEventListener("mouseenter", (e) => {
    e.target.style.animation = "aboutMeTextAnim 10s infinite";
  });
});
// End of About Me Text

//JQuery Functions

$(document).ready(function () {
  $("#home-main-circle").click(function () {
    $("#home-main-circle")
      .css(
        "background-image",
        "url(/public/images/landing/designer.jpg)"
      )
        $("#home-main-circle").animate({ opacity: 0.5 }, 2500);
  })
})

$(document).ready(function () {
  $("#circle-nr4").click(function () {
    $("#circle-nr4").animate({
      left: "100px",
    });
  });
  $("#circle-nr4").click(function () {
    $("#circle-nr4")
      .fadeIn(2000)
      .css(
        "background-image",
        "url(/public/images/landing/circle-4-change.jpg)"
      )
      .animate({ opacity: 0.7 }, 2500);
    $("#circle-5-text").hide();
    $("#portfolio-text").hide();
    $("#circle-4-text").fadeIn(2000);
    $("#circle-4-text").fadeToggle(2000);
  });
});

// Show Portfolio-text
$(document).ready(function () {
  $("#main-button").click(function () {
    $("#circle-4-text").hide();
    $("#circle-5-text").hide();
    $("#portfolio-text").fadeIn(2000);
    $("#portfolio-text").fadeToggle(2000);
    $("#penguin").fadeIn(3000);
    $("#penguin").fadeToggle(3000);
  });
});

$(document).ready(function () {
  $("#circle-nr3").click(function () {
    $("#circle-nr3").animate({
      left: "100px",
    });
  });
  $("#circle-nr3").click(function () {
    $("#circle-nr3")
      .fadeIn(2000)
      .css(
        "background-image",
        "url(/public/images/landing/circle-3-change.png)"
      )
      .animate({ opacity: 1 }, 2500);
    $("#portfolio-text").hide();
    $("#circle-4-text").hide();
    $("#circle-5-text").fadeIn(2000);
    $("#circle-5-text").fadeToggle(2000);
  });
});

// End of JQuery Functions
