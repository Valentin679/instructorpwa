'use client'
import {useRef, useState} from "react";
import Loading from "@/app/components/Loading";
import {useStudents, useStudentsDispatch} from "@/app/context/StudentsContext";
import {editExamsOneStudent} from "@/app/api/fetchOneStudent";

export default function Student({studentData, index, examDate, passed}) {
    const [student, setStudent] = useState(studentData)
    const students = useStudents()
    const dispatch = useStudentsDispatch()
    const [goodExamResult, setGoodExamResult] = useState(students[index].exams[1].result)
    const refContainer = useRef();
    const refBlock = useRef();

    function goodExam() {
        let currentStudent = students[index]
        currentStudent.exams[1].result = true
        dispatch({
            type: 'changeExamDates',
            student: currentStudent
        })
        editExamsOneStudent(student._id, student.exams).then((res) => {
                refBlock.current.style.background = 'green'
                setGoodExamResult(true)
            }
        )
    }

    function cancelExam(id) {
        const currentStudent = students[index]
        currentStudent.exams[1].dates.map((date, index) => {
                if (date === examDate) {
                    currentStudent.exams[1].dates.splice(index, 1)
                }
            }
        )
        dispatch({
            type: 'changeExamDates',
            student: currentStudent
        })
        editExamsOneStudent(currentStudent._id, currentStudent.exams).then(res => {
        })
    }

    if (!student) {
        return <Loading/>
    } else {
        return (

            <div ref={refContainer} className={'d-flex flex-row overflow-hidden'}>
                <div ref={refBlock}
                     className={'d-flex p-3 bg-light border-bottom w-100 position-relative'}>
                    <p style={goodExamResult ? {color: "green"} : {}}>
                        {student.firstName + ' ' + student.lastName + ' ' + student.surname}
                    </p>

                </div>
                {goodExamResult ? '' :
                    <div className={'d-flex flex-row'}>
                        {/*{passed ?*/}
                            <div
                                className={'d-flex items-center justify-center bg-green-700 h-100 border-right border-secondary text-center px-2 text-white '}
                                onClick={() => {
                                    goodExam()
                                }}
                            >
                                Сдал
                            </div>

                            {/*:*/}
                            <div
                                className={'d-flex items-center justify-center bg-red-700 h-100 border-right border-secondary px-1 text-white '}
                                onClick={() => {
                                    cancelExam(student._id)
                                }}
                            >Отмена
                            </div>
                        {/*}*/}
                    </div>
                }
            </div>
        );
    }
}
