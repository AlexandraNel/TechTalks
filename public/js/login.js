// //Nav Login Button Function and Event Listening
// document.addEventListener('DOMContentLoaded', function () {
//   const loginButton = document.getElementById("loginButton");
//   if (loginButton) {
//     loginButton.addEventListener("click", () => {
//       document.location.replace('/login');
//      });
//     } else {
//         console.error ("Error with the login redirection");      
//   }
// });

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

    // had to delay reload for dashboard partial
    if (response.ok) {
      setTimeout(() => {
        document.location.replace('/');
      }, 500)
    
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



