import { getCategories } from "./api.js";
import { getWorks } from "./api.js";

async function init() {
    const works = await getWorks()
    const categories = await getCategories()
    createGallery(works)
    /* Les filtres ne s'affiche pas si l'utilisateur est connecté*/
    if (!sessionStorage.getItem("token")) {
        createFilters(categories, works)
    }
}

init()

export function createGallery(works) {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = ""
    works.forEach(work => {
        const figure = document.createElement("figure")
        figure.dataset.id = work.id
        const img = document.createElement("img")
        img.src = work.imageUrl

        const figcaption = document.createElement("figcaption")
        figcaption.textContent = work.title

        gallery.append(figure)
        figure.append(img)
        figure.append(figcaption)

    });
}


function createFilters(categories, works) {
    const gallery = document.querySelector(".gallery");

    const filters = document.createElement("div")
    filters.classList.add("filters-container")

    gallery.before(filters)

    const buttonAll = document.createElement("button")
    buttonAll.classList.add("filter-btn")
    filters.append(buttonAll)
    buttonAll.textContent = "Tous"
    buttonAll.addEventListener("click", (event) => {
        createGallery(works)
        setActiveButton(event)
    });

    categories.forEach(category => {
        const button = document.createElement("button")
        button.classList.add("filter-btn")
        button.textContent = category.name
        filters.append(button)

        /* Filtre par catégorie */
        button.addEventListener("click", (event) => {
            const filtered = works.filter(work => work.categoryId === category.id)
            createGallery(filtered)
            setActiveButton(event)
        });
    })
}

function setActiveButton(event) {
    const buttons = document.querySelectorAll(".filter-btn")
    buttons.forEach(btn => {
        btn.classList.remove("active")
    })
    event.target.classList.add("active")
}

