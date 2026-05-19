const token = sessionStorage.getItem("token")
if (token) {
    const logout = document.querySelector(".login-link")
    logout.textContent = "logout"
    activateEditingMode()
}

/*Déconnexion de l'utilisateur */
const logout = document.querySelector(".login-link")
logout.addEventListener("click", () => {
    sessionStorage.removeItem("token")
    logout.textContent = "login"
})


function activateEditingMode() {
    /*Afficher la banière Mode édition et son icon*/
    const body = document.querySelector("body")
    const editingModeBanner = document.createElement("div")
    editingModeBanner.classList.add("editing-mode-hero")

    const editingModeLabel = document.createElement("p")
    editingModeLabel.textContent = "Mode édition"

    const editingModeIcon = document.createElement("img")
    editingModeIcon.classList.add("edit-mode-icon")
    editingModeIcon.src = "./assets/icons/pen-to-square-regular-full (1).svg"

    body.prepend(editingModeBanner)
    editingModeBanner.append(editingModeLabel)
    editingModeBanner.prepend(editingModeIcon)

    /*Afficher le bouton Modifer et son icon*/
    const portfolio = document.getElementById("portfolio")
    const portfolioTitle = document.querySelector(".portfolio-title")

    const portfolioHeader = document.createElement("div")
    portfolioHeader.classList.add("portfolio-header")

    const editingButton = document.createElement("button")

    const editingButtonIcon = document.createElement("img")
    editingModeIcon.src = "./assets/icons/pen-to-square-regular-full black.svg"
    editingButton.textContent = "modifier"
    editingButton.prepend(editingModeIcon)
    editingButton.classList.add("editing-button")

    portfolio.prepend(portfolioHeader)
    portfolioHeader.append(portfolioTitle)
    portfolioHeader.append(editingButton)
}
