import React from 'react';
import {CaretRightOutlined} from "@ant-design/icons";

export default function ExerBlock ({exercise}) {
    const priorityExer = exercise.find(exer => exer.level === 'Часто требуется подсказка' ||
        exer.level === 'Ознакомлен')
    const nextExer = exercise.find(exer => exer.level === 'Не изучено')
    return (
        <p className={'text-sm text-info max-w-80'}>{priorityExer.name}
            <CaretRightOutlined/> {nextExer.name}</p>
    );
};