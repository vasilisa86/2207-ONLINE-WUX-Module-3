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
