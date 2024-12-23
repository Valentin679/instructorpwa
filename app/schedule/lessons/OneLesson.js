import React, {useState} from 'react';
import {CaretRightOutlined, DeleteTwoTone, EditOutlined, EditTwoTone, MoreOutlined} from "@ant-design/icons";
import {deleteLesson} from "@/app/api/fetchLessons";
import styles from './lessons.module.css'

export default function OneLesson({update, setUpdate, lesson, success}) {
    const [moreActions, setMoreActions] = useState(false)
    const priorityExer = lesson.student.exercise.find(exer => exer.level === 'Часто требуется подсказка' ||
        exer.level === 'Ознакомлен')
    const nextExer = lesson.student.exercise.find(exer => exer.level === 'Не изучено')
    console.log(lesson)
    console.log(nextExer)
    return (
        <div
            className={'d-flex flex-row justify-between items-center py-2 '} key={lesson.time}>
            <div className={'d-flex flex-row gap-2'}>
                <div className={'d-flex flex-col  items-end'}>
                <p className={'text-3xl text-secondary'}>{lesson.time[0]}</p>
                <p className={'text-1xl text-secondary'}>{lesson.time[1]}</p>
                </div>
                <div className={'d-flex flex-col gap-0.5 py-1'}>
                    <div className={'d-flex flex-row justify-between'}>
                    <p className={'text-1xl '}>
                        {lesson.student.lastName + ' ' + lesson.student.firstName[0] + '.' + lesson.student.surname[0] + ' (' + lesson.student.group + ' гр.)'}
                    </p>
                    </div>
                    <p className={'text-sm text-info'}>{priorityExer.name} <CaretRightOutlined/> {nextExer.name}</p>
                </div>
            </div>
            <div className={'d-flex flex-row bg-light border rounded p-2 text-2x'}>
                <div className={`${moreActions ? styles.visibleMore : styles.hiddenMore} d-flex flex-row gap-3`}>
                    <EditTwoTone/>
                    <DeleteTwoTone twoToneColor="#e20707" onClick={() => {
                        deleteLesson(lesson._id).then(() => {
                            success('Занятие отменено')
                            update ? setUpdate(false) : setUpdate(true)
                        })
                    }}/>
                </div>
                <MoreOutlined onClick={() => {
                    moreActions ? setMoreActions(false) : setMoreActions(true)
                }}/>
            </div>
        </div>
    )
};
