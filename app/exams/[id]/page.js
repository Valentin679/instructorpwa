'use client'
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import Loading from "@/app/components/Loading";
import {getExamById} from "@/app/api/fetchExams";
import {Button, Select} from "antd";
import {filterExamWindow} from "@/app/exams/functions/filterExamWindow";
import {useStudents, useStudentsDispatch} from "@/app/context/StudentsContext";
import {mutateArrayForSelectStudents} from "@/app/functions/mutateArrayForSelectStudents";
import {findRecorded} from "@/app/exams/functions/findRecordedStudentsOnExam";
import {findIndexById} from "@/app/functions/findIndexById";
import ExamList from "@/app/exams/[id]/components/ExamStudentList";
import {editExamsOneStudent} from "@/app/api/fetchOneStudent";
import ExamStudentList from "@/app/exams/[id]/components/ExamStudentList";
import {beforeOfAfterDate} from "@/app/functions/beforeOfAfterDate";
import dayjs from "dayjs";



export default function Exam() {
    const pathname = usePathname()
    const id = pathname.replace(/^.{7}/, '')
    const [exam, setExam] = useState()
    const [examId, setExamId] = useState(id);
    const [passed, setPassed] = useState()
    const students = useStudents()
    const dispatch = useStudentsDispatch()
    const [studentListForSelect, setStudentListForSelect] = useState([])
    const [recordedStudents, setRecordedStudents] = useState([])
    const [inputSelected, setInputSelected] = useState({value: 0, label: 'Не выбрано'})

    function fetchExam() {
        getExamById(examId).then((res) => {
            // console.log(res)
            setExam(res)
            setPassed(beforeOfAfterDate(res.date))
        })
    }

    const handleChange = (value) => {
        setInputSelected(value)
    };

    const addStudentForExamDispatch = () => {
        const index = findIndexById(students, inputSelected) //Индекс ученика в контексте (по значению селекта)
        let newStudent = students[index]
        newStudent.exams[1].dates.push(exam.date)
        dispatch({
            type: 'changeExamDates',
            student: newStudent
        })
        editExamsOneStudent(inputSelected, students[index].exams).then((res) => { //фетч запрос на изменение в бд, отправляется весь раздел экзамена для студента
            // console.log('Добавлено в БД')
        })
        handleChange({value: 0, label: 'Не выбрано'})
    }
    useEffect(() => {
        fetchExam()
        // console.log('render')
        if (exam) {
            findRecorded(students, exam.date, setRecordedStudents)
            filterExamWindow(students, exam.date)

            // console.log('tyt')
        }

    }, [examId, students]);


    if (!exam) {
        return <Loading/>
    } else {
        return (
            <div className={'d-flex flex-col h-100 gap-3'}>
                <div className={'mt-1 '}>
                    <h5 className={'text-center'}>{dayjs(exam.date, 'DD/MM/YYYY').format('DD MMMM YYYY')}</h5>
                </div>
                <div className={'px-1'}>
                    <h6>Инспектор: {exam.inspector}</h6>
                </div>
                {/*{!passed ?*/}
                <div className={'d-flex flex-row gap-2'}>
                    <Select
                        defaultValue={inputSelected}
                        value={inputSelected}
                        style={{width: '100%'}}
                        onDropdownVisibleChange={(open) => {
                            open ? mutateArrayForSelectStudents(students, exam.date, recordedStudents, setStudentListForSelect) : '' //при открытии запускать функцию по мутации под селект
                        }}
                        onChange={handleChange}
                        options={studentListForSelect}
                    />
                    <Button onClick={() => {
                        addStudentForExamDispatch()
                    }}>Добавить</Button>
                </div>
                {/*: ''*/}
                {/*}*/}
                <div >
                    <h6 className={'px-1 text-center'}>Список кандидатов</h6>
                    <ExamStudentList exam={exam} passed={passed} setInputSelected={setInputSelected}/>
                </div>

                <Button onClick={() => {
                    console.log(students)
                }}>console</Button>
            </div>

        )
            ;
    }
}
