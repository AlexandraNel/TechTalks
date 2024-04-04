//get elements from html
const loginBtn = document.getElementById("loginButton");
const logoutBtn = document.getElementById("logoutButton");


//event listeners

loginBtn.addEventListener("click", logOut());
logoutBtn.addEventListener("submit", logIn());

// document
// .querySelector('.login-form')
// .addEventListener('submit', loginFormHandler);

// document
// .querySelector('.signup-form')
// .addEventListener('submit', signupFormHandler);

//Login Function
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
  

  