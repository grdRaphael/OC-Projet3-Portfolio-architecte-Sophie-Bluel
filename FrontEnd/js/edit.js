const token = sessionStorage.getItem("token")
if (token) {
    const logout = document.querySelector(".login-link")
    logout.textContent = "logout"
    activateEditingMode()
}

/*Déconnexion de l'utilisateur */
const logout = document.querySelector(".login-link")
logout.addEventListener("click", (event) => {
    if (sessionStorage.getItem("token")) {
        event.preventDefault()
        sessionStorage.removeItem("token")
        logout.textContent = "login"
        location.reload()
    }
})

function activateEditingMode() {
    /*Afficher la banière Mode édition et son icon*/
    const body = document.querySelector("body")
    body.style.paddingTop = "59px"
    const editingModeBanner = document.createElement("div")
    editingModeBanner.classList.add("editing-mode-hero")

    const editingModeLabel = document.createElement("p")
    editingModeLabel.textContent = "Mode édition"

    const editingModeBannerIcon = document.createElement("img")
    editingModeBannerIcon.classList.add("edit-mode-icon")
    editingModeBannerIcon.src = "./assets/icons/pen-to-square-regular-full (1).svg"

    body.prepend(editingModeBanner)
    editingModeBanner.append(editingModeLabel)
    editingModeBanner.prepend(editingModeBannerIcon)

    /*Afficher le bouton Modifer et son icon*/
    const portfolio = document.getElementById("portfolio")
    const portfolioTitle = document.querySelector(".portfolio-title")

    const portfolioHeader = document.createElement("div")
    portfolioHeader.classList.add("portfolio-header")

    const editingButton = document.createElement("button")
    editingButton.classList.add("editing-button")

    const editingButtonIcon = document.createElement("img")
    editingButtonIcon.src = "./assets/icons/pen-to-square-regular-full black.svg"
    editingButton.textContent = "modifier"


    portfolio.prepend(portfolioHeader)
    portfolioHeader.append(portfolioTitle)
    portfolioHeader.append(editingButton)
    editingButton.prepend(editingButtonIcon)
}




