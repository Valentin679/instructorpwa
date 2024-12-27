'use client'
import {useEffect, useState} from "react";
import {usePathname, useSearchParams} from "next/navigation";
import {getStudentById} from "@/app/api/fetchStudents";
import profilePic from '../../../public/profile.jpg'
import Image from 'next/image'
import Grades from "@/app/students/[id]/Grades";
import GoodTag from "@/app/students/components/Tags/goodTag";
import GroupTag from "@/app/students/components/Tags/groupTag";
import Avatar from "@/app/students/[id]/components/Avatar";
import StudentData from "@/app/students/[id]/components/StudentData";
import Loading from "@/app/components/Loading";

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
        return <Loading/>
    } else {
        return (
            <div className={'d-flex flex-col h-100'}>
                <div className={'d-flex flex-row gap-2 mb-2 p-1'}>
                    <Avatar/>
                    <StudentData firstName={student.firstName} lastName={student.lastName} surname={student.surname} group={student.group}/>
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
                                return (<Grades gradeIndex={index} id={studentId} key={el.slug} exercises={student.exercise} grade={el}/>)
                            })}
                    </div>
                </div>
            </div>

    )
        ;
    }
}
