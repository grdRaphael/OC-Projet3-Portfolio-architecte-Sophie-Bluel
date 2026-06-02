import { API, getWorks, getCategories } from "./api.js"

const editingButton = document.querySelector(".editing-button")

if (editingButton) {
    editingButton.addEventListener("click", () => {
        const body = document.querySelector("body")

        const modalBackground = document.createElement("div")
        modalBackground.classList.add("modal-background")

        const galleryModal = document.createElement("section")
        galleryModal.classList.add("modal")

        const galleryModalTitle = document.createElement("h3")
        galleryModalTitle.textContent = "Gallerie Photo"

        const galleryModalGrid = document.createElement("div")
        galleryModalGrid.classList.add("modal-gallery")

        const closeGalleryModalBtn = document.createElement("button")
        closeGalleryModalBtn.classList.add("xmark-btn")

        const xmarkIcon = document.createElement("img")
        xmarkIcon.alt = "closing-cross-mark"
        xmarkIcon.src = "./assets/icons/xmark-solid-full.svg"

        closeGalleryModalBtn.addEventListener("click", () => {
            modalBackground.remove()
        })

        modalBackground.addEventListener("click", (event) => {
            if (event.target === document.querySelector(".modal-background")) {
                modalBackground.remove()
            }
        })


        body.prepend(modalBackground)
        modalBackground.prepend(galleryModal)
        galleryModal.append(galleryModalTitle)
        galleryModal.append(galleryModalGrid)
        galleryModalGrid.append(closeGalleryModalBtn)
        closeGalleryModalBtn.append(xmarkIcon)


        function createModalGalleryItems(works) {
            works.forEach(work => {
                const modalGalleryItem = document.createElement("div")
                modalGalleryItem.classList.add("modal-gallery_item")

                const modalGalleryImage = document.createElement("img")
                modalGalleryImage.classList.add("modal-gallery_image")
                modalGalleryImage.src = work.imageUrl


                const deleteWorkBtn = document.createElement("button")
                deleteWorkBtn.classList.add("trashcan-btn")

                const trashcanIcon = document.createElement("img")
                trashcanIcon.src = "./assets/icons/trash-can-solid-full.svg"

                deleteWorkBtn.addEventListener("click", () => {
                    deleteWork(work.id)
                    modalGalleryItem.remove()
                    document.querySelector(`[data-id="${work.id}"]`).remove()
                })

                galleryModalGrid.append(modalGalleryItem)
                modalGalleryItem.append(modalGalleryImage)
                modalGalleryItem.append(deleteWorkBtn)
                deleteWorkBtn.append(trashcanIcon)
            });
        }

        async function loadGalleryModal() {
            const works = await getWorks()
            createModalGalleryItems(works)
        }
        loadGalleryModal()



        const addPhotoBtn = document.createElement("button")
        addPhotoBtn.classList.add("modal-btn")
        addPhotoBtn.textContent = "Ajouter une photo"
        galleryModal.append(addPhotoBtn)

        /*Intégration de la modale "Ajout photo" */
        addPhotoBtn.addEventListener("click", (event) => {
            event.preventDefault()
            galleryModal.remove()

            const photoUploadModal = document.createElement("section")
            photoUploadModal.classList.add("add-photo-modal")

            const returnBtn = document.createElement("button")
            returnBtn.classList.add("return-btn")
            const returnBtnIcon = document.createElement("img")
            returnBtnIcon.src = "./assets/icons/arrow-left-solid-full.svg"

            returnBtn.addEventListener("click", () => {
                photoUploadModal.remove()
                modalBackground.append(galleryModal)
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
            const addPhotoUploadBox = document.createElement("div")
            addPhotoUploadBox.classList.add("add-photo-upload_box")

            const addPhotoUploadIcon = document.createElement("img")
            addPhotoUploadIcon.src = "./assets/icons/image-regular-full.svg"
            addPhotoUploadIcon.alt = "icon image"


            /* Intégration du input type="file" et son label */
            const addPhotoUploadBtnLabel = document.createElement("label")
            addPhotoUploadBtnLabel.htmlFor = "upload"
            addPhotoUploadBtnLabel.classList.add("upload-btn")
            addPhotoUploadBtnLabel.textContent = "+ Ajouter photo"
            const addPhotoUplaodBtn = document.createElement("input")
            addPhotoUplaodBtn.type = "file"
            addPhotoUplaodBtn.id = "upload"


            /* Upload de l'image */
            addPhotoUplaodBtn.addEventListener("change", () => {
                const file = addPhotoUplaodBtn.files[0]
                const imageUrl = URL.createObjectURL(file)

                addPhotoUploadBtnLabel.innerHTML = ""
                addPhotoUploadBtnLabel.style.background = "none"
                addPhotoUploadBtnLabel.style.height = "100%"
                addPhotoUploadBtnLabel.style.padding = "0"
                addPhotoUploadBox.style.padding = "0"
                addPhotoUploadIcon.remove()
                addPhotoUplaodInfo.remove()

                const preview = document.createElement("img")
                preview.src = imageUrl
                preview.style.height = "100%"
                addPhotoUploadBtnLabel.append(preview)

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
                    addPhotoCategoryOption.value = category.id
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
                const categoryId = document.querySelector(".line-box select").value
                const imageUrl = addPhotoUplaodBtn.files[0]
                formdata.append("title", title)
                formdata.append("image", imageUrl)
                formdata.append("category", categoryId)
                

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

                    createModalGalleryItems([newWork])
                    errorMessage?.remove()
                    photoUploadModal.remove()
                    modalBackground.append(galleryModal)
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




            modalBackground.append(photoUploadModal)
            photoUploadModal.append(returnBtn)
            returnBtn.append(returnBtnIcon)
            photoUploadModal.append(closeAddPhotoBtn)
            closeAddPhotoBtn.append(closeAddPhotoBtnIcon)
            photoUploadModal.append(addPhotoTitle)
            photoUploadModal.append(addPhotoForm)
            addPhotoForm.append(addPhotoUploadBox)
            addPhotoUploadBox.append(addPhotoUploadIcon)
            addPhotoUploadBox.append(addPhotoUploadBtnLabel)
            addPhotoUploadBox.append(addPhotoUplaodBtn)
            addPhotoUploadBox.append(addPhotoUplaodInfo)
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

