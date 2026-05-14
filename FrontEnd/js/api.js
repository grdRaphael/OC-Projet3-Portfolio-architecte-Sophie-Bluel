const API_BASE = "http://localhost:5678/api"

export async function getCategories() {
    const res = await fetch(`${API_BASE}/categories`);
    const data = await res.json();
    return data
}

export async function getWorks(){
    const res = await fetch(`${API_BASE}/works`);
    const data = await res.json();
    return data
}

