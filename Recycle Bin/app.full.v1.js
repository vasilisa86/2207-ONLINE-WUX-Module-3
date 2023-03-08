// Get DOM elements
const createForm = document.getElementById("create-form");
const titleInput = document.getElementById("create-title");
const authorInput = document.getElementById("create-author");
const genreInput = document.getElementById("create-genre");
const priceInput = document.getElementById("create-price");
const ownerInput = document.getElementById("create-owner");
const list = document.getElementById("list");
const details = document.getElementById("details");

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
    titleInput.value = "";
    authorInput.value = "";
    genreInput.value = "";
    priceInput.value = "";
    ownerInput.value = "";
    viewBookList();
});

// Function to show book details
function showDetails(index) {
    let book = books[index];
    let html = `
    <div class="details">
      <h2>${book.title}</h2>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Genre:</strong> ${book.genre}</p>
      <p><strong>Price:</strong> $${book.price}</p>
      <p><strong>Price:</strong> $${book.owner}</p>
      <h3>Comments</h3>
      <ul class="comments">
  `;
    book.comments.forEach(function (comment, index) {
        html += `
      <li class="comment">
        <p><strong>${comment.user}:</strong> ${comment.text}</p>
    `;
        if (comment.reply) {
            html += `
        <p class="reply"><strong>${comment.bookOwner}:</strong> ${comment.reply}</p>
      `;
        } else if (book.owner) {
            html += `
        <form class="reply-form">
          <label for="reply-text-${index}">Reply to ${comment.user}:</label>
          <input type="text" id="reply-text-${index}" required>
          <button type="submit">Reply</button>
        </form>
      `;
        }
        html += `
      </li>
    `;
    });
    if (book.owner) {
        html += `
      <form id="comment-form">
        <label for="comment-text">Leave a comment:</label>
        <input type="text" id="comment-text" required>
        <button type="submit">Comment</button>
      </form>
    `;
    }
    html += `
      </ul>
    </div>
  `;
    details.innerHTML = html;

    // Add event listeners to reply and comment forms
    let replyForms = document.getElementsByClassName("reply-form");
    for (let i = 0; i < replyForms.length; i++) {
        replyForms[i].addEventListener("submit", function (event) {
            event.preventDefault();
            let replyInput = this.querySelector("input[type='text']");
            let replyText = replyInput.value;
            let commentIndex = parseInt(replyInput.id.split("-")[2]);
            let book = books[index];
            book.comments[commentIndex].reply = replyText;
            saveBooks();
            showDetails(index);
        });
    }
    let commentForm = document.getElementById("comment-form");
    if (commentForm) {
        commentForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let commentText = document.getElementById("comment-text").value;
            let book = books[index];
            book.comments.push({ user: "User", text: commentText });
            saveBooks();
            showDetails(index);
        });
    }
}

// Load books from local storage or initialize with sample data
let books = JSON.parse(localStorage.getItem("books"));
if (!books) {
    books = [
        {
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            genre: "Classic",
            price: 15.99,
            owner: "Bookstore",
            comments: []
        },
        {
            title: "The Catcher in the Rye",
            author: "J.D. Salinger",
            genre: "Classic",
            price: 12.99,
            owner: "Bookstore",
            comments: []
        },
        {
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            genre: "Classic",
            price: 14.99,
            owner: "Bookstore",
            comments: []
        },
        {
            title: "New Book Title",
            author: "New Book Author",
            genre: "New Book Genre",
            price: 9.99,
            owner: "New Book Owner",
            comments: []
        }
    ];
    saveBooks();
}


// Save books to local storage
function saveBooks() {
    localStorage.setItem("books", JSON.stringify(books));
}

// Function to create a new book
function createBook(title, author, genre, price, owner) {
    books.push({ title, author, genre, price, owner, comments: [] });
    saveBooks();
    viewBookList();
}

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


// Function to edit an existing book
function editBook(index) {
    let book = books[index];
    let title = prompt("Enter book title:", book.title);
    let author = prompt("Enter book author:", book.author);
    let genre = prompt("Enter book genre:", book.genre);
    let price = parseFloat(prompt("Enter book price:", book.price));
    let owner = prompt("Enter book owner:", book.owner);
    book.title = title;
    book.author = author;
    book.genre = genre;
    book.price = price;
    book.owner = owner;
    saveBooks();
    viewBookList();
}

// Function to delete a book
function deleteBook(index) {
    if (confirm("Are you sure you want to delete this book?")) {
        books.splice(index, 1);
        saveBooks();
        viewBookList();
        details.innerHTML = "";
    }
}

// Show book list
viewBookList();

// Function to display book details
function viewBookDetails(index) {
    let book = books[index];
    let html = "<h2>" + book.title + "</h2>";
    html += "<p><strong>Author:</strong> " + book.author + "</p>";
    html += "<p><strong>Genre:</strong> " + book.genre + "</p>";
    html += "<p><strong>Price:</strong> $" + book.price.toFixed(2) + "</p>";
    html += "<p><strong>Owner:</strong> " + book.owner + "</p>";
    html += "<h3>Comments</h3>";
    html += "<ul>";
    book.comments.forEach(function (comment, index) {
        html += "<li>" + comment + "</li>";
    });
    html += "</ul>";
    html += "<h3>Add Comment</h3>";
    html += '<form onsubmit="return false;">';
    html += '<input type="text" id="comment-text" placeholder="Enter comment">';
    html += '<button id="add-comment">Add Comment</button>';
    html += "</form>";
    details.innerHTML = html;
    let addCommentButton = document.getElementById("add-comment");
    addCommentButton.addEventListener("click", function () {
        let commentText = document.getElementById("comment-text");
        let comment = commentText.value.trim();
        if (comment !== "") {
            book.comments.push(comment);
            saveBooks();
            viewBookDetails(index);
        }
    });
}

// Function to show book list
function viewBookList() {
    let html = "";
    for (let i = 0; i < books.length; i++) {
        let book = books[i];
        html += `
        <li>
            <a href="#" onclick="viewBookDetails(${i});">${book.title}</a>
            <button onclick="editBook(${i})">Edit</button>
            <button onclick="deleteBook(${i})">Delete</button>
        </li>
        `;
    }
    list.innerHTML = ""; // Clear existing list items
    list.innerHTML = html; // Append new list items
}

