// DELETE BLOG Event listener for clicking the "Read" button 
// using event bubbling for dynamic buttons
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-blog')) {
        const deleteBlogId = e.target.getAttribute('data-id'); // Get the blog ID from the custom data attribute
        deleteBlog(deleteBlogId);
    }
});

// Delete blog
async function deleteBlog(deleteBlogId) {
    try {
        const response = await fetch(`/api/blog/${deleteBlogId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
        if (response.ok) {
            document.location.replace('/');
        } else {

            const responseData = await response.json();
            if (response.status === 400) {
                alert(responseData.message || 'Bad request.');
            } else {
                alert('Failed to delete this blog.');
            }
        }
    } catch (error) {
        console.error('Something went terribly wrong, check your dashboard.', error);
        alert('Something went terribly wrong, check your dashboard.');
    }
};



// NEW BLOG 
const newBlogFormHandler = async (event) => {
    event.preventDefault();
    console.log("newBlog handler loaded");

    const blogTitle = document.getElementById('title').value;
    const blogEntry = document.getElementById('body').value;

    // Check for entry
    if (blogTitle && blogEntry) {
        const response = await fetch('/api/blog', {
            method: 'POST',
            body: JSON.stringify({ title: blogTitle, body: blogEntry }),
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


document.addEventListener('DOMContentLoaded', function () {
    const newBlogForm = document.getElementById("newBlogForm");
    if (newBlogForm) {
        newBlogForm.addEventListener("submit", newBlogFormHandler);
    } else {
        console.error("newBlogForm not found.");
    }
});



