'use client'
import {Button, Checkbox, DatePicker, Input, Select, Space} from "antd";
import {useEffect, useState} from "react";
import {addStudent, getActiveStudents} from "@/app/api/fetchStudents";
import { useRouter } from 'next/navigation'
import {addExam} from "@/app/api/fetchExams";




export default function AddExam() {
  const router = useRouter()

    const [fetchingStudents, setFetchingStudents] = useState(false)
    const [date, setDate] = useState(null)
    const [studentListForSelect, setStudentListForSelect] = useState()
    const [studentsList, setStudentsList] = useState([])
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([])

    const fetchStudentsForSelect = () => {
        getActiveStudents().then((res)=>{
            setStudentsList(res)
            const studentsArr = res.map(student => {
                return {value: student._id, label: student.lastName}
            })
            setStudentListForSelect(studentsArr)
        })
    }
    const onChangeDate = (date, dateString) => {
        setDate(dateString)
    }
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    const findStudentById = () => {
        let arr=[]
        selectedItems.map(el => {
            studentsList.find((student) => {
                if (student._id === el) {
                    arr.push(student)
                }
            })
        })
        setSelectedStudents(arr)
    }
    useEffect(() => {
        fetchingStudents ? fetchStudentsForSelect() : ''
    }, [fetchingStudents]);
    useEffect(() => {
        findStudentById()
    }, [selectedItems]);

  return (
      <div className={'d-flex flex-column gap-2 px-1 items-center'}>
          <DatePicker style={{width: '90%',}} status={date ? "" : "error"} size={"large"} onChange={onChangeDate}
                      showNow={false} needConfirm={false} format={'DD/MM/YYYY'}/>

          <Select
              prefix="Кандидаты:"
              defaultValue={[]}
              mode="multiple"
              onDropdownVisibleChange={()=>{
                  fetchingStudents ? setFetchingStudents(false) : setFetchingStudents(true)
              }}
              style={{
                  width: '90%',
              }}
              value={selectedItems}
              onChange={setSelectedItems}
              options={studentListForSelect}
          />

          {selectedStudents.map(el=><p>{el.lastName}</p>)}


        <Button type={'primary'} onClick={() => {
          const data = {
            firstName,
            lastName,
            surname,
            phone,
            group: {
              number: group,
              year: 2024
            },
            status,
            instructor,
            quantityPracticalLessons,
            exercise,
            exams,
            active: true
          }
          console.log(data)
          addExam(data).then(res => {
            console.log(res)
            router.push('/exams')
          })
        }}>Запланировать экзамен</Button>
      </div>
  );
}