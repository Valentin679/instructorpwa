'use client'
import {useEffect, useState} from "react";
import {getStudents} from "@/app/api/fetchStudents";
import StudentsListItem from "@/app/students/components/StudentsListItem";

export default function Students() {

  const [students, setStudents] = useState([])

  useEffect(() => {
    getStudents().then(res => setStudents(res))
  }, []);


  const studentsList = students.map(student => (
      <StudentsListItem key={student._id} student={student} />
  ))
  return (
      <div className={'h-100'}>
        {studentsList}
      </div>
  );
}
