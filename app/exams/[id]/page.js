'use client'
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import Loading from "@/app/components/Loading";
import {getExamById} from "@/app/api/fetchExams";
import Student from "@/app/exams/[id]/components/Student";

export default function Exam() {

    const pathname = usePathname()
    const id = pathname.replace(/^.{7}/, '')
    const [exam, setExam] = useState()
    const [examId, setExamId] = useState(id);
    const [students, setStudents] = useState()
    // console.log(examId)
    useEffect(() => {
        getExamById(examId).then((res) => {
            setExam(res)
            setStudents(res.students)
        })
    }, [examId]);

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
                <div>
                    {students.map(student => {return <Student key={student._id} studentData={student} examDate={exam.date}/>})}
                </div>
            </div>

        )
            ;
    }
}
