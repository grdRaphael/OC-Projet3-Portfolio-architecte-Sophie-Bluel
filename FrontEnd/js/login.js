import { API_BASE } from "./api.js";

async function sendLog(email, password) {
    const res = await fetch(`${API_BASE}/users/login`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password })
    })
    const data = await res.json()
    return data
}

function submitdata() {
    const form = document.querySelector(".login-form")
    if (!form) return

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const email = document.getElementById("mail").value
        const password = document.getElementById("password").value
        const data = await sendLog(email, password)
        if (data.token) {
            location.href = "index.html"
            sessionStorage.setItem("token", data.token)
        } else {
            const submitButton = document.getElementById("connect")
            const loginErrorMessage = document.createElement("p")
            submitButton.after(loginErrorMessage)
            loginErrorMessage.textContent = "Mot de passe ou e-mail invalide"
            loginErrorMessage.classList.add("login-error-message")
        }
    })
}

export const token = sessionStorage.getItem("token")
if (token) {
    const logout = document.querySelector(".login-link")
    logout.textContent = "logout"
    activateEditingMode()
}

function logout() {
    const logout = document.querySelector(".login-link")
    logout.addEventListener("click", () => {
        sessionStorage.removeItem("token")
        logout.textContent("login")
    })
}

submitdata()
logout()

function activateEditingMode() {
    const body = document.querySelector("body")
    const editingModeHero = document.createElement("div")
    body.prepend(editingModeHero)
    editingModeHero.classList.add("editing-mode-hero")

    const editModeLabel = document.createElement("p")
    editingModeHero.append(editModeLabel)
    editModeLabel.textContent = "Mode édition"

    const editingModeIcon = document.createElement("img")
    editingModeHero.prepend(editingModeIcon)
    editingModeIcon.classList.add("edit-mode-icon")
    editingModeIcon.src = "./assets/icons/pen-to-square-regular-full (1).svg"
}






