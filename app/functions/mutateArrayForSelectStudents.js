import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {filterExamWindow} from "@/app/exams/functions/filterExamWindow";

dayjs.extend(customParseFormat);

export const mutateArrayForSelectStudents = (students, date, recordedStudents, setState) => {

    const array = filterExamWindow(students, date, recordedStudents)

    const mutableArray= array.map(student => {
        return {
            value: student._id,
            label: student.lastName + ' ' + student.firstName[0] + '. ' + student.surname[0] + '.'
        }
    })
    // console.log(mutableArray)
    // return mutableArray
    setState(mutableArray)
}