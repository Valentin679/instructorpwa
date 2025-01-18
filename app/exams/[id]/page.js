'use client'
import {useContext, useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import Loading from "@/app/components/Loading";
import {getExamById, signUpExam} from "@/app/api/fetchExams";
import {Button, Select} from "antd";
import {editExams, getStudentById} from "@/app/api/fetchStudents";
import {filterExamWindow} from "@/app/exams/functions/filterExamWindow";
import Student from "@/app/exams/[id]/components/Student";
import studentsContext, {useStudents} from "@/app/context/StudentsContext";
import {mutateArrayForSelectStudents} from "@/app/functions/mutateArrayForSelectStudents";
import {findRecorded} from "@/app/exams/functions/findRecordedStudentsOnExam";
import {findIndexById} from "@/app/functions/findIndexById";

export default function Exam() {
    const pathname = usePathname()
    const id = pathname.replace(/^.{7}/, '')
    const [exam, setExam] = useState()
    const [examId, setExamId] = useState(id);
    // const {students, setStudents} = useContext(studentsContext)
    const students = useStudents()
    const [studentListForSelect, setStudentListForSelect] = useState([])
    const [recordedStudents, setRecordedStudents] = useState([])
    const [inputSelected, setInputSelected] = useState({value: 0, label: 'Не выбрано'})

    function fetchExam() {
        getExamById(examId).then((res) => {
            // console.log(res)
            setExam(res)
        })
    }

    const handleChange = (value) => {
        setInputSelected(value)
    };


    const examList = students.map((student, index) => {
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
            return <Student key={student._id} index={index} setInputSelected={setInputSelected} examDate={exam.date}
                            studentData={student}></Student>
        }
    })

    const addStudentForExam = () => {
        const index = findIndexById(students, inputSelected) //Индекс ученика в контексте (по значению селекта)
        students[index].exams[1].dates.push(exam.date) //добавляем дату к студенту
        editExams(inputSelected, students[index].exams).then((res) => { //фетч запрос на изменение в бд, отправляется весь раздел экзамена для студента
            console.log('Добавлено в БД')
        })
        handleChange({value: 0, label: 'Не выбрано'})
    }

    useEffect(() => {
        fetchExam()
        console.log('render')
        if (exam) {
            findRecorded(students, exam.date, setRecordedStudents)
            filterExamWindow(students, exam.date)
            console.log('tyt')
        }
    }, [examId, students]);


    if (!exam) {
        return <Loading/>
    } else {
        return (
            <div className={'d-flex flex-col h-100'}>
                <div className={'d-flex flex-row gap-2 mb-2 p-1'}>
                    {exam.date}
                </div>
                <div className={'d-flex flex-row gap-2 mb-2 p-1'}>
                    Инспектор: {exam.inspector}
                </div>
                <div className={'d-flex flex-row gap-2'}>
                    <Select
                        defaultValue={inputSelected}
                        value={inputSelected}
                        style={{width: '100%'}}
                        onDropdownVisibleChange={(open) => {
                            open ? mutateArrayForSelectStudents(students, exam.date, recordedStudents, setStudentListForSelect) : console.log('close select') //при открытии запускать функцию по мутации под селект
                        }}
                        onChange={handleChange}
                        options={studentListForSelect}
                    />
                    <Button onClick={() => {
                        addStudentForExam()
                    }}>Добавить</Button>
                </div>
                <div>
                    Список записаных:
                    {examList}
                </div>

                <Button onClick={() => {
                    console.log(students)
                }}>console</Button>
            </div>

        )
            ;
    }
}
