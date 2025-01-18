'use client'
import {useContext, useEffect, useRef, useState} from "react";
import Loading from "@/app/components/Loading";
import {editExamResultForStudent, editExams} from "@/app/api/fetchStudents";
import StudentsContext, {StudentsProvider, useStudents} from "@/app/context/StudentsContext";
import {Button} from "antd";

export default function Student({studentData, index, examDate, setInputSelected}) {
    const [student, setStudent] = useState(studentData)
    // const {students, setStudents} = useContext(StudentsContext)
    const students = useStudents()
    const [goodExamResult, setGoodExamResult] = useState(studentData.exams[1].result)
    const refContainer = useRef();
    const refBlock = useRef();
    const [update, setUpdate] = useState(false)

    function goodExam() {
        student.exams[1].result = true
        editExamResultForStudent(student._id, student.exams).then((res) => {
                refBlock.current.style.background = 'green'
                setGoodExamResult(true)
            }
        )
    }

    function cancelExam(id) {
        let number
        students.find((student, index) => {
            if (student._id === id) {
                number = index
            }
        })
        const currentStudent = students[number]
        currentStudent.exams[1].dates.map((date, index) => {
                if (date === examDate) {
                    currentStudent.exams[1].dates.splice(index, 1)
                    students[number].exams[1].dates.splice(index, 1)
                    editExams(currentStudent._id, currentStudent.exams).then(res=>{
                        // students[number] = currentStudent
                        // setStudents(students)
                        // update ? setUpdate(false) : setUpdate(true)
                    })
                    setInputSelected('Не выбран')
                }
                console.log(currentStudent)

            }
        )
    }

    // console.log(goodExamResult)

    if (!student) {
        return <Loading/>
    } else {
        return (

            <div ref={refContainer} className={'d-flex flex-row overflow-hidden'}>
                <div ref={refBlock}
                     className={'d-flex p-3 bg-light border-bottom w-100 position-relative'}>
                    <p style={goodExamResult ? {color: "green"} : {} }>
                        {student.firstName + ' ' + student.lastName + ' ' + student.surname}
                    </p>

                </div>
                {goodExamResult ? '' :
                    <div className={'d-flex flex-row'}>
                        <div
                            className={'d-flex items-center justify-center bg-green-700 h-100 border-right border-secondary px-1 text-white '}
                            onClick={() => {
                                goodExam()
                            }}
                        >
                            Сдал
                        </div>
                        <div
                            className={'d-flex items-center justify-center bg-red-700 h-100 border-right border-secondary px-1 text-white '}
                            onClick={() => {
                                cancelExam(student._id)
                            }}
                        >Отмена
                        </div>
                    </div>}
            </div>
        );
    }
}
