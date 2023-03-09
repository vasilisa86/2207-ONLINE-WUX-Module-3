function initSearch() {
    // Create the search input field
    const searchInput = document.createElement("input");
    searchInput.setAttribute("type", "text");
    searchInput.setAttribute("placeholder", "Search books...");

    // Add event listener to search input field
    searchInput.addEventListener("input", function () {
        const searchTerm = this.value.toLowerCase();
        const bookSections = document.querySelectorAll("#books-container section, #books-container-all section");
        bookSections.forEach(function (section) {
            const title = section.querySelector("#book-title").textContent.toLowerCase();
            const author = section.querySelector("#book-author").textContent.toLowerCase();
            const genre = section.querySelector("#book-genre").textContent.toLowerCase();
            if (title.includes(searchTerm) || author.includes(searchTerm) || genre.includes(searchTerm)) {
                section.classList.add("active");
            } else {
                section.classList.remove("active");
            }
        });
    });

    // Add the search input field to the search bar
    const searchBar = document.querySelector("#search-bar");
    searchBar.appendChild(searchInput);
}
window.addEventListener("load", function () {
    initSearch();
});