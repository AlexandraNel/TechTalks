
// -----------------------------------------------------------------
//Signup Function followed by event listener
const signupFormHandler = async (event) => {
  event.preventDefault();
  console.log("Signup handler loaded");


  const username = document.getElementById('username-signup').value.trim();
  const email = document.getElementById('email-signup').value.trim();
  const password = document.getElementById('password-signup').value.trim();

  // clientside validation for password
  if (!password || password.length<8) {
    alert("Password must be at least 8 characters long");
    return
  }

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {
      document.location.replace('/');
    } else {
      try {
        const responseData = await response.json();
        if (response.status === 400) {
          alert(responseData.message || 'Invalid data, please check your input and try again.');
        } else if (response.status === 409) {
          alert('User already exists, try signing in.');
        } else {
          alert('Failed to sign up. Please try again.');
        }
      } catch (error) {
        alert('Failed to sign up. Please try again.');
      }
    }
  };

};

document.addEventListener('DOMContentLoaded', function() {
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
      signupForm.addEventListener("submit", signupFormHandler);
  } else {
      console.error("Signup form not found.");
  }
});



