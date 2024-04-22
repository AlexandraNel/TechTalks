
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
//LoginPage SignUp Button Function and Event Listening
document.addEventListener('DOMContentLoaded', function () {
  const signUpPage = document.getElementById("signUpPage");
  if (signUpPage) {
    signUpPage.addEventListener("click", () => {
      document.location.replace('/signup');
     });
    } else {
        console.error ("Error with the signup redirection");      
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



