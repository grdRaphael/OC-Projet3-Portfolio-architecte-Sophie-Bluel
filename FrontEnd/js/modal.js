import { getWorks } from "./api.js"

const editingButton = document.querySelector(".editing-button")

editingButton.addEventListener("click", () => {
    const body = document.querySelector("body")

    const modalBackground = document.createElement("div")
    modalBackground.classList.add("modal-background")
    modalBackground.style.display = "block"

    const modal = document.createElement("section")
    modal.id = "modal"

    const modalTitle = document.createElement("h3")
    modalTitle.textContent = "Gallerie Photo"

    const modalGalery = document.createElement("div")
    modalGalery.classList.add("modal-gallery")

    const xmarkBtn = document.createElement("button")
    xmarkBtn.classList.add("xmark-btn")

    const xmarkBtnIcon = document.createElement("img")
    xmarkBtnIcon.alt = "closing-cross-mark"
    xmarkBtnIcon.src = "./assets/icons/xmark-solid-full.svg"

    xmarkBtn.addEventListener("click", () => {
        modalBackground.style.display = "none"
    })

    body.prepend(modalBackground)
    modalBackground.prepend(modal)
    modal.append(modalTitle)
    modal.append(modalGalery)
    modalGalery.append(xmarkBtn)
    xmarkBtn.append(xmarkBtnIcon)

    async function createModalGalley() {
        const works = await getWorks()
        console.log(works)
        works.forEach(work => {
            const modalGalleryItem = document.createElement("div")
            modalGalleryItem.classList.add("modal-gallery_item")

            const modalGalleryImage = document.createElement("img")
            modalGalleryImage.classList.add("modal-gallery_image")
            modalGalleryImage.src= work.imageUrl

            const trashcanBtn = document.createElement("button")
            trashcanBtn.classList.add("trashcan-btn")

            const trashcanBtnIcon = document.createElement("img")
            trashcanBtnIcon.src= "./assets/icons/trash-can-solid-full.svg"


            modalGalery.append(modalGalleryItem)
            modalGalleryItem.append(trashcanBtn)
            modalGalleryItem.append(modalGalleryImage)
            trashcanBtn.append(trashcanBtnIcon)
        });
    }
    createModalGalley()

    const addPhotoBtn = document.createElement("button")
    addPhotoBtn.classList.add("add-photo-btn")
    addPhotoBtn.textContent="Ajouter une photo"
    modal.append(addPhotoBtn)
})

