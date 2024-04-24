
// -----------------------------------------------------------------
//Signup Function followed by event listener
const signupFormHandler = async (event) => {
  event.preventDefault();

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

      const responseData = await response.json();

      if(responseData.error) {
    alert ('user already exists, try signing in');
     
    } else {
      alert(err);
    }
  }
};

document.addEventListener('DOMContentLoaded', function() {
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
      signupForm.addEventListener("submit", signupFormHandler);
  } else {
      console.error("Signup form not found.");
  }
});}



