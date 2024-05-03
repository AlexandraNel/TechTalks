// Event listener for submitting a comment
document.addEventListener('DOMContentLoaded', function () {
    const commentForm = document.getElementById("comment-form");
    if (commentForm) {
        commentForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const commentContent = document.getElementById('comment-content').value;
            const blogId = document.querySelector('.delete-blog').dataset.blogId;

            try {
                // Send a request to the server to create a new comment
                const response = await fetch(`/api/blog/${blogId}/comment`, {
                    method: 'POST',
                    body: JSON.stringify({ content: commentContent }),
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.ok) {
                    // If the request is successful, reload the page to show the new comment
                    document.location.reload();
                } else {
                    // If the request fails, log an error message
                    console.error('Failed to create a new comment');
                }
            } catch (err) {
                console.error(err); // Log any errors that occur during the fetch request
            }
        });
    } else {
        console.error("Error with the comment form");
    }
});

// Event listener for clicking the "Delete" button for a comment
document.addEventListener('DOMContentLoaded', function () {
    const deleteButtons = document.querySelectorAll(".delete-comment");
    if (deleteButtons) {
        deleteButtons.forEach(button => {
            button.addEventListener("click", async () => {
                if (confirm("Are you sure you want to delete this comment?")) {
                    const commentId = button.dataset.commentId; // Get the comment ID from the button's data attribute
                    try {
                        // Send a request to the server to delete the comment
                        const response = await fetch(`/api/comment/${commentId}`, {
                            method: 'DELETE'
                        });

                        if (response.ok) {
                            // If the request is successful, reload the page to show the updated list of comments
                            document.location.reload();
                        } else {
                            // If the request fails, log an error message
                            console.error('Failed to delete comment');
                        }
                    } catch (err) {
                        console.error(err); // Log any errors that occur during the fetch request
                    }
                }
            });
        });
    } else {
        console.error("Error with the delete comment button");
    }
});