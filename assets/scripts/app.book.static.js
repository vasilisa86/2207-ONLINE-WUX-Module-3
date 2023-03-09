const staticBooks = [];

// Function to show static book details
function showStaticBookDetails(id) {
    console.log(staticBooks);
    // Find the book in the staticBooks array with the provided id
    const book = staticBooks.find((book) => book.staticBookId === id);

    // Create a new div element with the required attributes
    const detailsWrapper = document.createElement("div");
    detailsWrapper.setAttribute("class", "book-details-wrapper");

    // Create a new section element with the required attributes
    const detailsSection = document.createElement("section");
    detailsSection.setAttribute("class", "book-details");
    detailsSection.setAttribute("data-book-id", book.id);

    const detailsSectionRow = document.createElement("div");
    detailsSectionRow.setAttribute("class", "row")
    detailsSection.appendChild(detailsSectionRow);

    // Create the image element with the required attributes
    const bookImage = document.createElement("img");
    bookImage.setAttribute("height", "230");
    bookImage.setAttribute("src", book.image || "./assets/images/book.jpg"); // Set the src attribute to the image URL or default image
    bookImage.addEventListener("error", () => {
        bookImage.setAttribute("src", "./assets/images/book.jpg");
    });

    // Create the title and price elements with the required attributes
    const titleElem = document.createElement("span");
    titleElem.setAttribute("id", "book-title");
    titleElem.textContent = book.title;

    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "book-title");
    titleLabel.textContent = "Book Details: ";

    const priceElem = document.createElement("span");
    priceElem.setAttribute("id", "book-price");
    priceElem.textContent = book.price;

    const titlePriceP = document.createElement("p");


    const titleDiv = document.createElement("p");
    const titleP = document.createElement("p");
    const titleTl = document.createElement("tl");
    titleTl.appendChild(titleLabel);
    titleTl.appendChild(titleElem);
    titleP.appendChild(titleTl);
    titleDiv.appendChild(titleP);

    const priceDiv = document.createElement("p");
    const priceP = document.createElement("p");
    const pricePrc = document.createElement("prc");
    pricePrc.appendChild(priceElem);
    priceP.appendChild(pricePrc);
    priceDiv.appendChild(priceP);

    const descriptionDiv = document.createElement("div");
    descriptionDiv.setAttribute("class", "col col-6");

    const commentsDiv = document.createElement("div");
    commentsDiv.setAttribute("class", "col col-6");

    const commentsLabel = document.createElement("label");
    commentsLabel.setAttribute("for", "book-comments");
    commentsLabel.textContent = "Comments: ";

    const commentsInput = document.createElement("textarea");
    commentsInput.setAttribute("id", "book-comments");
    commentsInput.setAttribute("name", "book-comments");

    const commentsList = document.createElement("ul");
    commentsList.setAttribute("id", "comments-list");

    const commentsForm = document.createElement("form");
    commentsForm.setAttribute("id", "comments-form");

    const commentsNameInput = document.createElement("input");
    commentsNameInput.setAttribute("type", "text");
    commentsNameInput.setAttribute("id", "comments-name");
    commentsNameInput.setAttribute("placeholder", "Name");

    const commentsTextInput = document.createElement("textarea");
    commentsTextInput.setAttribute("id", "comments-text");
    commentsTextInput.setAttribute("placeholder", "Leave a comment");

    const commentsSubmit = document.createElement("button");
    commentsSubmit.setAttribute("class", "btn cts-btn");
    commentsSubmit.setAttribute("type", "submit");
    commentsSubmit.textContent = "Submit";

    commentsForm.appendChild(commentsNameInput);
    commentsForm.appendChild(commentsTextInput);
    commentsForm.appendChild(commentsSubmit);

    commentsDiv.appendChild(commentsLabel);
    commentsDiv.appendChild(commentsList);
    commentsDiv.appendChild(commentsForm);

    // Add event listener to the comments form
    commentsForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const commentsNameInput = event.target.elements["comments-name"];
        const commentsTextInput = event.target.elements["comments-text"];

        const name = commentsNameInput.value.trim();
        const text = commentsTextInput.value.trim();

        if (!name || !text) {
            alert("Please enter your name and comment.");
            return;
        }

        const comment = {
            name,
            text,
            timestamp: new Date().toISOString(),
            replies: [],
        };

        addComment(comment);

        commentsNameInput.value = "";
        commentsTextInput.value = "";
    });

    descriptionDiv.appendChild(bookImage);
    descriptionDiv.appendChild(document.createElement("br"));
    titlePriceP.appendChild(titleDiv);
    titlePriceP.appendChild(priceDiv);
    descriptionDiv.appendChild(titlePriceP);
    detailsWrapper.appendChild(detailsSection);
    detailsSectionRow.appendChild(descriptionDiv);
    detailsSectionRow.appendChild(commentsDiv);


    // Create the description element with the required attributes
    const authorElem = document.createElement("span");
    authorElem.setAttribute("id", "book-author");
    authorElem.textContent = book.author;

    const genreElem = document.createElement("span");
    genreElem.setAttribute("id", "book-genre");
    genreElem.textContent = book.genre;

    const ownerElem = document.createElement("span");
    ownerElem.setAttribute("id", "book-owner");
    ownerElem.textContent = book.owner;

    const ratingElem = document.createElement("p");
    ratingElem.textContent = "Rating: ";

    const optsElem = document.createElement("opts");
    for (let i = 0; i < 5; i++) {
        const starElem = document.createElement("i");
        starElem.setAttribute("class", `fa fa-star${i < book.rating ? " checked" : ""}`);
        optsElem.appendChild(starElem);
    }
    ratingElem.appendChild(optsElem);
    ratingElem.appendChild(document.createElement("br"));
    ratingElem.appendChild(document.createElement("br"));

    const descriptionP = document.createElement("p");
    const descriptionDsc = document.createElement("dsc");
    const authorP = document.createElement("p");
    authorP.textContent = "Author: ";
    authorP.appendChild(authorElem);
    const genreP = document.createElement("p");
    genreP.textContent = "Genre: ";
    genreP.appendChild(genreElem);
    const ownerP = document.createElement("p");
    ownerP.textContent = "Owner: ";
    ownerP.appendChild(ownerElem);

    descriptionDsc.appendChild(authorP);
    descriptionDsc.appendChild(genreP);
    descriptionDsc.appendChild(ownerP);
    descriptionDsc.appendChild(ratingElem);
    descriptionP.appendChild(descriptionDsc);
    descriptionDiv.appendChild(descriptionP);


    // Create the close button
    const closeButton = document.createElement("button");
    closeButton.setAttribute("class", "btn close-btn");
    closeButton.textContent = "Close";
    detailsSection.appendChild(closeButton);

    // Add event listener to the close button
    closeButton.addEventListener("click", () => {
        detailsWrapper.remove();
    });

    // Append the new section to the preview section
    previewSection.appendChild(detailsWrapper);

    detailsWrapper.classList.add('book-details-show');


}



function loadStaticBooks() {
    const booksContainer = document.getElementById("books-container-all");
    const staticBooksSections = booksContainer.querySelectorAll("section");
    staticBooksSections.forEach((bookSection) => {
        const staticBookId = bookSection.getAttribute("data-static-book-id");
        const title = bookSection.querySelector("#book-title").textContent;
        const price = bookSection.querySelector("#book-price").textContent;
        const image = bookSection.querySelector("img").getAttribute("src");
        const author = bookSection.querySelector("#book-author").textContent;
        const genre = bookSection.querySelector("#book-genre").textContent;
        const owner = bookSection.querySelector("#book-owner").textContent;
        const rating = bookSection.querySelectorAll(".fa-star.checked").length;
        staticBooks.push({
            staticBookId,
            title,
            price,
            image,
            author,
            genre,
            owner,
            rating,
            comments: [],
        });
    });
    console.log("Loaded static books:", staticBooks);
}

function renderStaticBooks() {
    staticBooks.forEach((book) => {
        renderBook(book);
    });
}

loadStaticBooks();
renderStaticBooks();

const bookDetailsButtons = document.querySelectorAll('.book-details-btn');
bookDetailsButtons.forEach(button => {
    const bookId = button.dataset.staticBookId;
    button.addEventListener('click', () => {
        console.log(`Clicked book details button with ID ${bookId}`);
        if (bookId) {
            console.log(`Showing book details for ID ${bookId}`);
            showStaticBookDetails(bookId);
        }
    });
});