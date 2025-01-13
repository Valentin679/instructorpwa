'use client'
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import Loading from "@/app/components/Loading";
import {getExamById, signUpExam} from "@/app/api/fetchExams";
import Student from "@/app/exams/[id]/components/Student";
import BadTag from "@/app/students/components/item-components/Tags/badTag";
import {Button} from "antd";
import {signUpForExam} from "@/app/api/fetchStudents";

// Сделать чтобы до даты экзамена было одно меню действий, а в дату экзамена другое
// Сделать общее редактирование и одну отправку с обработкой на сервере


export default function Exam2() {

    const pathname = usePathname()
    const id = pathname.replace(/^.{7}/, '')
    const [exam, setExam] = useState()
    const [examId, setExamId] = useState(id);
    const [students, setStudents] = useState([])
    const [changed, setChanged] = useState(false)

    function cancelExam(id) {
        const newArray = students.filter((student, index) => {
            return index !== id
        })
        setStudents(newArray)
        setChanged(true)
    }
    function confirmExam(id) {
        const newStudent = students[id]
        newStudent.exams[1].dates.push(exam.date)
        console.log(newStudent)
        students[id] = newStudent
        const newArray = students
        setStudents(newArray)
        setChanged(true)
    }
    useEffect(() => {
        getExamById(examId).then((res) => {
            setExam(res)
            setStudents(res.students)
        })
    }, [examId]);


    if (!exam) {
        return <Loading/>
    } else {
        return (
            <div className={'d-flex flex-col h-100'}>
                <div className={'d-flex flex-row gap-2 mb-2 p-1'}>
                    {exam.date}
                </div>
                {changed ? <div className={'text-red-500'}>Сохраните изменения</div> : ''}
                <div className={'d-flex flex-row gap-2 mb-2 p-1'}>
                   Инспектор: {exam.inspector}
                </div>
                <div>
                    {students.map((student, index) => {return <Student key={student._id}
                                                                       index={index}
                                                                       studentData={student}
                                                                       examDate={exam.date}
                                                                       cancelExam={cancelExam}
                                                                       confirmExam={confirmExam}
                    />})}
                </div>

                <Button onClick={()=>{console.log(students)}}>console</Button>
                <Button onClick={()=>{
                    let bodyForStudents = []
                    let bodyForExam = {examId, students}
                    students.map(student => {
                        let id = student._id
                        let exams = student.exams
                        let data = {
                            id, exams
                        }
                        bodyForStudents.push(data)
                    })
                    console.log(bodyForStudents)
                    signUpForExam(bodyForStudents).then(res => console.log(res))
                    signUpExam(bodyForExam).then(res => setExamId(bodyForExam.examId))
                }}>id</Button>
            </div>

        )
            ;
    }
}
