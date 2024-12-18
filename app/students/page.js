'use client'
import {useEffect, useState} from "react";
import {getStudents} from "@/app/api/fetchStudents";
import StudentsListItem from "@/app/students/components/StudentsListItem";
import { useRouter } from 'next/navigation'
import {Button} from "antd";

export default function Students() {
    const router = useRouter()
  const [students, setStudents] = useState([])

  useEffect(() => {
    getStudents().then(res => setStudents(res))
  }, []);


  const studentsList = students.map(student => (
      <StudentsListItem key={student._id} student={student} />
  ))
  return (
      <div className={'h-100 d-flex flex-column'}>
        {studentsList}
       {/*<Link href={'students/add-student'} className={'btn-primary'}>Добавить ученика</Link>*/}
       <Button className={'mx-auto'} type={'primary'} onClick={()=>{
           router.push('/students/add-student')
       }}>Добавить ученика</Button>
      </div>
  );
}
