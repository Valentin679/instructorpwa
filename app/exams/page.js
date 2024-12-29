'use client'
import {UserAddOutlined} from "@ant-design/icons";
import {Button} from "antd";
import {useRouter} from 'next/navigation'
import {useEffect, useState} from "react";
import {getExams} from "@/app/api/fetchExams";

export default function Home() {
    const [exams, setExams] = useState([])
  const router = useRouter()
    useEffect(() => {
        getExams().then(res => setExams(res))
    }, []);

  return (
      <div>
        <div style={{minHeight: '100%'}}>Экзамены</div>
          <div>{exams.map(exam => {
              return <p>{exam.date}</p>
          })}</div>
        <Button className={'mx-auto'} type={'primary'} onClick={() => {
          router.push('/exams/add-exam')
        }}><UserAddOutlined/>Запланировать экзамен</Button>

      </div>

  );
}
