import { API } from "./api.js";

async function sendLog(email, password) {
    const res = await fetch(`${API}/users/login`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password })
    })
    const data = await res.json()
    return data
}

function submitdata() {
    const form = document.querySelector(".login-form")
    const loginErrorMessage = document.createElement("p")
    const submitButton = document.getElementById("connect")
    submitButton.after(loginErrorMessage)
    if (!form) return
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const email = document.getElementById("mail").value
        const password = document.getElementById("password").value
        const data = await sendLog(email, password)
        if (data.token) {
            sessionStorage.setItem("token", data.token)
            location.href = "index.html"
        } else {
            loginErrorMessage.textContent = "Erreur dans l’identifiant ou le mot de passe"
            loginErrorMessage.classList.add("login-error-message")
        }
    })
}

submitdata()








