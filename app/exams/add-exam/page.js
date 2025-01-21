'use client'
import {Button, Checkbox, DatePicker, Input, Select, Space} from "antd";
import {useEffect, useState} from "react";
import {addStudent, getActiveStudents} from "@/app/api/fetchStudents";
import {useRouter} from 'next/navigation'
import {addExam} from "@/app/api/fetchExams";
import dayjs from "dayjs";
import {filterExamWindow} from "@/app/exams/functions/filterExamWindow";
import StudentListOnExam from "@/app/exams/add-exam/StudentListOnExam";

import customParseFormat from "dayjs/plugin/customParseFormat";
import {mutateArrayForSelectStudents} from "@/app/functions/mutateArrayForSelectStudents";
import {useStudents} from "@/app/context/StudentsContext";

dayjs.extend(customParseFormat);
export default function AddExam() {
    const router = useRouter()
    const students = useStudents()
    const [fetchingStudents, setFetchingStudents] = useState(false)
    const [date, setDate] = useState([])
    const [studentListForSelect, setStudentListForSelect] = useState()
    const [studentsList, setStudentsList] = useState([])
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([])


    function fetchStudentsForSelect() {
        if (students !== undefined) {

            mutateArrayForSelectStudents(students.active, date, [], setStudentListForSelect)
        }
    }



    const onChangeDate = (date, dateString) => {
        setDate(dateString)
    }

    const findStudentById = (selectedItems) => {

        let arr = []
        selectedItems.map(el => {
            studentsList.find((student) => {
                if (student._id === el) {
                    arr.push(student)
                }
            })
        })
        // console.log(arr)
        setSelectedStudents(arr)
    }

    useEffect(() => {
        fetchingStudents ? fetchStudentsForSelect() : ''
    }, [fetchingStudents]);
    useEffect(() => {
        findStudentById(selectedItems)
    }, [selectedItems]);
    useEffect(() => {

    }, [selectedStudents]);

    return (
        <div className={'d-flex flex-column gap-3 p-2 items-center'}>
            <DatePicker style={{width: '100%',}} status={date ? "" : "error"} size={"large"} onChange={onChangeDate}
                        defaultValue={date}
                        showNow={false} needConfirm={false} format={'DD/MM/YYYY'} placeholder='Выберите дату экзамена'/>

            <Select
                size={"large"}
                defaultValue={selectedStudents}
                mode="multiple"
                placeholder='Выберите кандидатов'
                maxTagCount='responsive'
                onDropdownVisibleChange={() => {
                    fetchingStudents ? setFetchingStudents(false) : setFetchingStudents(true)
                }}
                style={{
                    width: '100%',
                }}
                value={selectedItems}
                onChange={setSelectedItems}
                options={studentListForSelect}
            />


            <div className={'d-flex flex-col w-100 gap-2'}>
                <h5>Список кандидатов:</h5>
                {selectedStudents?.length !== 0 ? <StudentListOnExam selectedStudents={selectedStudents}/> : 'Нет кандидатов...'}
            </div>


            <Button type={'primary'} onClick={() => {
                const data = {
                    date,
                    students: selectedStudents,
                    inspector: 'Не известно',
                    completed: false
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