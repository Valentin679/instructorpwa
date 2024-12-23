import React, {useState} from 'react';
import {DeleteTwoTone, EditOutlined, EditTwoTone, MoreOutlined} from "@ant-design/icons";
import {deleteLesson} from "@/app/api/fetchLessons";
import styles from './lessons.module.css'

export default function OneLesson({update, setUpdate, lesson, success}) {
    const [moreActions, setMoreActions] = useState(false)
    console.log(lesson)
    return (
        <div
            className={'d-flex flex-row justify-between items-center py-2 text-2xl'} key={lesson.time}>
            <div className={'d-flex flex-row gap-1'}>
                <p>{lesson.time[0]}</p>
                <p>{lesson.student.lastName + ' ' + lesson.student.firstName[0]+ '.' + lesson.student.surname[0]+ '.'}</p>
            </div>
            <div className={'d-flex flex-row bg-light border rounded p-2 text-2x'}>
                <div className={`${moreActions ? styles.visibleMore : styles.hiddenMore} d-flex flex-row gap-3`}>
                    <EditTwoTone />
                    <DeleteTwoTone twoToneColor="#e20707"   onClick={() => {
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