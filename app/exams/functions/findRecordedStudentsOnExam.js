export const findRecorded = (students, date, setState) => {
    const recorded = students.map(student => {
        let confirm = student.exams[1].dates.find(e => e === date)
        // console.log(confirm)
        if (confirm) {
            return student
        } else {
            return null
        }
    })
    setState(recorded.filter(element => element != null))
    // return recorded.filter(element => element != null)
    // console.log(formattedArray)
}