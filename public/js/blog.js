
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

// New blog submit function
const newBlogFormHandler = async (event) => {
    event.preventDefault();
    console.log("newBlog handler loaded");

    const blogTitle = document.getElementById('title').value ;
    const blogEntry = document.getElementById('body').value ;

    //check for entry

    if (blogTitle && blogEntry) {
        const response = await fetch ('/api/blog', {
            method: 'POST',
            body: JSON.stringify({ blogTitle, blogEntry }),
            headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/');
            } else {
                try {
                const responseData = await response.json();
                if (response.status === 400) {
                    alert(responseData.message || 'Invalid data, please check your input and try again.');
                  } else {
                    alert('Failed to post your blog, please try again.');
                  }
                } catch (error) {
                  alert('Something went terribly wrong, check your dashboard.');
                }
            }
    }
};

// Event Listener for new blog (api is managed on the form itself, this is for redirect)
document.addEventListener('DOMContentLoaded', function() {
    const newBlogForm = document.getElementById("newBlogForm");
    if (newBlogForm) {
        newBlogForm.addEventListener("submit", newBlogFormHandler);
    } else {
        console.error("newBlogForm not submitted.");
    }
  });

