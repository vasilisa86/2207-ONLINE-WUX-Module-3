// Get DOM elements
const createForm = document.getElementById("create-form");
const titleInput = document.getElementById("create-title");
const authorInput = document.getElementById("create-author");
const genreInput = document.getElementById("create-genre");
const priceInput = document.getElementById("create-price");
const ownerInput = document.getElementById("create-owner");
const booksContainer = document.getElementById("books-container");


// Load books from local storage
let books = localStorage.getItem("books");
if (!books) {
    // If no books are found in local storage, initialize the books array
    books = [];
} else {
    // If books are found in local storage, parse the JSON string to an object
    books = JSON.parse(books);
    //// Clear the books container to prevent duplicates
    //booksContainer.innerHTML = "";
}

// Render books on page load
books.forEach((book) => {
    createBook(book.title, book.author, book.genre, book.price, book.owner);
});

// Add event listener to create book form
createForm.addEventListener("submit", function (event) {
    event.preventDefault();
    createBook(
        titleInput.value,
        authorInput.value,
        genreInput.value,
        parseFloat(priceInput.value),
        ownerInput.value
    );
    createForm.reset();
});

// Function to create a new book
function createBook(title, author, genre, price, owner) {
    // Create a new book object
    const newBook = {
        title: title,
        author: author,
        genre: genre,
        price: price,
        owner: owner,
        rating: 1 // Set initial rating to 0
    };

    // Add the new book to the books array
    books.push(newBook);

    // Store the updated books array in local storage
    localStorage.setItem("books", JSON.stringify(books));

    // Create a new section element with the required attributes
    const newSection = document.createElement("section");
        
    // Create the image element with the required attributes
    const image = document.createElement("img");
    image.setAttribute("src", "./assets/images/book.jpg");
    image.setAttribute("height", "330");
    newSection.appendChild(image);
    newSection.appendChild(document.createElement("br"));

    // Create the title and price elements with the required attributes
    const titleElem = document.createElement("span");
    titleElem.setAttribute("id", "book-title");
    titleElem.textContent = title;

    const priceElem = document.createElement("span");
    priceElem.setAttribute("id", "book-price");
    priceElem.textContent = price;

    const titlePriceDiv = document.createElement("div");
    titlePriceDiv.setAttribute("class", "row");

    const titleDiv = document.createElement("div");
    titleDiv.setAttribute("class", "col col-6 col-s-6");
    const titleP = document.createElement("p");
    const titleTl = document.createElement("tl");
    titleTl.appendChild(titleElem);
    titleP.appendChild(titleTl);
    titleDiv.appendChild(titleP);

    const priceDiv = document.createElement("div");
    priceDiv.setAttribute("class", "col-6 col-s-6");
    const priceP = document.createElement("p");
    const pricePrc = document.createElement("prc");
    pricePrc.appendChild(priceElem);
    priceP.appendChild(pricePrc);
    priceDiv.appendChild(priceP);

    titlePriceDiv.appendChild(titleDiv);
    titlePriceDiv.appendChild(priceDiv);
    newSection.appendChild(titlePriceDiv);

    // Create the description element with the required attributes
    const authorElem = document.createElement("span");
    authorElem.setAttribute("id", "book-author");
    authorElem.textContent = author;

    const genreElem = document.createElement("span");
    genreElem.setAttribute("id", "book-genre");
    genreElem.textContent = genre;

    const ownerElem = document.createElement("span");
    ownerElem.setAttribute("id", "book-owner");
    ownerElem.textContent = owner;

    const ratingElem = document.createElement("p");
    ratingElem.textContent = "Rating: ";

    const optsElem = document.createElement("opts");
    for (let i = 0; i < 5; i++) {
        const starElem = document.createElement("i");
        starElem.setAttribute("class", "fa fa-star");
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
    newSection.appendChild(descriptionP);

    // Create the buttons
    const cartBtn = document.createElement("button");
    cartBtn.setAttribute("class", "btn my-cart-btn");
    cartBtn.textContent = "Add to Cart";
    newSection.appendChild(cartBtn);

    const detailsBtn = document.createElement("button");
    detailsBtn.setAttribute("class", "btn");
    detailsBtn.textContent = "Book Details";
    newSection.appendChild(detailsBtn);

    // Append the new section to the books container
    booksContainer.prepend(newSection);
    $('.filtering select').trigger('change');

}


