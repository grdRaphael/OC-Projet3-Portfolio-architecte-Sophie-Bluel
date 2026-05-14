import { getCategories } from "./api.js";
import { getWorks } from "./api.js";

async function init() {
    const works = await getWorks()
    console.log(works)

    createGallery(works)
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
