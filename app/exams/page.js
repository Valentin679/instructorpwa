'use client'
import {UserAddOutlined} from "@ant-design/icons";
import {Button} from "antd";
import {useRouter} from 'next/navigation'
import {useContext, useEffect, useState} from "react";
import {getExams} from "@/app/api/fetchExams";
import Link from "next/link";
import ExamsItem from "@/app/exams/components/ExamsItem";
import StudentsContext, {useStudents} from "@/app/context/StudentsContext";

export default function Home() {
    const [exams, setExams] = useState([])
    const router = useRouter()
    useEffect(() => {
        getExams().then(res => setExams(res))

    }, []);
    console.log(exams)
    return (
        <div className={'d-flex flex-col gap-3'}>
            <div style={{minHeight: '100%'}}>Экзамены</div>

            <div>{exams.map(exam => {
                return <Link key={exam._id} href={`/exams/${exam._id}`}><ExamsItem key={exam._id} exam={exam}/></Link>
            })}</div>

            <Button className={'mx-auto'} type={'primary'} onClick={() => {
                router.push('/exams/add-exam')
            }}><UserAddOutlined/>Запланировать экзамен</Button>

        </div>

    );
}
