import React from 'react';
import {CaretRightOutlined} from "@ant-design/icons";

export default function ExerBlock ({exercise}) {

    const goodExerc = exercise.find(exer => exer.level === 'Часто требуется подсказка' ||
        exer.level === 'Изредка требуется подсказка')
    const nextExerc = exercise.find(exer => exer.level === 'Ознакомлен' ||
        exer.level === 'Не изучено')
    return (
        <div className={'d-flex flex-row gap-1'}>
            <p style={{fontSize: 15, color: 'green'}}>{goodExerc === undefined ? '' : goodExerc.name}</p>
            <p> {goodExerc === undefined ? '' : <CaretRightOutlined/>} </p>
            <p style={{fontSize: 15, color: 'purple'}}>{nextExerc.name}</p>
        </div>
    );
};