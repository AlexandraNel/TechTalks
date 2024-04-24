// Event listener for clicking the "Read" button
document.addEventListener('DOMContentLoaded', function () {
    const readButtons = document.querySelectorAll(".read-blog");
    if (readButtons) {
        readButtons.forEach(button => {
            button.addEventListener("click", async () => {
                const blogId = button.dataset.blogId; // Get the blog ID from the button's data attribute
                try {
                    // Fetch the specific blog post by its ID
                    const response = await fetch(`/api/blog/${blogId}`);
                    if (response.ok) {
                        // If the request is successful, redirect the user to the blog post page
                        document.location.replace(`/blog/${blogId}`);
                    } else {
                        // If the request fails, log an error message
                        console.error('Failed to fetch blog post');
                    }
                } catch (err) {
                    console.error(err); // Log any errors that occur during the fetch request
                }
            });
        });
    } else {
        console.error("Error with the opening blog post");
    }
});
