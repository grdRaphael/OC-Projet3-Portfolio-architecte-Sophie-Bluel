import { API, getWorks, getCategories } from "./api.js"

const editingButton = document.querySelector(".editing-button")

if (editingButton) {
    editingButton.addEventListener("click", () => {
        const body = document.querySelector("body")

        const modalBackground = document.createElement("div")
        modalBackground.classList.add("modal-background")

        const modal = document.createElement("section")
        modal.classList.add("modal")

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
            modalBackground.remove()
        })

        modalBackground.addEventListener("click", (event) => {
            if (event.target === document.querySelector(".modal-background")) {
                modalBackground.remove()
            }
        })


        body.prepend(modalBackground)
        modalBackground.prepend(modal)
        modal.append(modalTitle)
        modal.append(modalGalery)
        modalGalery.append(xmarkBtn)
        xmarkBtn.append(xmarkBtnIcon)


        function createModalGallery(works) {
            works.forEach(work => {
                const modalGalleryItem = document.createElement("div")
                modalGalleryItem.classList.add("modal-gallery_item")

                const modalGalleryImage = document.createElement("img")
                modalGalleryImage.classList.add("modal-gallery_image")
                modalGalleryImage.src = work.imageUrl


                const trashcanBtn = document.createElement("button")
                trashcanBtn.classList.add("trashcan-btn")

                const trashcanBtnIcon = document.createElement("img")
                trashcanBtnIcon.src = "./assets/icons/trash-can-solid-full.svg"

                trashcanBtn.addEventListener("click", () => {
                    deleteWork(work.id)
                    console.log(work.id)
                    modalGalleryItem.remove()
                    document.querySelector(`[data-id="${work.id}"]`).remove()
                })

                modalGalery.append(modalGalleryItem)
                modalGalleryItem.append(modalGalleryImage)
                modalGalleryItem.append(trashcanBtn)
                trashcanBtn.append(trashcanBtnIcon)
            });
        }

        async function loadGalleryModal() {
            const works = await getWorks()
            console.log(works)
            createModalGallery(works)
        }
        loadGalleryModal()



        const addPhotoBtn = document.createElement("button")
        addPhotoBtn.classList.add("modal-btn")
        addPhotoBtn.textContent = "Ajouter une photo"
        modal.append(addPhotoBtn)

        /*Intégration de la modale "Ajout photo" */
        addPhotoBtn.addEventListener("click", (event) => {
            event.preventDefault()
            modal.remove()

            const addPhotoModal = document.createElement("section")
            addPhotoModal.classList.add("add-photo-modal")

            const returnBtn = document.createElement("button")
            returnBtn.classList.add("return-btn")
            const returnBtnIcon = document.createElement("img")
            returnBtnIcon.src = "./assets/icons/arrow-left-solid-full.svg"

            returnBtn.addEventListener("click", () => {
                addPhotoModal.remove()
                modalBackground.append(modal)
            })


            /*Intégration du bouton "fermer la addPhoto modal" */
            const closeAddPhotoBtn = document.createElement("button")
            closeAddPhotoBtn.classList.add("close-addphoto_btn")
            const closeAddPhotoBtnIcon = document.createElement("img")
            closeAddPhotoBtnIcon.src = "./assets/icons/xmark-solid-full.svg"
            closeAddPhotoBtnIcon.alt = "xmark icon"

            closeAddPhotoBtn.addEventListener("click", () => {
                modalBackground.remove()
            })

            const addPhotoTitle = document.createElement("h3")
            addPhotoTitle.textContent = "Ajout photo"

            const addPhotoForm = document.createElement("form")
            addPhotoForm.classList.add("add-photo_form")
            const addPhotoUplaodBox = document.createElement("div")
            addPhotoUplaodBox.classList.add("add-photo-upload_box")

            const addPhotoUplaodIcon = document.createElement("img")
            addPhotoUplaodIcon.src = "./assets/icons/image-regular-full.svg"
            addPhotoUplaodIcon.alt = "icon image"


            /* Intégration du input type="file" et son label */
            const addPhotoUplaodBtnLabel = document.createElement("label")
            addPhotoUplaodBtnLabel.htmlFor = "upload"
            addPhotoUplaodBtnLabel.classList.add("upload-btn")
            addPhotoUplaodBtnLabel.textContent = "+ Ajouter photo"
            const addPhotoUplaodBtn = document.createElement("input")
            addPhotoUplaodBtn.type = "file"
            addPhotoUplaodBtn.id = "upload"


            /* Upload de l'image */
            addPhotoUplaodBtn.addEventListener("change", () => {
                const file = addPhotoUplaodBtn.files[0]
                const imageUrl = URL.createObjectURL(file)

                addPhotoUplaodBtnLabel.innerHTML = ""
                addPhotoUplaodBtnLabel.style.background = "none"
                addPhotoUplaodBtnLabel.style.height = "100%"
                addPhotoUplaodBtnLabel.style.padding = "0"
                addPhotoUplaodBox.style.padding = "0"
                addPhotoUplaodIcon.remove()
                addPhotoUplaodInfo.remove()

                const preview = document.createElement("img")
                preview.src = imageUrl
                preview.style.height = "100%"
                addPhotoUplaodBtnLabel.append(preview)

                /*Si le message d'erreur existe, il est supprimé dès qu'une image est uplaoder */
                if (imageUrl) {
                    document.querySelector(".upload-error")?.remove()
                }
            })


            const addPhotoUplaodInfo = document.createElement("p")
            addPhotoUplaodInfo.textContent = "jpg, png : 4mo max"

            const addPhotoTitleBox = document.createElement("div")
            addPhotoTitleBox.classList.add("input-box")

            const addPhotoLabel = document.createElement("label")
            addPhotoLabel.textContent = "Titre"
            const addPhotoInput = document.createElement("input")
            addPhotoInput.classList.add("title-input")
            addPhotoTitleBox.append(addPhotoLabel)
            addPhotoTitleBox.append(addPhotoInput)

            const addPhotoSelectBox = document.createElement("div")
            addPhotoSelectBox.classList.add("input-box")
            addPhotoSelectBox.classList.add("line-box")
            const addPhotoCategoryLabel = document.createElement("label")
            addPhotoCategoryLabel.textContent = "Catégorie"

            const addPhotoCategorySelect = document.createElement("select")

            addPhotoSelectBox.append(addPhotoCategoryLabel)
            addPhotoSelectBox.append(addPhotoCategorySelect)

            async function createCategorySelect() {
                const categories = await getCategories()
                categories.forEach(category => {
                    const addPhotoCategoryOption = document.createElement("option")
                    addPhotoCategoryOption.textContent = category.name
                    addPhotoCategorySelect.append(addPhotoCategoryOption)
                })
            }
            createCategorySelect()



            const addPhotoSubmitButton = document.createElement("button")
            addPhotoSubmitButton.classList.add("modal-btn")
            addPhotoSubmitButton.classList.add("photo-submit-btn")
            addPhotoSubmitButton.textContent = "Valider"


            addPhotoSubmitButton.addEventListener("click", (event) => {
                event.preventDefault()
                const formdata = new FormData()
                const title = document.querySelector(".title-input").value
                const categoryId = parseInt(document.querySelector(".line-box select").value)
                const imageUrl = addPhotoUplaodBtn.files[0]
                formdata.append("title", title)
                formdata.append("image", imageUrl)
                formdata.append("category", categoryId)
                /*modalBackground.remove() créé un condition pour fermer la modale => uniquement si tout est valide dans le form !  */

                /*Ajout du message d'erreur si le formulaire n'est pas rempli*/
                let errorMessage = document.querySelector(".error-message")
                let uploadError = document.querySelector(".upload-error")

                async function addNewWork() {
                    const newWork = await addWork(formdata)

                    const gallery = document.querySelector(".gallery");

                    const figure = document.createElement("figure")
                    figure.dataset.id = newWork.id

                    const image = document.createElement("img")
                    image.src = newWork.imageUrl

                    const figcaption = document.createElement("figcaption")
                    figcaption.textContent = newWork.title

                    gallery.append(figure)
                    figure.append(image)
                    figure.append(figcaption)

                    createModalGallery([newWork])
                    errorMessage?.remove()
                    addPhotoModal.remove()
                    modalBackground.append(modal)
                }

                if (title === "") {
                    if (!errorMessage) {
                        errorMessage = document.createElement("p")
                        errorMessage.classList.add("error-message")
                        addPhotoForm.append(errorMessage)
                    }
                    errorMessage.textContent = "Veuillez renseigner un titre"
                } 
                if (imageUrl === undefined) {
                    if (!uploadError) {
                        uploadError = document.createElement("p")
                        uploadError.classList.add("upload-error")
                        addPhotoForm.append(uploadError)
                    }
                    uploadError.textContent = "Aucune photo sélectionnée"
                }
                if (title === "" || imageUrl == undefined) {
                    return
                }
                addNewWork()





            })




            modalBackground.append(addPhotoModal)
            addPhotoModal.append(returnBtn)
            returnBtn.append(returnBtnIcon)
            addPhotoModal.append(closeAddPhotoBtn)
            closeAddPhotoBtn.append(closeAddPhotoBtnIcon)
            addPhotoModal.append(addPhotoTitle)
            addPhotoModal.append(addPhotoForm)
            addPhotoForm.append(addPhotoUplaodBox)
            addPhotoUplaodBox.append(addPhotoUplaodIcon)
            addPhotoUplaodBox.append(addPhotoUplaodBtnLabel)
            addPhotoUplaodBox.append(addPhotoUplaodBtn)
            addPhotoUplaodBox.append(addPhotoUplaodInfo)
            addPhotoForm.append(addPhotoTitleBox)
            addPhotoForm.append(addPhotoSelectBox)
            addPhotoForm.append(addPhotoSubmitButton)
        })

    })
}



async function deleteWork(id) {
    const token = sessionStorage.getItem("token")
    const res = await fetch(`${API}/works/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
    })
    return res.ok
}

async function addWork(formdata) {
    const token = sessionStorage.getItem("token")
    const res = await fetch(`${API}/works`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formdata
    })
    return res.json()

}

