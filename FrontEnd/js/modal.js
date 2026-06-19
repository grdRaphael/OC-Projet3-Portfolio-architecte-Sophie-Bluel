import { API, getWorks, getCategories } from "./api.js"

const editingButton = document.querySelector(".editing-button")

if (editingButton) {
    editingButton.addEventListener("click", () => {
        const body = document.querySelector("body")

        const modalBackground = document.createElement("div")
        modalBackground.classList.add("modal-background")

        const galleryModal = document.createElement("section")
        galleryModal.classList.add("gallery-modal")

        const galleryModalTitle = document.createElement("h3")
        galleryModalTitle.textContent = "Gallerie Photo"

        const galleryModalGrid = document.createElement("div")
        galleryModalGrid.classList.add("gallery-modal_grid")

        const closeGalleryModalBtn = document.createElement("button")
        closeGalleryModalBtn.classList.add("xmark-btn")

        const closeGalleryModalIcon = document.createElement("img")
        closeGalleryModalIcon.alt = "closing-cross-mark"
        closeGalleryModalIcon.src = "./assets/icons/xmark-solid-full.svg"

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
        galleryModal.append(closeGalleryModalBtn)
        closeGalleryModalBtn.append(closeGalleryModalIcon)


        function createModalGalleryItems(works) {

            works.forEach(work => {
                const galleryModalItem = document.createElement("div")
                galleryModalItem.classList.add("modal-gallery_item")

                const galleryModalPhoto = document.createElement("img")
                galleryModalPhoto.classList.add("modal-gallery_photo")
                galleryModalPhoto.src = work.imageUrl

                const deleteWorkBtn = document.createElement("button")
                deleteWorkBtn.classList.add("delete-work_btn")

                const trashcanIcon = document.createElement("img")
                trashcanIcon.src = "./assets/icons/trash-can-solid-full.svg"

                const GalleryItem = document.querySelector(`[data-id="${work.id}"]`)

                galleryModalGrid.append(galleryModalItem)
                galleryModalItem.append(galleryModalPhoto)
                galleryModalItem.append(deleteWorkBtn)
                deleteWorkBtn.append(trashcanIcon)

                deleteWorkBtn.addEventListener("click", () => {
                    /* Intégration d'un toast avec notification undo */
                    const toast = document.createElement("div")
                    toast.classList.add("toast")
                    toast.textContent = "Projet supprimé..."
                    const cancelBtn = document.createElement("button")
                    cancelBtn.classList.add("cancel-btn")
                    cancelBtn.textContent = "Annuler"
                    toast.append(cancelBtn)
                    body.append(toast)

                    galleryModalItem.classList.add("hidden")
                    GalleryItem.classList.add("hidden")
                    const timer = setTimeout(() => {
                        toast.remove()
                        GalleryItem.remove()
                        galleryModalItem.remove()
                        deleteWork(work.id)
                    }, 5000);
                    cancelBtn.addEventListener("click", () => {
                        clearTimeout(timer)
                        toast.remove()
                        GalleryItem.classList.remove("hidden")
                        galleryModalItem.classList.remove("hidden")
                    })
                })
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

        /******************* Intégration de la modale "Ajout photo" *******************/
        addPhotoBtn.addEventListener("click", (event) => {
            event.preventDefault()

            const uploadModal = document.createElement("section")
            uploadModal.classList.add("upload-modal")
            uploadModal.style.animation = "smoothAppear .3s ease"

            if (window.innerWidth <= 767.98) {
                galleryModal.style.animation = "slideOut .3s ease"
                galleryModal.addEventListener("animationend", () => {
                    galleryModal.remove()
                    modalBackground.append(uploadModal)
                }, { once: true })
                uploadModal.style.animation = "slideIn .3s ease"
            } else {
                galleryModal.remove()
                modalBackground.append(uploadModal)
            }

            const returnBtn = document.createElement("button")
            returnBtn.classList.add("return-btn")
            const returnBtnIcon = document.createElement("img")
            returnBtnIcon.src = "./assets/icons/arrow-left-solid-full.svg"

            returnBtn.addEventListener("click", () => {
                uploadModal.style.animation = "slideOut .3s ease"
                if (window.innerWidth <= 767.98) {
                    galleryModal.style.animation = "slideIn .3s ease"
                    uploadModal.addEventListener("animationend", () => {
                        uploadModal.remove()
                        modalBackground.append(galleryModal)
                    }, { once: true })
                } else {
                    uploadModal.remove()
                    modalBackground.append(galleryModal)
                }
            })



            /*********** Intégration du bouton "fermer la uploadModal" ************/
            const closeUploadModalBtn = document.createElement("button")
            closeUploadModalBtn.classList.add("close-upload-modal_btn")

            const closeUploadModalIcon = document.createElement("img")
            closeUploadModalIcon.alt = "closing-cross-mark"
            closeUploadModalIcon.src = "./assets/icons/xmark-solid-full.svg"

            closeUploadModalBtn.addEventListener("click", () => {
                uploadModal.style.animation = "smoothClose .3s ease"
                modalBackground.remove()
            })


            const uploadModalTitle = document.createElement("h3")
            uploadModalTitle.textContent = "Ajout photo"

            const uploadModalForm = document.createElement("form")
            uploadModalForm.classList.add("add-photo_form")

            const addPhotoUploadIcon = document.createElement("img")
            addPhotoUploadIcon.src = "./assets/icons/image-regular-full.svg"
            addPhotoUploadIcon.alt = "icon image"
            addPhotoUploadIcon.classList.add("upload-icon")


            /* Intégration du input type="file" et son label */
            const addPhotoInputFileLabel = document.createElement("label")
            addPhotoInputFileLabel.htmlFor = "upload"
            addPhotoInputFileLabel.classList.add("upload-box")
            const addPhotoInputFile = document.createElement("input")
            addPhotoInputFile.type = "file"
            addPhotoInputFile.id = "upload"


            /* Upload de l'image */
            addPhotoInputFile.addEventListener("change", (event) => {
                const file = addPhotoInputFile.files[0]
                const imageUrl = URL.createObjectURL(file)

                addPhotoInputFileLabel.innerHTML = ""
                addPhotoInputFileLabel.classList.add("upload-preview")
                addPhotoInputFileLabel.classList.add("upload-preview_box")

                const preview = document.createElement("img")
                preview.src = imageUrl
                preview.classList.add("preview")
                addPhotoInputFileLabel.append(preview)

                /*Si le message d'erreur existe, il est supprimé dès qu'une image est uploader */
                if (imageUrl) {
                    document.querySelector(".upload-error")?.remove()
                }
            })

            const addPhotoBtn = document.createElement("div")
            addPhotoBtn.classList.add("addphoto-btn")
            addPhotoBtn.textContent = "Ajouter photo +"

            const addPhotoUploadInfo = document.createElement("p")
            addPhotoUploadInfo.textContent = "jpg, png : 4mo max"

            const formTitleBox = document.createElement("div")
            formTitleBox.classList.add("input-box")

            const formTitleLabel = document.createElement("label")
            formTitleLabel.textContent = "Titre"
            const formTitleInput = document.createElement("input")
            formTitleInput.classList.add("title-input")
            formTitleBox.append(formTitleLabel)
            formTitleBox.append(formTitleInput)

            const formCategoryBox = document.createElement("div")
            formCategoryBox.classList.add("input-box")
            formCategoryBox.classList.add("line-box")
            const formCategoryLabel = document.createElement("label")
            formCategoryLabel.textContent = "Catégorie"

            const formCategorySelect = document.createElement("select")
            const defaultOption = document.createElement("option")
            defaultOption.textContent = ""

            formCategoryBox.append(formCategoryLabel)
            formCategoryBox.append(formCategorySelect)
            formCategorySelect.prepend(defaultOption)

            async function createCategoryOption() {
                const categories = await getCategories()
                categories.forEach(category => {
                    const formCategoryOption = document.createElement("option")
                    formCategoryOption.textContent = category.name
                    formCategoryOption.value = category.id
                    formCategorySelect.append(formCategoryOption)
                })
            }
            createCategoryOption()



            const uploadSubmitButton = document.createElement("button")
            uploadSubmitButton.classList.add("modal-btn")
            uploadSubmitButton.classList.add("upload-submit_btn")
            uploadSubmitButton.textContent = "Valider"

            /*Ajout du message d'erreur si le formulaire n'est pas rempli*/
            let errorMessage = document.querySelector(".error-message")
            let uploadError = document.querySelector(".upload-error")
            let categoryError = document.querySelector(".input-box select")
            uploadSubmitButton.addEventListener("click", (event) => {
                event.preventDefault()
                const formdata = new FormData()
                const title = document.querySelector(".title-input").value
                const categoryId = document.querySelector(".line-box select").value
                const imageUrl = addPhotoInputFile.files[0]
                formdata.append("title", title)
                formdata.append("image", imageUrl)
                formdata.append("category", categoryId)

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
                    uploadModal.remove()
                    modalBackground.append(galleryModal)
                }

                if (title === "") {
                    if (!errorMessage) {
                        errorMessage = document.createElement("p")
                        errorMessage.classList.add("error-message")
                        uploadModalForm.append(errorMessage)
                    }
                    errorMessage.textContent = "Veuillez renseigner un titre"
                } else {
                    errorMessage?.remove()
                    errorMessage = null
                }
                if (imageUrl === undefined) {
                    if (!uploadError) {
                        uploadError = document.createElement("p")
                        uploadError.classList.add("upload-error")
                        uploadModalForm.append(uploadError)
                    }
                    uploadError.textContent = "Aucune photo sélectionnée"
                } else {
                    uploadError?.remove()
                }
                if (categoryId === "") {
                    if (!categoryError) {
                        categoryError = document.createElement("p")
                        categoryError.classList.add("error-message")
                        uploadModalForm.append(categoryError)
                    }
                    categoryError.textContent = "Veuillez slectionner une catégorie"
                } else {
                    categoryError?.remove()
                    categoryError = null
                }
                if (title === "" || imageUrl === undefined || categoryId === "") {
                    return
                }

                addNewWork()
            })

            formTitleInput.addEventListener("input", () => {
                if (formTitleInput.value) {
                    errorMessage?.remove()
                }
                if (formTitleInput.value && addPhotoInputFile.value && formCategorySelect.value) {
                    uploadSubmitButton.classList.add("enable")
                } else {
                    uploadSubmitButton.classList.remove("enable")
                }
            })

            addPhotoInputFile.addEventListener("change", () => {
                if (formTitleInput.value && addPhotoInputFile.value && formCategorySelect.value) {
                    uploadSubmitButton.classList.add("enable")
                } else {
                    uploadSubmitButton.classList.remove("enable")
                }
            })

            formCategorySelect.addEventListener("input", () => {
                if (formCategorySelect.value) {
                    categoryError?.remove()
                }
                if (formTitleInput.value && addPhotoInputFile.value && formCategorySelect.value) {
                    uploadSubmitButton.classList.add("enable")
                } else {
                    uploadSubmitButton.classList.remove("enable")
                }
            })


            uploadModal.append(returnBtn)
            returnBtn.append(returnBtnIcon)
            closeUploadModalBtn.append(closeUploadModalIcon)
            uploadModal.append(closeUploadModalBtn)
            uploadModal.append(uploadModalTitle)
            uploadModal.append(uploadModalForm)
            uploadModalForm.append(addPhotoInputFileLabel)
            addPhotoInputFileLabel.append(addPhotoUploadIcon)
            addPhotoInputFileLabel.append(addPhotoBtn)
            addPhotoInputFileLabel.append(addPhotoInputFile)
            addPhotoInputFileLabel.append(addPhotoUploadInfo)
            uploadModalForm.append(formTitleBox)
            uploadModalForm.append(formCategoryBox)
            uploadModalForm.append(uploadSubmitButton)
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

