import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {useStudents} from "@/app/context/StudentsContext";

dayjs.extend(customParseFormat);

export const filterExamWindow = (students, date, recorded) => {
    const nowDate = dayjs(date, 'DD/MM/YYYY')
    // const students = useStudents()
    // const leastArr = recorded.length < filtered.length ? recorded : filtered;
    // const biggestArr = recorded.length >= filtered.length ? recorded : filtered;
    //
    // const resultArray = biggestArr.map((item, index) => {
    //     // console.log(biggestArr)
    //     // console.log(leastArr)
    //     leastArr.map(item2 => {
    //         if (item2._id === item._id) {
    //             console.log(index)
    //         }
    //         // filtered.splice(index, 1)
    //     })
    // });
    // //
    // // console.log(resultArray);
    // // console.log(filtered);

    return students.filter(student => {

        if (student.exams[0].result === false) {
            return null
        } else if (student.exams[1].dates.length === 0) {
            return student
        } else if (student.exams[1].dates.length < 3) {
            const lastExamDate = dayjs(student.exams[1].dates.at(-1), 'DD/MM/YYYY')
            if (nowDate.diff(lastExamDate, 'day') > 7) {
                return student
            } else {
                return null
            }
        } else if (student.exams[1].dates.length >= 3) {
            const lastExamDate = dayjs(student.exams[1].dates.at(-1), 'DD/MM/YYYY')
            if (nowDate.diff(lastExamDate, 'day') > 180) {
                return student
            } else {
                return null
            }
        }
    })
}