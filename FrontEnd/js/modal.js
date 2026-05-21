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

        async function createModalGalley() {
            const works = await getWorks()
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

                modalGalery.append(modalGalleryItem)
                modalGalleryItem.append(trashcanBtn)
                modalGalleryItem.append(modalGalleryImage)
                trashcanBtn.append(trashcanBtnIcon)

                trashcanBtn.addEventListener("click", () => {
                    modalGalleryItem.remove()
                    deleteWork(work.id)
                })
            });

        }
        createModalGalley()



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
                    addPhotoCategoryOption.textContent = category.id
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
                addWork(formdata)
                modalBackground.remove()
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
        headers: {"Authorization": `Bearer ${token}`},
        body: formdata
    })
    return res.ok

}

