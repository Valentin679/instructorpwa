const instance = {
    url: 'https://instructorexpress.vercel.app/',
    local: 'http://localhost:8800/'
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

export async function getStudentById(id) {
    const response = await fetch(`${instance.url}api/students/category/b/`+id, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        return await response.json()
    }
}

export const addStudent = async (data) => {
    const response = await fetch(`${instance.url}api/students/category/b`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=utf-8'
        }
    })
    if (response.ok === true) {
        return await response.json()
    }
}

export const deleteStudent = async (id) => {
    await fetch(`${instance.url}api/students/category/b/` + id, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json; charset=utf-8'
        }
    })
}

export const editStudentGrades = async (id, slug, level, name, gradeIndex) => {
    await fetch(`${instance.url}api/students/category/b/edit`, {
        method: 'PUT',
        //
        body: JSON.stringify({
            id, slug, level, name, gradeIndex
        }),
        headers: {
            'Content-type': 'application/json; charset=utf-8'
        }
    })
}

export const changeCountLesson = async (id, value) => {
    await fetch(`${instance.url}api/students/count-lessons`, {
        method: 'PUT',
        //
        body: JSON.stringify({
            id, value
        }),
        headers: {
            'Content-type': 'application/json; charset=utf-8'
        }
    })
}


export const putStudent = async (changedMaterialsId, title, category, price) => {
    await fetch('http://localhost:8800/api/students/category/b', {
        method: 'PUT',
        //
        body: JSON.stringify({
            oldTitle: changedMaterialsId,
            title: title,
            category: category.value,
            categoryTitle: category.label,
            price: price
        }),
        headers: {
            'Content-type': 'application/json; charset=utf-8'
        }
    })
}

