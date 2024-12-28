'use client'
import {Button, Checkbox, DatePicker, Input, Select, Space} from "antd";
import {useEffect, useState} from "react";
import {addStudent} from "@/app/api/fetchStudents";
import { useRouter } from 'next/navigation'
import AddDriveExams from "@/app/students/add-student/components/AddDriveExams";
import DefaultInput from "@/app/students/add-student/components/DefaultInput";
import TwoNumInput from "@/app/students/add-student/components/TwoNumInput";
import PhoneNumberInput from "@/app/students/add-student/components/PhoneNumberInput";

const statuses = [
  {
    value: 1,
    label: 'Подал документы'
  },
  {
    value: 2,
    label: 'Изучает теорию'
  },
  {
    value: 3,
    label: 'Допущен к вождению'
  },
  {
    value: 4,
    label: 'Обучение окончено'
  },
  {
    value: 5,
    label: 'Сдает экзамены'
  }
]

const instructorsList = [
  { value: 0, label: 'Не назначен'},
  {
    value: 1,
    label: 'Мезенин Валентин Андреевич',

  },
  {
    value: 2,
    label: 'Давыдов Николай Николаевич',

  },
]

const exercise = [
  {
    slug: 'start',
    name: 'Начало движения',
    level: 'Не изучено'
  },
  {
    slug: 'trestle',
    name: 'Эстакада',
    level: 'Не изучено'
  },
  {
    slug: 'parallelParking',
    name: 'Параллельная парковка',
    level: 'Не изучено'
  },
  {
    slug: 'garage',
    name: 'Гараж',
    level: 'Не изучено'
  },
  {
    slug: 'move',
    name: 'Движение прямо',
    level: 'Не изучено'
  },
  {
    slug: 'rebuilding',
    name: 'Перестроение',
    level: 'Не изучено'
  },
  {
    slug: 'rightTurn',
    name: 'Поворот направо',
    level: 'Не изучено'
  },
  {
    slug: 'leftTurn',
    name: 'Поворот налево',
    level: 'Не изучено'
  },
  {
    slug: 'definitionIntersection',
    name: 'Определение перекрестка',
    level: 'Не изучено'
  },
  {
    slug: 'choiceLocation',
    name: 'Выбор места задания',
    level: 'Не изучено'
  },
  {
    slug: 'priority',
    name: 'Приоритет',
    level: 'Не изучено'
  },
  {
    slug: 'turn',
    name: 'Развороты',
    level: 'Не изучено'
  },
  {
    slug: 'turn3part',
    name: 'Разворот 3 приема',
    level: 'Не изучено'
  },
  {
    slug: 'speed',
    name: 'Скорость движения',
    level: 'Не изучено'
  },
  {
    slug: 'rails',
    name: 'С рельс/Не с рельс',
    level: 'Не изучено'
  },
  {
    slug: 'rings',
    name: 'Кольца',
    level: 'Не изучено'
  },
  {
    slug: 'maxSpeed',
    name: 'Максимальная скорость',
    level: 'Не изучено'
  },
  {
    slug: 'stop',
    name: 'Остановка',
    level: 'Не изучено'
  },
  {
    slug: 'tasks',
    name: 'Выполнение заданий',
    level: 'Не изучено'
  }
]


export default function AddStudent() {
  const router = useRouter()
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [surname, setSurname] = useState()
  const [phone, setPhone] = useState()
  const [group, setGroup] = useState()
  const [instructor, setInstructor] = useState(instructorsList[0])
  const [status, setStatus] = useState(statuses[0])
  const [quantityLessons, setQuantityLessons] = useState(0)
  const [theory, setTheory] = useState(false)
  const [theoryDate, setTheoryDate] = useState(null)
  const [firstDrive, setFirstDrive] = useState(null)
  const [secondDrive, setSecondDrive] = useState(null)
  const [thirdDrive, setThirdDrive] = useState(null)

  const onChangeTheoryDate = (date, dateString) => {
    setTheoryDate(dateString);
  }


  useEffect(() => {
    console.log('update')
  }, [status, instructor, firstName, lastName, surname, theory, firstDrive, secondDrive, thirdDrive]);
  // console.log(exams)
  return (
      <div className={'d-flex flex-column gap-2 px-1 items-center'}>
        <p>Введите данные ученика</p>
        <DefaultInput placeholder={'Фамилия'} setStateValue={setLastName} stateValue={lastName}/>
        <DefaultInput placeholder={'Имя'} setStateValue={setFirstName} stateValue={firstName}/>
        <DefaultInput placeholder={'Отчество'} setStateValue={setSurname} stateValue={surname}/>
        <PhoneNumberInput placeholder={'Номер телефона'} setStateValue={setPhone} stateValue={phone} />
        <div className={'d-flex flex-row gap-1 w-100'}>
          <TwoNumInput placeholder={'Номер группы'} setStateValue={setGroup} stateValue={group}/>
          <TwoNumInput placeholder={'Количество занятий'} setStateValue={setQuantityLessons} stateValue={quantityLessons}/>
        </div>
        <Select options={statuses} defaultValue={status}
                className={'w-100'}
                onChange={(value, option) => {
                  if ("label" in option) {
                    setStatus({value, label: option.label})
                  }
                }}
        />
        <Select options={instructorsList} defaultValue={instructor}
                className={'w-100'}
                onChange={(value, option) => {
                  if ("label" in option) {
                    setInstructor({ value, label: option.label})
                  }
                }}/>
        <div className={'w-100 d-flex items-center justify-content-around'}>
          <Checkbox onChange={(e) => {
            setTheory(e.target.checked)
            // exams[0].result = e.target.checked

          }}>Теория сдана</Checkbox>
          <Space direction="vertical">
            <DatePicker placeholder="Дата сдачи" onChange={onChangeTheoryDate} disabled={!theory} format={'DD/MM/YYYY'}/>
          </Space>
        </div>
        <div className={'w-100 d-flex flex-col items-center justify-content-around'}>
          Экзамены по вождению
          <AddDriveExams attempt={1} setDrive={setFirstDrive}/>
          <AddDriveExams attempt={2} setDrive={setSecondDrive}/>
          <AddDriveExams attempt={3} setDrive={setThirdDrive}/>
        </div>
        <Button type={'primary'} onClick={() => {
          const driveExamsArray = []
          if (firstDrive !== null) {
            driveExamsArray.push(firstDrive)
          }
          if (secondDrive !== null) {
            driveExamsArray.push(secondDrive)
          }
          if (thirdDrive !== null) {
            driveExamsArray.push(thirdDrive)
          }
          const data = {
            firstName,
            lastName,
            surname,
            phone,
            group: {
              number: Number(group),
              year: 2024
            },
            status,
            instructor,
            quantityPracticalLessons: Number(quantityLessons),
            exercise,
            exams: [
              {
                exam: 'theory',
                result : true,
                date: theoryDate
              },
              {
                exam: 'drive',
                result : false,
                dates: driveExamsArray
              }
            ],
            active: true
          }
          console.log(data)
          addStudent(data).then(res => {
            console.log(res)
            router.push('/students')
          })
        }}>Добавить ученика</Button>
      </div>
  );
}