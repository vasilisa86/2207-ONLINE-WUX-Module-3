// ==== Responsive menu ==== //
const responsemenu = document.querySelector(".responsemenu");
const close = document.querySelector(".navi-list .close");
const menu = document.querySelector(".navi-list");

responsemenu.addEventListener("click", () => {
    menu.classList.add("show");
});

close.addEventListener("click", () => {
    menu.classList.remove("show");
});

// ==== Login Form ===== //
// Select header wrapper
const loginForm = document.querySelector("header .wrapper");

// Onclick add active class
document.querySelector(".login").onclick = () => {
    loginForm.classList.add("active");
};
//Onclick remove active class
document.querySelector(".close-form").onclick = () => {
    loginForm.classList.remove("active");
};
