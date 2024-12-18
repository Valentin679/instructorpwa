'use client'
import {Button, Input, Select} from "antd";
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
export default function AddStudent() {
  const router = useRouter()
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [surname, setSurname] = useState()
  const [phone, setPhone] = useState()
  const [group, setGroup] = useState()
  const [instructor, setInstructor] = useState('')
  const [status, setStatus] = useState(statuses[0])
  useEffect(() => {
  }, [status, instructor, firstName, lastName, surname]);
  return (
      <div className={'d-flex flex-column gap-1 px-1 items-center'}>
        <p>Введите данные ученика</p>
        {/*<TextInput onChangeText={(text)=>{setFirstName(text)}} placeholder={'Фамилия'}></TextInput>*/}
        <Input onChange={(text) => {
          setFirstName(text)
        }} placeholder={'Фамилия'}></Input>
        <Input onChange={(text) => {
          setLastName(text)
        }} placeholder={'Имя'}></Input>
        <Input onChange={(text) => {
          setSurname(text)
        }} placeholder={'Отчество'}></Input>
        <Input onChange={(text) => {
          setPhone('+7' + text)
        }} prefix={'+7'} minLength={10} maxLength={10} placeholder={'Номер телефона'}></Input>
        <Input onChange={(text) => {
          setGroup(text)
        }} maxLength={2} placeholder={'Номер группы'}></Input>

        <Select options={statuses} defaultValue={status}
                onChange={(value, option) => {
                  if ("label" in option) {
                    // @ts-ignore
                    setStatus({value, label: option.label})
                  }
                }}
        />
        <Select options={instructorsList} defaultValue={instructor}
                onChange={(value, option) => {
                  if ("label" in option) {
                    // @ts-ignore
                    setInstructor({ value, label: option.label})
                  }
                }}/>
        <Button onClick={() => {
          const data = {
            firstName,
            lastName,
            surname,
            phone,
            group,
            status,
            instructor,
            quantityPracticalLessons,
            exercise
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