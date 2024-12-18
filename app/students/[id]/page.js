'use client'
import {useEffect, useState} from "react";
import {usePathname, useSearchParams} from "next/navigation";
import {getStudentById} from "@/app/api/fetchStudents";
import profilePic from '../../../public/profile.jpg'
import Image from 'next/image'
import Grades from "@/app/students/[id]/Grades";

export default function StudentProfile() {

    const pathname = usePathname()
    const id = pathname.replace(/^.{10}/, '')
    const [student, setStudent] = useState()
    const [studentId, setStudentId] = useState(id);
    const [isOpenGrades, setIsOpenGrades] = useState(false)
    useEffect(() => {
        getStudentById(studentId).then(res => setStudent(res))
    }, [studentId]);

    // console.log(student)
    if (!student) {
        return <h1 className={'h-100'}>Loading</h1>
    } else {
        return (
            <div className={'d-flex flex-col h-100'}>
                <div className={'d-flex flex-row gap-2 mb-2 p-1'}>
                    <Image src={profilePic} alt={''}
                           className={'w-25 h-100 object-cover'}/>
                    <div style={{flexDirection: 'column', gap: 10}}>
                        <div className={'d-flex flex-row gap-1'}>
                            <p>{student.firstName}</p>
                            <p>{student.lastName}</p>
                            <p>{student.surname}</p>
                        </div>
                        <div>
                            <p>Группа: {student.group}</p>
                        </div>
                    </div>
                </div>
                <div className={'h-100'}>
                    <button type="button" className={'btn btn-warning w-100'}
                            onClick={() => {
                                isOpenGrades ? setIsOpenGrades(false) : setIsOpenGrades(true)
                            }}
                    >Навыки
                    </button>

                    <div className={isOpenGrades ? 'h-100 px-1' : 'h-0 overflow-y-hidden'}>
                        {
                            student.exercise.map((el, index) => {
                                return (<Grades gradeIndex={index} id={studentId} key={el.slug} exercises={student.exercise} grade={el}/>)
                            })}
                    </div>
                </div>
            </div>

    )
        ;
    }
}
