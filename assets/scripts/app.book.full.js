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
const commentsForm = document.querySelector("#comments-form");



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
    // Remove duplicates from the books array
    books = books.filter((book, index) => {
        return (
            index ===
            books.findIndex((b) => b.title === book.title)
        );
    });
}


// Update local storage with the updated books array
localStorage.setItem("books", JSON.stringify(books));

// Render books on page load
if (books.length > 0) {
    books.forEach((book) => {
        createBook(book.title, book.author, book.genre, book.price, book.owner, book.image, book.id);
    });
}

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
    
    const previewImage = document.createElement("img");
    previewImage.setAttribute("height", "200");
    previewImage.setAttribute("src", URL.createObjectURL(event.target.files[0]));
    previewSection.appendChild(previewImage);
});

// Function to create a new book
function createBook(title, author, genre, price, owner, image, id) {
    // If ID is not provided, generate a new ID
    if (!id) {
        id = generateId();
    }
    
    // Create a new book object
    const newBook = {
        id: id,
        title: title,
        author: author,
        genre: genre,
        price: price,
        owner: owner,
        rating: 1, // Set initial rating to 1
        image: null // Set image URL if image is uploaded, otherwise set to null
    };

    console.log('New book created with ID:', newBook.id);
    console.log("New books store:", books);

    // Store the image URL in local storage
    if (image) {
        if (image instanceof File) {
            const imageURL = URL.createObjectURL(image);
            newBook.image = imageURL; // Set the image URL in the newBook object
            localStorage.setItem(`book-image-${newBook.id}`, imageURL); // Set the key for the image URL in local storage
            console.log(localStorage); // Log the localStorage object to the console
        }
    }
    
    // Add the new book to the books array
    books.push(newBook);

    // Update local storage with the new book object
    localStorage.setItem("books", JSON.stringify(books));

    // Update the books array from local storage
    books = JSON.parse(localStorage.getItem("books"));

    // Reset image preview
    previewSection.innerHTML = "";

    // Create a new section element with the required attributes
    const newSection = document.createElement("section");
    newSection.setAttribute("data-book-id", newBook.id);
    newSection.classList.add("f-cat", "active");
        
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
    
    const btnContainer = document.createElement("btn-container");
    
    const cartBtn = document.createElement("button");
    cartBtn.setAttribute("class", "btn-unv");
    cartBtn.setAttribute("title", "You can't buy your own products");
    cartBtn.textContent = "Add to Cart";
    btnContainer.appendChild(cartBtn);

    const detailsBtn = document.createElement("button");
    detailsBtn.setAttribute("class", "btn");
    detailsBtn.textContent = "Book Details";
    btnContainer.appendChild(detailsBtn);

    // Add event listener to the "Book Details" button
    detailsBtn.addEventListener("click", () => {
        showBookDetails(newBook.id);
    });

    const editContainer = document.createElement("div");
    editContainer.setAttribute("class", "btn-container");

    const editBtn = document.createElement("button");
    editBtn.setAttribute("class", "btn edit-btn");
    editBtn.textContent = "Edit";
    btnContainer.appendChild(editBtn);
    
    const removeBtn = document.createElement("button");
    removeBtn.setAttribute("class", "btn remove-btn");
    removeBtn.textContent = "Remove";
    btnContainer.appendChild(removeBtn);

    newSection.appendChild(btnContainer);
    newSection.appendChild(editContainer);

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
    let bookIndex;
    if (book.id) {
        bookIndex = books.findIndex(b => b.id === book.id);
        if (bookIndex === -1) {
            console.error(`Book not found for ID ${book.id}`);
            return;
        }
    }
    const bookSection = document.querySelector(`[data-book-id="${book.id}"], [data-static-book-id="${book.staticBookId}"]`);
    if (!bookSection) {
        console.error(`Book section not found for book ID ${ book.id || book.staticBookId }`);
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
    const editWrapper = document.createElement("div");
    editWrapper.setAttribute("class", "edit-wrapper");

    const editForm = document.createElement("form");
    editForm.setAttribute("class", "form");

    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "edit-title");
    titleLabel.textContent = "Title:";
    const titleInput = document.createElement("input");
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("id", "edit-title");
    titleInput.setAttribute("placeholder", "Title");
    titleInput.value = book.title;

    const authorLabel = document.createElement("label");
    authorLabel.setAttribute("for", "edit-author");
    authorLabel.textContent = "Author:";
    const authorInput = document.createElement("input");
    authorInput.setAttribute("type", "text");
    authorInput.setAttribute("id", "edit-author");
    authorInput.setAttribute("placeholder", "Author");
    authorInput.value = book.author;

    const genreLabel = document.createElement("label");
    genreLabel.setAttribute("for", "edit-genre");
    genreLabel.textContent = "Genre:";
    const genreInput = document.createElement("input");
    genreInput.setAttribute("type", "text");
    genreInput.setAttribute("id", "edit-genre");
    genreInput.setAttribute("placeholder", "Genre");
    genreInput.value = book.genre;

    const priceLabel = document.createElement("label");
    priceLabel.setAttribute("for", "edit-price");
    priceLabel.textContent = "Price:";
    const priceInput = document.createElement("input");
    priceInput.setAttribute("type", "number");
    priceInput.setAttribute("id", "edit-price");
    priceInput.setAttribute("placeholder", "Price");
    priceInput.value = book.price;

    const ownerLabel = document.createElement("label");
    ownerLabel.setAttribute("for", "edit-owner");
    ownerLabel.textContent = "Owner:";
    const ownerInput = document.createElement("input");
    ownerInput.setAttribute("type", "text");
    ownerInput.setAttribute("id", "edit-owner");
    ownerInput.setAttribute("placeholder", "Owner");
    ownerInput.value = book.owner;

    const imageLabel = document.createElement("label");
    imageLabel.setAttribute("for", "edit-image");
    imageLabel.textContent = "Image:";
    const imageInput = document.createElement("input");
    imageInput.setAttribute("type", "file");
    imageInput.setAttribute("id", "edit-image");

    const saveChangesBtn = document.createElement("button");
    saveChangesBtn.setAttribute("type", "submit");
    saveChangesBtn.setAttribute("id", "save-changes-btn");
    saveChangesBtn.textContent = "Save Changes";

    const closeBtnWrapper = document.createElement("div");
    closeBtnWrapper.setAttribute("class", "close-ca-form");

    const closeBtn = document.createElement("div");
    closeBtn.innerHTML = "<i class='bx bx-x'></i>";
    closeBtn.addEventListener("click", () => editWrapper.remove());

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
        editWrapper.remove();
    });

    // Append the edit form to the edit wrapper
    editWrapper.appendChild(editForm);
    

    // Append the input fields and submit button to the edit form
    editForm.appendChild(titleLabel);
    editForm.appendChild(titleInput);
    editForm.appendChild(authorLabel);
    editForm.appendChild(authorInput);
    editForm.appendChild(genreLabel);
    editForm.appendChild(genreInput);
    editForm.appendChild(priceLabel);
    editForm.appendChild(priceInput);
    editForm.appendChild(ownerLabel);
    editForm.appendChild(ownerInput);
    editForm.appendChild(imageLabel);
    editForm.appendChild(imageInput);
    editForm.appendChild(saveChangesBtn);
    closeBtnWrapper.appendChild(closeBtn);
    editForm.appendChild(closeBtnWrapper);
    
    

    // Append the edit wrapper to the books container
    booksContainer.appendChild(editWrapper);
    
    // Show the edit wrapper
    editWrapper.classList.add('show');
}


function removeBook(bookId) {
    // Find the book in the books array by its ID
    const bookIndex = books.findIndex(book => book.id === bookId);

    console.log("Book to remove:", books[bookIndex]);

    // Remove the book from the books array and local storage
    books.splice(bookIndex, 10);
    localStorage.setItem("books", JSON.stringify(books));
    console.log("Books removed from local storage by Button:", books);

    // Remove the book section from the page
    const bookSection = document.querySelector(`[data-book-id="${bookId}"]`);
    bookSection.remove();

    console.log("Remaining books:", books);
}


// Function to show book details
function showBookDetails(id) {
    console.log(books);
    // Find the book in the books array with the provided id
    const book = books.find((book) => book.id === id);

    // Create a new div element with the required attributes
    const detailsWrapper = document.createElement("div");
    detailsWrapper.classList.add("book-details-wrapper");

    // Create a new section element with the required attributes
    const detailsSection = document.createElement("section");
    detailsSection.classList.add("book-details");
    detailsSection.setAttribute("data-book-id", book.id);

    const detailsSectionRow = document.createElement("div");
    detailsSectionRow.classList.add("row");
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
    titleElem.classList.add("book-title");
    titleElem.textContent = book.title;

    const priceElem = document.createElement("span");
    priceElem.classList.add("book-price");
    priceElem.textContent = book.price;

    const titlePriceDiv = document.createElement("div");
    titlePriceDiv.classList.add("book-title-price");

    titlePriceDiv.appendChild(titleElem);
    titlePriceDiv.appendChild(priceElem);


    const descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("book-desc", "col", "col-4", "col-s-4");

    const commentsDiv = document.createElement("div");
    commentsDiv.classList.add("book-comms", "col", "col-8", "col-s-8");

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

    // Append the elements to the description div

    descriptionDiv.appendChild(bookImage);
    descriptionDiv.appendChild(document.createElement("br"));
    descriptionDiv.appendChild(titlePriceDiv);
    descriptionDiv.appendChild(descriptionDsc);
    detailsWrapper.appendChild(detailsSection);
    detailsSectionRow.appendChild(descriptionDiv);
    detailsSectionRow.appendChild(commentsDiv);

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



function formatDate(timestamp) {
    const date = new Date(timestamp);
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const seconds = "0" + date.getSeconds();
    return `${day} ${month} ${year} ${hours}:${minutes.substr(-2)}:${seconds.substr(
        -2
    )}`;
}


function addComment(comment) {

    const commentsList = document.querySelector("#comments-list");

    const commentWrapper = document.createElement("div");
    commentWrapper.setAttribute("class", "comment-wrapper");

    const commentText = document.createElement("p");
    commentText.textContent = comment.text;

    const commentInput = document.createElement("textarea");
    commentInput.setAttribute("id", "comment-input");
    commentInput.setAttribute("name", "comment-input");

    const commentTimestamp = document.createElement("span");
    commentTimestamp.setAttribute("class", "comment-timestamp");
    commentTimestamp.textContent = formatDate(comment.timestamp);

    const replyLink = document.createElement("a");
    replyLink.setAttribute("href", "#");
    replyLink.textContent = "Reply";
    replyLink.addEventListener("click", (event) => {
        event.preventDefault();
        showReplyForm(commentWrapper);
    });

    const replyList = document.createElement("div");
    replyList.setAttribute("class", "reply-list");

    const commentReplies = comment.replies || [];

    commentReplies.forEach((reply) => {
        addReply(reply, replyList);
    });

    const replyFormWrapper = document.createElement("div");
    replyFormWrapper.setAttribute("class", "reply-form-wrapper");

    const replyForm = document.createElement("form");

    const commentsNameInput = document.createElement("input");
    commentsNameInput.setAttribute("type", "text");
    commentsNameInput.setAttribute("id", "comments-name");
    commentsNameInput.setAttribute("placeholder", "Name");

    const replyInput = document.createElement("textarea");
    replyInput.setAttribute("name", "reply-input");
    replyInput.setAttribute("placeholder", "Add a reply");

    const replyButton = document.createElement("button");
    replyButton.setAttribute("type", "submit");
    replyButton.textContent = "Reply";

    replyForm.appendChild(commentsNameInput);
    replyForm.appendChild(replyInput);
    replyForm.appendChild(replyButton);
    replyFormWrapper.appendChild(replyForm);

    commentWrapper.appendChild(commentText);
    commentWrapper.appendChild(commentTimestamp);
    commentWrapper.appendChild(replyLink);
    commentWrapper.appendChild(replyList);
    commentWrapper.appendChild(replyFormWrapper);

    commentsList.appendChild(commentWrapper);

    /// Function to add a reply to the reply list
    function addReply(reply, replyList) {
        // Create a new list item element with the reply text
        const replyItem = document.createElement("p");
        replyItem.textContent = reply.text;

        // Append the new list item to the reply list
        replyList.appendChild(replyItem);
    }
    // Add event listener to the reply form
    replyForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const replyInput = event.target.elements["comments-text"];
        const replyText = replyInput.value.trim();

        const nameInput = event.target.elements["comments-name"];
        const nameText = nameInput.value.trim();

        if (!nameText) {
            alert("Please enter your name.");
            return;
        }

        if (!replyText) {
            alert("Please enter a comment.");
            return;
        }

        const reply = {
            text: replyText,
            timestamp: new Date().toISOString(),
            name: nameText,
        };

        addReply(reply, replyList);

        replyInput.value = "";
        nameInput.value = "";
    });

}


function showReplyForm(commentWrapper) {
    const replyFormWrapper = document.createElement("div");
    replyFormWrapper.setAttribute("class", "reply-form-wrapper");

    const replyForm = document.createElement("form");

    const replyInput = document.createElement("textarea");
    replyInput.setAttribute("name", "reply-input");
    replyInput.setAttribute("placeholder", "Add a reply");

    const replyButton = document.createElement("button");
    replyButton.setAttribute("type", "submit");
    replyButton.textContent = "Reply";

    replyForm.appendChild(replyInput);
    replyForm.appendChild(replyButton);
    replyFormWrapper.appendChild(replyForm);

    const replyList = commentWrapper.querySelector(".reply-list");
    replyList.appendChild(replyFormWrapper);


    // Add event listener to the reply form
    replyForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const replyInput = event.target.elements["reply-input"];
        const replyText = replyInput.value.trim();

        if (!replyText) {
            alert("Please enter a reply.");
            return;
        }

        const reply = {
            text: replyText,
            timestamp: new Date().toISOString(),
        };

        addReply(reply, replyList);

        replyInput.value = "";
    });


}


   








