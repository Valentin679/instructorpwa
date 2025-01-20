import {useStudents} from "@/app/context/StudentsContext";
import Student from "@/app/exams/[id]/components/Student";
import {beforeOfAfterDate} from "@/app/functions/beforeOfAfterDate";
import {useState} from "react";

export default function ExamStudentList({exam, passed}) {
    const students = useStudents()

    let list
    if (students?.length !== 0 && students !== undefined) {

        list = students.map((student, index) => {
            let confirm
            if (exam) {
                student.exams[1].dates.map(e => {
                    // console.log(student.lastName +" "+e)
                    if (e === exam.date) {
                        confirm = true
                    }
                })
            }
            if (confirm) {
                // console.log(index)
                return <Student key={student._id} index={index}
                                examDate={exam.date}
                                passed={passed}
                ></Student>
            }
        })
    }
    return list
}