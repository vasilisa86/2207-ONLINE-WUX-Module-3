// Define a class to represent a comment
class Comment {
    constructor(name, comment) {
        this.name = name;
        this.comment = comment;
        this.timestamp = new Date();
    }

    // Convert the comment to an object that can be stored in localStorage
    toObject() {
        return {
            name: this.name,
            comment: this.comment,
            timestamp: this.timestamp.toISOString(),
        };
    }

    // Format the comment as a string for display
    toString() {
        return `${this.name} (${this.timestamp.toLocaleString()}):\n${this.comment}`;
    }

    // Convert an object from localStorage back into a Comment object
    static fromObject(obj) {
        const comment = new Comment(obj.name, obj.comment);
        comment.timestamp = new Date(obj.timestamp);
        return comment;
    }
}

// Wait for the DOM to finish loading
document.addEventListener("DOMContentLoaded", function () {
    // Get all of the comment forms on the page
    const commentForms = document.querySelectorAll(".comment-form");

    // Load comments from localStorage for each section
    const sections = document.querySelectorAll('section.f-cat');
    sections.forEach(function (section) {
        const commentsKey = section.id + '-comments';
        const comments = JSON.parse(localStorage.getItem(commentsKey)) || [];
        const commentList = section.querySelector('ul.comments');
        comments.forEach(function (commentObj) {
            const comment = Comment.fromObject(commentObj);
            const commentListItem = document.createElement("li");
            commentListItem.textContent = comment.toString();
            commentList.appendChild(commentListItem);
        });
    });

    // For each comment form, attach an event listener to handle form submissions
    commentForms.forEach(function (commentForm) {
        commentForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent the form from submitting normally

            // Get the name and comment values from the form
            const name = commentForm.querySelector('input[name="name"]').value;
            const comment = commentForm.querySelector('textarea[name="comment"]').value;

            // Create a new Comment object and add it to the appropriate comment list
            const newComment = new Comment(name, comment);
            const commentList = commentForm.previousElementSibling; // Get the <ul> element before the form
            const newCommentListItem = document.createElement("li");
            newCommentListItem.textContent = newComment.toString();
            commentList.appendChild(newCommentListItem);

            // Save the comments to localStorage
            const sectionId = commentForm.closest('section.f-cat').id;
            const commentsKey = sectionId + '-comments';
            const comments = JSON.parse(localStorage.getItem(commentsKey)) || [];
            comments.push(newComment.toObject());
            localStorage.setItem(commentsKey, JSON.stringify(comments));

            // Reset the form fields
            commentForm.reset();
        });
    });
});
