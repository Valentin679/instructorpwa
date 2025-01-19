export const findIndexById = (students, key) => {
    // console.log(students)
    // console.log(key)
    let studentIndex
    students.find((student, index) => { // поиск студента в контексте (по значению селекта)
        if (student._id === key) {
            studentIndex = index
        }
    })
    return studentIndex
}