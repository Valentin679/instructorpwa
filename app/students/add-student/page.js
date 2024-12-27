'use client'
import {Button, Checkbox, DatePicker, Input, Select, Space} from "antd";
import {useEffect, useState} from "react";
import {addStudent} from "@/app/api/fetchStudents";
import { useRouter } from 'next/navigation'

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
    level: 'Полностью освоен'
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
const quantityPracticalLessons = 0

let exams = [
  {
    exam: 'theory',
    result : false,
    date: ''
  },
  {
    exam: 'drive',
    result : false,
    dates: []
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
  const [theory, setTheory] = useState(false)

  const onChangeTheoryDate = (date, dateString) => {
    console.log(
        // date,
        dateString);
    const jsdate = new Date(dateString)
    console.log('js- ' + dateString)
  }


  useEffect(() => {
  }, [status, instructor, firstName, lastName, surname, theory]);
  console.log(exams)
  return (
      <div className={'d-flex flex-column gap-2 px-1 items-center'}>
        <p>Введите данные ученика</p>
        {/*<TextInput onChangeText={(text)=>{setFirstName(text)}} placeholder={'Фамилия'}></TextInput>*/}
        <Input onChange={(e) => {
          setLastName(e.target.value)
        }} placeholder={'Фамилия'}></Input>
        <Input onChange={(e) => {
          setFirstName(e.target.value)
        }} placeholder={'Имя'}></Input>
        <Input onChange={(e) => {
          setSurname(e.target.value)
        }} placeholder={'Отчество'}></Input>
        <Input onChange={(e) => {
          setPhone('+7' + e.target.value)
        }} prefix={'+7'} minLength={10} maxLength={10} placeholder={'Номер телефона'}></Input>
        <Input onChange={(e) => {
          setGroup(e.target.value)
        }} maxLength={2} placeholder={'Номер группы'}></Input>

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
            exams[0].result = e.target.checked

          }}>Теория сдана</Checkbox>
          <Space direction="vertical">
            <DatePicker placeholder="Дата сдачи" onChange={onChangeTheoryDate} disabled={!exams[0].result} />
          </Space>
        </div>
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
          addStudent(data).then(res => {
            console.log(res)
            router.push('/students')
          })
        }}>Добавить ученика</Button>
      </div>
  );
}