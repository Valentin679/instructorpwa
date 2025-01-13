'use client'
import {useContext, useEffect, useRef, useState} from "react";
import Loading from "@/app/components/Loading";
import {editExamResultForStudent, editExams} from "@/app/api/fetchStudents";
import StudentsContext from "@/app/context/StudentsContext";
import {Button} from "antd";

export default function Student({studentData, index, examDate}) {
    const [student, setStudent] = useState(studentData)
    const {students, setStudents} = useContext(StudentsContext)
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
        console.log(students)
        students.find((student, index) => {
            if (student._id === id) {
                console.log(index)
                number = index
            }
        })
        const currentStudent = students[number]
        console.log(currentStudent)
        currentStudent.exams[1].dates.map((date, index) => {
                console.log('date - ' + date)
                if (date === examDate) {
                    console.log(true)
                    currentStudent.exams[1].dates.splice(index, 1)
                }
                console.log(currentStudent)
                editExams(currentStudent._id, currentStudent.exams).then(res=>{
                    // students[number] = currentStudent
                    // setStudents(students)
                    update ? setUpdate(false) : setUpdate(true)
                })
            }
        )
    }

    useEffect(() => {

    }, [update]);
    // console.log(goodExamResult)

    if (!student) {
        return <Loading/>
    } else {
        return (

            <div ref={refContainer} className={'d-flex flex-row overflow-hidden'}>
                <div ref={refBlock} style={goodExamResult ? {background: "green"} : {background: "none"}}
                     className={'d-flex p-3 bg-light border-bottom w-100 position-relative'}>
                    <p>
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
                <Button onClick={()=>{console.log(students)}}>sss</Button>
            </div>
        );
    }
}
