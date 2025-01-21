'use client'
import {UserAddOutlined} from "@ant-design/icons";
import {Button} from "antd";
import {useRouter} from 'next/navigation'
import {useContext, useEffect, useState} from "react";
import {getExams} from "@/app/api/fetchExams";
import Link from "next/link";
import ExamsItem from "@/app/exams/components/ExamsItem";
import {useMessageSuccess} from "@/app/context/MessagesContext";

export default function Home() {
    const [exams, setExams] = useState([])
    const router = useRouter()
    const success = useMessageSuccess()
    useEffect(() => {
        getExams().then(res => setExams(res)).catch(e => {
            console.log(e);
        });

    }, []);
    // console.log(exams)



    return (
        <div className={'d-flex flex-col gap-3'}>
            <div style={{minHeight: '100%'}}>Экзамены</div>

            <div>{exams.map(exam => {
                return <ExamsItem key={exam._id} exam={exam}/>
            })}</div>

            <Button className={'mx-auto'} type={'primary'} onClick={() => {
                router.push('/exams/add-exam')
            }}><UserAddOutlined/>Запланировать экзамен</Button>
            <Button className={'mx-auto'} type={'primary'} onClick={() => {
                success('gooooooooooood')
            }}>

            </Button>


        </div>

    );
}
