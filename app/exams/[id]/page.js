'use client'
import {useContext, useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import Loading from "@/app/components/Loading";
import {getExamById, signUpExam} from "@/app/api/fetchExams";
import {Button, Select} from "antd";
import {editExams, getStudentById} from "@/app/api/fetchStudents";
import {filterExamWindow} from "@/app/exams/functions";
import Student from "@/app/exams/[id]/components/Student";
import studentsContext from "@/app/context/StudentsContext";

export default function Exam() {
    const pathname = usePathname()
    const id = pathname.replace(/^.{7}/, '')
    const [exam, setExam] = useState()
    const [examId, setExamId] = useState(id);
    const {students, setStudents} = useContext(studentsContext)
    const [studentListForSelect, setStudentListForSelect] = useState([])
    const [inputSelected, setInputSelected] = useState('Не выбрано')

    function fetchExam() {
        getExamById(examId).then((res) => {
            // console.log(res)
            setExam(res)
            fetchStudentsForSelect(res.date)
        })
    }

    const fetchStudentsForSelect = (date) => {
        if (exam) {
            const findRecorded = students.map(student => {
                let cunfirm = student.exams[1].dates.find(e => e === exam.date)
                // console.log(cunfirm)
                if (cunfirm) {
                    return student
                } else {
                    return null
                }
            })
            let recorded = findRecorded.filter(element => element != null)
            const filteredByDate = filterExamWindow(students, date, recorded)
            const studentsArr = filteredByDate.map(student => {
                return {
                    value: student._id,
                    label: student.lastName + ' ' + student.firstName[0] + '. ' + student.surname[0] + '.'
                }
            })
            setStudentListForSelect(studentsArr)
        }
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
            return <Student key={student._id} index={index} setInputSelected={setInputSelected} examDate={exam.date} studentData={student}></Student>
        }
    })

    const addStudentForExam = () => {
        getStudentById(inputSelected).then((res) => {
                let number
                let student = res
                students.find((student, index) => { // поиск студента в контексте (по значению селекта)
                    if (student._id === inputSelected) {
                        number = index

                    }
                })
                student.exams[1].dates.push(exam.date)
                students[number].exams[1].dates.push(exam.date)//добавляем дату к студенту
                editExams(inputSelected, student.exams).then((res) => { //фетч запрос на изменение в бд, отправляется весь раздел экзамена для студента
                    console.log('Добавлено в БД')
                })
                handleChange('Не выбрано')
            }
        )
    }

    useEffect(() => {
        console.log('render')
        fetchExam()
    }, [examId, students, inputSelected]);


    useEffect(() => {
        console.log('change')
    }, [students]);

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
                        style={{width: '100%'}}
                        onChange={handleChange}
                        options={studentListForSelect}
                    />
                    <Button onClick={() => {
                        console.log(inputSelected)
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
