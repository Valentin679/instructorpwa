'use client'
import {UserAddOutlined} from "@ant-design/icons";
import {Button} from "antd";
import {useRouter} from 'next/navigation'
import {useEffect, useState} from "react";
import {getExams} from "@/app/api/fetchExams";
import Link from "next/link";

export default function Home() {
    const [exams, setExams] = useState([])
  const router = useRouter()
    useEffect(() => {
        getExams().then(res => setExams(res))
    }, []);
console.log(exams)
  return (
      <div>
        <div style={{minHeight: '100%'}}>Экзамены</div>

          <div>{exams.map(exam => {
              return <Link key={exam._id} href={`/exams/${exam._id}`}><p>{exam.date}</p></Link>
          })}</div>

        <Button className={'mx-auto'} type={'primary'} onClick={() => {
          router.push('/exams/add-exam')
        }}><UserAddOutlined/>Запланировать экзамен</Button>

      </div>

  );
}
