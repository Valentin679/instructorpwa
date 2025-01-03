import dayjs from "dayjs";

export const filterExamWindow = (students, date) => {
    const nowDate = dayjs(date, 'DD/MM/YYYY')
    // console.log(students)
    const filtered = students.filter(student => {
        if(student.exams[0].result === false) {
            return null }
        else if (student.exams[1].dates.length === 0){
            return student
        }
        else if (student.exams[1].dates.length < 3){

            const lastExamDate = dayjs(student.exams[1].dates.at(-1)).format('DD/MM/YYYY')

            if (nowDate.diff(lastExamDate, 'day') > 7) {
                return student
            }
            else {return null}
        }
        else if (student.exams[1].dates.length >= 3) {
            const lastExamDate = dayjs(student.exams[1].dates.at(-1)).format('DD/MM/YYYY')
            if (nowDate.diff(lastExamDate, 'day') > 30) {
                return student
            }
            else {return null}
        }
    })
    return filtered
}