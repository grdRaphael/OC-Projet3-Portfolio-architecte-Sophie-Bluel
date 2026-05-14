import { getCategories } from "./api.js";
import { getWorks } from "./api.js";

async function init() {
    const works = await getWorks()
    console.log(works)

    const categories = await getCategories()
    console.log(categories)

    createGallery(works)
    createFilters(categories, works)
}

init()

function createGallery(works) {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = ""
    works.forEach(work => {
        const figure = document.createElement("figure")
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
    filters.append(buttonAll)
    buttonAll.textContent = "Tous"
    buttonAll.addEventListener("click", () => {
        createGallery(works)
    });

    categories.forEach(category => {
        const button = document.createElement("button")
        filters.append(button)
        button.classList.add("filter-btn")
        button.textContent = category.name

        button.addEventListener("click", () => {
            const filtered = works.filter(work => work.categoryId === category.id)
            createGallery(filtered)
        });
    })
}

