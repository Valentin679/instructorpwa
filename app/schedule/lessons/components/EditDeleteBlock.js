import React, {useState} from 'react';
import {Button, message, Space, Spin} from 'antd';
import {DeleteTwoTone, EditTwoTone} from "@ant-design/icons";
import {deleteLesson} from "@/app/api/fetchLessons";
import styles from './../lessons.module.css'
import {changeCountLesson} from "@/app/api/fetchOneStudent";

export default function EditDeleteBlock ({studentId, lessonId, quantityPracticalLessons, moreActions, success, update, setUpdate}) {
    return (
        <div className={`${moreActions ? styles.visibleMore : styles.hiddenMore} d-flex flex-col gap-3`}>
            <EditTwoTone/>
            <DeleteTwoTone twoToneColor="#e20707" onClick={() => {
                deleteLesson(lessonId).then(() => {
                    changeCountLesson(studentId, quantityPracticalLessons - 1).then(()=>{
                        success('Занятие отменено')
                        update ? setUpdate(false) : setUpdate(true)
                    })

                })
            }}/>
        </div>
    );
};