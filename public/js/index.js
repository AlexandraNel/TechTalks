const logoutButton = document.getElementById("logoutButton");
//event listeners
// logoutButton.addEventListener("")
// document
// .querySelector('.login-form')
// .addEventListener('submit', loginFormHandler);

// document
// .querySelector('.signup-form')
// .addEventListener('submit', signupFormHandler);

// -----------------------------------------------------------------
//Nav Login Button Function and Event Listening
document.addEventListener('DOMContentLoaded', function () {
  const loginButton = document.getElementById("loginButton");
  if (loginButton) {
    loginButton.addEventListener("click", () => {
      document.location.replace('/login');
     });
    } else {
        console.error ("Error with the login redirection");      
  }
});


// -----------------------------------------------------------------
//Login Function followed by event listener
const logIn = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#userEmail').value.trim();
  const password = document.querySelector('#loginPassword').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in. Have you signed up?');
    }
  }
};

document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
      loginForm.addEventListener("submit", logIn);
  } else {
      console.log("Login form not found.");
  }
});



// -----------------------------------------------------------------
//Signup Function followed by event listener
const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to sign up.');
    }
  }
};

const signupFormSubmit = document.getElementById("signupFormSubmit");
signupFormSubmit.addEventListener("submit", signupFormHandler);


