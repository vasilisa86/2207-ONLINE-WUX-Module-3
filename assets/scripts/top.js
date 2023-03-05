//Function scroll to top of the page
//Get the button
var mybutton = document.getElementById("topbtn");

// scrolls down 30px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction()
};

function scrollFunction() {
  if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// click on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}