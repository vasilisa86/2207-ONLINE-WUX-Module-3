function addHotelSection() {
    // Get user inputs
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const durationStay = document.getElementById("durationStay").checked;
    const guestsAmount = document.getElementById("guestsAmount").checked;
    const allPrices = document.getElementById("allPrices").checked;
    const breakfastIncluded = document.getElementById("breakfastIncluded").checked;

    // Create new section element
    const section = document.createElement("section");
    section.classList.add("f-cat");

    // Set data attributes based on user inputs
    if (durationStay) {
        section.setAttribute("data-cat", "cat-ds2");
    }
    if (guestsAmount) {
        section.setAttribute("data-cat2", "cat-ga1");
    }
    if (allPrices) {
        section.setAttribute("data-cat3", "cat-pr1");
    }
    if (breakfastIncluded) {
        section.setAttribute("data-cat4", "cat-bin");
    }

    // Build HTML content for new section
    section.innerHTML = `
    <img src="./assets/images/hotel1.jpg" height="330">
    <br>
    <div class="row">
        <div class="col col-6 col-s-6">
            <p><tl>${title}</tl></p>
        </div>
        <div class="col-6 col-s-6">
            <p><prc>${description}</prc></p>
        </div>
    </div>
    <p>
        <dsc>${description}</dsc>
    </p>
    <br>
    <br>
    <br>
    <button class="btn-sec checkavail">Check Availability</button>
  `;

    // Add new section to the hotels container
    const hotelsContainer = document.querySelector("hotels");
    hotelsContainer.prepend(section);


    // trigger change event on select elements
    $('.filtering select').trigger('change');
}
