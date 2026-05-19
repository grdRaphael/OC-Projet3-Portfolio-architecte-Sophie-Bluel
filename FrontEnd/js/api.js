export const API = "http://localhost:5678/api"

export async function getCategories() {
    const res = await fetch(`${API}/categories`);
    const data = await res.json();
    return data
}

export async function getWorks(){
    const res = await fetch(`${API}/works`);
    const data = await res.json();
    return data
}

