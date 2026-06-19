const API_URL = "https://socialgram-backend-m2ef.onrender.com/"

async function register() {

    const username =
        document.getElementById("username").value;

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    const response = await fetch(
        `${API_URL}/auth/register`,
        {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json",
            },
            body: JSON.stringify({
                username,
                email,
                password,
            }),
        }
    );

    const data = await response.json();

    alert(data.message);

    window.location.href = "login.html";
}
async function login() {

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value.trim();

    // Validation
    if (!email || !password) {
        alert("Please enter both Email and Password");
        return;
    }

    try {

        const response = await fetch(
            `${API_URL}/auth/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Invalid credentials");
            return;
        }

        localStorage.setItem(
            "token",
            data.token
        );

        alert("Login Successful");

        window.location.href = "index.html";

    } catch (error) {

        alert("Server connection failed. Please try again.");

        console.error(error);
    }
}

    
