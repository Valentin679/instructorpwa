'use client'
import {useContext, useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import Loading from "@/app/components/Loading";
import {getExamById, signUpExam} from "@/app/api/fetchExams";
import {Button, Select} from "antd";
import {getActiveStudents, getStudentById, signUpForExam} from "@/app/api/fetchStudents";
import {filterExamWindow} from "@/app/exams/functions";
import Student from "@/app/exams/[id]/components/Student";
import studentsContext from "@/app/context/StudentsContext";

// Сделать чтобы до даты экзамена было одно меню действий, а в дату экзамена другое
// Сделать общее редактирование и одну отправку с обработкой на сервере


export default function Exam() {



    // Получать активных студентов +
    // Фильтровать по окну пересдачи +
    // Фильтр для импута +
    //

    const pathname = usePathname()
    const id = pathname.replace(/^.{7}/, '')
    const [exam, setExam] = useState()
    const [examId, setExamId] = useState(id);
    // const [students, setStudents] = useState([])
    const {students, setStudents} = useContext(studentsContext)
    const [studentListForSelect, setStudentListForSelect] = useState([])
    const [inputSelected, setInputSelected] = useState('Не выбрано')

    const fetchStudentsForSelect = (date, recorded) => {
        getActiveStudents().then((res) => {
            const filteredByDate = filterExamWindow(res, date, recorded)
            const studentsArr = filteredByDate.map(student => {
                return {
                    value: student._id,
                    label: student.lastName + ' ' + student.firstName[0] + '. ' + student.surname[0] + '.'
                }
            })
            setStudentListForSelect(studentsArr)
        })
    }
    const handleChange = (value) => {
        setInputSelected(value)
    };

    useEffect(() => {
        getExamById(examId).then((res) => {
            // console.log(res)
            setExam(res)
            // setStudents(res.students)
            fetchStudentsForSelect(res.date, students)
        })
    }, [examId, students]);


    const examList = students.map((student,index) => {
       let confirm
        student.exams[1].dates.map(e => {
            // console.log(student.lastName +" "+e)
            if (e === exam.date){
                confirm = true
            } })
        if (confirm) {
            console.log(index)
           return <Student key={student._id} index={index} examDate={exam.date} studentData={student}></Student>
        }
    })

    if (!exam) {
        return <Loading/>
    } else {
        return (
            <div className={'d-flex flex-col h-100'}>
                <div className={'d-flex flex-row gap-2 mb-2 p-1'}>
                    {exam.date}
                </div>
                {/*{changed ? <div className={'text-red-500'}>Сохраните изменения</div> : ''}*/}
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
                        getStudentById(inputSelected).then((res) => {

                                let addedStudent = [...students, res]
                                setStudents(addedStudent)

                                let exams = res.exams
                                exams[1].dates.push(exam.date)
                                signUpForExam(res._id, exams).then(res => {
                                    setStudentListForSelect(studentListForSelect.filter(item => item.value !== inputSelected))
                                    signUpExam(examId, addedStudent).then((res) => {
                                        // console.log(res)
                                    })
                                })


                            }
                        )

                    }}>Добавить</Button>
                </div>
                <div>
                    Список записаных
                    {/*{students.map((student,index) => <Student key={student._id} index={index} examDate={exam.date} studentData={student}></Student>)}*/}
                    {examList}
                </div>

                <Button onClick={() => {
                    // console.log(students)
                }}>console</Button>
                {/*<Button onClick={()=>{*/}
                {/*    let bodyForStudents = []*/}
                {/*    let bodyForExam = {examId, students}*/}
                {/*    students.map(student => {*/}
                {/*        let id = student._id*/}
                {/*        let exams = student.exams*/}
                {/*        let data = {*/}
                {/*            id, exams*/}
                {/*        }*/}
                {/*        bodyForStudents.push(data)*/}
                {/*    })*/}
                {/*    console.log(bodyForStudents)*/}
                {/*    signUpForExam(bodyForStudents).then(res => console.log(res))*/}
                {/*    signUpExam(bodyForExam).then(res => setExamId(bodyForExam.examId))*/}
                {/*}}>id</Button>*/}
            </div>

        )
            ;
    }
}
