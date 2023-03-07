// Get DOM elements
const createForm = document.getElementById("create-form");
const titleInput = document.getElementById("create-title");
const authorInput = document.getElementById("create-author");
const genreInput = document.getElementById("create-genre");
const priceInput = document.getElementById("create-price");
const ownerInput = document.getElementById("create-owner");
const previewSection = document.getElementById("preview-section");
const booksContainer = document.getElementById("books-container");
const createImageInput = document.getElementById("create-image");

// Function to generate a unique ID for a new book
function generateId() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

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
        ownerInput.value,
        createImageInput.files[0]
    );
    createForm.reset();
});
// Add event listener to create image input
createImageInput.addEventListener("change", function (event) {
    const previewSection = document.getElementById("preview-section");
    const previewImage = document.createElement("img");
    previewImage.setAttribute("height", "200");
    previewImage.setAttribute("src", URL.createObjectURL(event.target.files[0]));
    previewSection.appendChild(previewImage);
});

// Function to create a new book
function createBook(title, author, genre, price, owner, image) {

    // Create a new book object
    const newBook = {
        id: generateId(),
        title: title,
        author: author,
        genre: genre,
        price: price,
        owner: owner,
        rating: 1, // Set initial rating to 1
        image: image ? URL.createObjectURL(image) : null // Set image URL if image is uploaded, otherwise set to null
    };

    console.log('New book created with ID:', newBook.id);

    // Store the image URL in local storage
    if (image) {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = function () {
            const imageURL = reader.result;
            newBook.image = imageURL; // Set the image URL in the newBook object
            localStorage.setItem(`book-image-${newBook.id}`, imageURL); // Set the key for the image URL in local storage
            console.log(localStorage); // Log the localStorage object to the console
        };
    }
    
    // Add the new book to the books array
    books.push(newBook);

    // Update local storage with the new book object
  localStorage.setItem("books", JSON.stringify(books));

    // Reset image preview
    previewSection.innerHTML = "";

    // Create a new section element with the required attributes
    const newSection = document.createElement("section");
    newSection.setAttribute("data-book-id", newBook.id);
    
    // Create the image element with the required attributes
    const bookImage = document.createElement("img");
    bookImage.setAttribute("height", "330");
    bookImage.setAttribute("src", newBook.image || "./assets/images/book.jpg"); // Set the src attribute to the image URL or default image
    newSection.appendChild(bookImage);
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

    const editContainer = document.createElement("div");
    editContainer.setAttribute("class", "btn-container");

    const editBtn = document.createElement("button");
    editBtn.setAttribute("class", "btn edit-btn");
    editBtn.textContent = "Edit";
    newSection.appendChild(editBtn);

    newSection.appendChild(editContainer);

    const removeBtn = document.createElement("button");
    removeBtn.setAttribute("class", "btn remove-btn");
    removeBtn.textContent = "Remove";
    newSection.appendChild(removeBtn);

    

    // Add event listeners to the edit and remove buttons
    editBtn.addEventListener("click", () => {
        editBook(newBook.id);
    });
    removeBtn.addEventListener("click", () => {
        removeBook(newBook.id);
    });

    // Append the new section to the books container
    booksContainer.prepend(newSection);
    $('.filtering select').trigger('change');

}

function renderBook(book) {
    // Find the book in the books array by its ID
    const bookIndex = books.findIndex(b => b.id === book.id);
    if (bookIndex === -1) {
        console.error(`Book not found for ID ${book.id}`);
        return;
    }
    const bookSection = document.querySelector(`[data-book-id="${book.id}"]`);
    if (!bookSection) {
        console.error(`Book section not found for book ID ${book.id}`);
        return;
    }

    // Update the image source
    const bookImage = bookSection.querySelector("img");
    bookImage.setAttribute("src", book.image || "./assets/images/book.jpg");

    // Update the title
    const titleElem = bookSection.querySelector("#book-title");
    titleElem.textContent = book.title;

    // Update the price
    const priceElem = bookSection.querySelector("#book-price");
    priceElem.textContent = book.price;

    // Update the author
    const authorElem = bookSection.querySelector("#book-author");
    authorElem.textContent = book.author;

    // Update the genre
    const genreElem = bookSection.querySelector("#book-genre");
    genreElem.textContent = book.genre;

    // Update the owner
    const ownerElem = bookSection.querySelector("#book-owner");
    ownerElem.textContent = book.owner;
}



// Function to edit a book
function editBook(bookId) {
    // Find the book in the books array by its ID
    const bookIndex = books.findIndex(book => book.id === bookId);
    const book = books[bookIndex];

    // Find the book section on the page
    const bookSection = document.querySelector(`[data-book-id="${bookId}"]`);
    if (!bookSection) {
        console.error(`Book section not found for book ID ${bookId}`);
        return;
    }

    // Create the edit form with input fields for each book property
    const editForm = document.createElement("form");
    editForm.setAttribute("class", "wrapper");

    const titleInput = document.createElement("input");
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("placeholder", "Title");
    titleInput.value = book.title;

    const authorInput = document.createElement("input");
    authorInput.setAttribute("type", "text");
    authorInput.setAttribute("placeholder", "Author");
    authorInput.value = book.author;

    const genreInput = document.createElement("input");
    genreInput.setAttribute("type", "text");
    genreInput.setAttribute("placeholder", "Genre");
    genreInput.value = book.genre;

    const priceInput = document.createElement("input");
    priceInput.setAttribute("type", "number");
    priceInput.setAttribute("placeholder", "Price");
    priceInput.value = book.price;

    const ownerInput = document.createElement("input");
    ownerInput.setAttribute("type", "text");
    ownerInput.setAttribute("placeholder", "Owner");
    ownerInput.value = book.owner;

    const imageInput = document.createElement("input");
    imageInput.setAttribute("type", "file");

    const submitBtn = document.createElement("button");
    submitBtn.setAttribute("type", "submit");
    submitBtn.textContent = "Save Changes";

    // Add an event listener to the edit form
    editForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Update the book object with the new property values
        book.title = titleInput.value;
        book.author = authorInput.value;
        book.genre = genreInput.value;
        book.price = parseFloat(priceInput.value);
        book.owner = ownerInput.value;

        if (imageInput.files.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(imageInput.files[0]);
            reader.onload = function () {
                const imageURL = reader.result;
                book.image = imageURL; // Set the image URL in the book object
                localStorage.setItem(`book-image-${book.id}`, imageURL); // Set the key for the image URL in local storage
                console.log(localStorage); // Log the localStorage object to the console
            };
        }

        // Update the book in the books array and local storage
        books[bookIndex] = book;
        localStorage.setItem("books", JSON.stringify(books));

        // Render the updated book on the page
        renderBook(book);

        // Remove the edit form
        editForm.remove();
    });

    // Append the input fields and submit button to the edit form
    editForm.appendChild(titleInput);
    editForm.appendChild(authorInput);
    editForm.appendChild(genreInput);
    editForm.appendChild(priceInput);
    editForm.appendChild(ownerInput);
    editForm.appendChild(imageInput);
    editForm.appendChild(submitBtn);

    // Append the edit form to the books container
    bookSection.appendChild(editForm);
    // Add the 'show' class to the edit wrapper
    const editWrapper = document.getElementById("edit-wrapper");
    editWrapper.classList.add("show");
}


// Function to remove a book
function removeBook(bookId) {
    // Find the book in the books array by its ID
    const bookIndex = books.findIndex(book => book.id === bookId);

    // Remove the book from the books array and local storage
    books.splice(bookIndex, 1);
    localStorage.setItem("books", JSON.stringify(books));

    // Remove the book section from the page
    const bookSection = document.querySelector(`[data-book-id="${bookId}"]`);
    bookSection.remove();
}