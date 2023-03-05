// ==== Check Availability Form ===== //
const checkavailForm = document.querySelector("main .wrapper");

// Select all the buttons that should open the check availability form
const checkavailButtons = document.querySelectorAll('.checkavail');

// Add a click event listener to each button that opens the check availability form
checkavailButtons.forEach(button => {
    button.addEventListener('click', () => {
        checkavailForm.classList.add("active-ca");
    });
});

// Select the close button
const closeCAButton = document.querySelector('.close-ca-form');

// Add a click event listener to the close button
closeCAButton.addEventListener('click', () => {
    checkavailForm.classList.remove("active-ca");
});