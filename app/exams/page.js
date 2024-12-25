'use client'
import {UserAddOutlined} from "@ant-design/icons";
import {Button} from "antd";
import {useRouter} from 'next/navigation'

export default function Home() {

  const router = useRouter()


  return (
      <div>
        <div style={{minHeight: '100%'}}>Экзамены</div>
        <Button className={'mx-auto'} type={'primary'} onClick={() => {
          router.push('/exams/add-exam')
        }}><UserAddOutlined/>Запланировать экзамен</Button>

      </div>

  );
}
