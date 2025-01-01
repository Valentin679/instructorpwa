'use client'
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import Loading from "@/app/components/Loading";
import {getExamById} from "@/app/api/fetchExams";

export default function Exam() {

    const pathname = usePathname()
    const id = pathname.replace(/^.{7}/, '')
    const [exam, setExam] = useState()
    const [examId, setExamId] = useState(id);
    console.log(examId)
    useEffect(() => {
        getExamById(examId).then(res => setExam(res))
    }, [examId]);

    console.log(exam)
    if (!exam) {
        return <Loading/>
    } else {
        return (
            <div className={'d-flex flex-col h-100'}>
                <div className={'d-flex flex-row gap-2 mb-2 p-1'}>
                    {exam.date}
                </div>
            </div>

        )
            ;
    }
}
