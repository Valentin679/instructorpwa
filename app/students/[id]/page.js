'use client'
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import Grades from "@/app/students/[id]/Grades";
import Avatar from "@/app/students/[id]/components/Avatar";
import StudentData from "@/app/students/[id]/components/StudentData";
import Loading from "@/app/components/Loading";
import {changeActiveOneStudent, getStudentById} from "@/app/api/fetchOneStudent";
import {MdAirplanemodeActive, MdOutlineAirplanemodeInactive} from "react-icons/md";
import {useStudentsDispatch} from "@/app/context/StudentsContext";
import {findIndexById} from "@/app/functions/findIndexById";
import {useMessageError, useMessageSuccess} from "@/app/context/MessagesContext";

export default function StudentProfile() {

    const dispatch = useStudentsDispatch()
    const messageError = useMessageError()
    const messageSuccess = useMessageSuccess()
    const pathname = usePathname()
    const id = pathname.replace(/^.{10}/, '')
    const [student, setStudent] = useState()
    const [studentId, setStudentId] = useState(id);
    const [isOpenGrades, setIsOpenGrades] = useState(false)
    const [active, setActive] = useState(null)

    function changeActiveStudent() {
        if (student !== undefined) {
            let newStudent = student
            if (active === true) {
                setActive(false)
                changeActiveOneStudent(id, {body: false}).then(res => {
                    newStudent.active = false
                    dispatch({
                        type: 'changed',
                        student: newStudent
                    })
                    messageSuccess('Кандидат неактивен')
                }).catch(()=>{messageError('Ошибка')})

            }
            if (active === false) {
                setActive(true)
                changeActiveOneStudent(id, {body: true}).then(res => {
                    newStudent.active = true
                    dispatch({
                        type: 'changed',
                        student: newStudent
                    })
                    messageSuccess('Кандидат активен')
                }).catch(()=>{messageError('Ошибка')})
            }

        }
    }

    useEffect(() => {
        getStudentById(studentId).then(res => {
            setStudent(res)
            setActive(res.active)
        })
    }, [studentId]);

    // console.log(student)
    if (!student) {
        return <Loading/>
    } else {
        return (
            <div className={'d-flex flex-col h-100'}>
                <div className={'d-flex flex-row justify-between gap-2 mb-2 p-1'}>
                    <div className={'d-flex flex-row gap-2 mb-2 p-1'}>
                        <Avatar/>
                        <StudentData firstName={student.firstName}
                                     lastName={student.lastName}
                                     surname={student.surname}
                                     group={student.group}
                                     exams={student.exams}
                                     quantity={student.quantityPracticalLessons}
                        />
                    </div>
                    <div className={'mt-1 mr-1'}>
                        {active ?
                            <MdAirplanemodeActive size={'1.8em'} color={'green'}
                                                  onClick={() => {
                                                      changeActiveStudent()
                                                  }}
                            />
                            :
                            <MdOutlineAirplanemodeInactive size={'1.8em'} color={'red'}
                                                           onClick={() => {
                                                               changeActiveStudent()
                                                           }}
                            />
                        }
                    </div>
                </div>

                <div className={'h-100 overflow-y-scroll'}>
                    <button type="button" className={'btn btn-warning w-100'}
                            onClick={() => {
                                isOpenGrades ? setIsOpenGrades(false) : setIsOpenGrades(true)
                            }}
                    >
                        Навыки
                    </button>
                    <div className={isOpenGrades ? 'px-1' : 'h-0 overflow-y-hidden'}>
                        {
                            student.exercise.map((el, index) => {
                                return (
                                    <Grades gradeIndex={index} id={studentId} key={el.slug} exercises={student.exercise}
                                            grade={el}/>)
                            })}
                    </div>
                </div>
            </div>

        )
            ;
    }
}
