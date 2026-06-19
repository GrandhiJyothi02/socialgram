const API_URL = "http://localhost:5000/api";

async function loadProfile() {

    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    const response = await fetch(
        `${API_URL}/users/profile`,
        {
            headers: {
                Authorization: token
            }
        }
    );

    const user = await response.json();

    document.getElementById("username").textContent =
        user.username;

    document.getElementById("email").textContent =
        user.email;
}

function logout(){
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

loadProfile();