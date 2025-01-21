const instance = {
    url: 'https://instructorexpress.vercel.app/',
    local: 'http://localhost:8800/'
}
export async function getAllStudents() {
    const response = await fetch(`${instance.url}api/students/category/b`, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        return await response.json()
    }
}

export async function getActiveStudents() {
    const response = await fetch(`${instance.url}api/students/category/b/active`, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        return await response.json()
    }
}

export async function getInactiveStudents() {
    const response = await fetch(`${instance.url}api/students/category/b/inactive`, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        return await response.json()
    }
}

