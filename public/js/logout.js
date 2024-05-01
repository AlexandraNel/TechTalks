
// -----------------------------------------------------------------
//Logout Function followed by event listener
const logOut = async (event) => {
  event.preventDefault();

     const response = await fetch('/api/users/logout', {
      method: 'POST', //no body required on logout/destroy session
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      console.error('Failed to log out');
    }
  };

document.addEventListener('DOMContentLoaded', function () {
  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", logOut);
  } else {
      console.log("Error Logging Out");
  }
});
