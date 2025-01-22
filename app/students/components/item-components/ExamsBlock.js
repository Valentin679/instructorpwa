import React, {useContext, useState} from 'react';
import GoodTag from "@/app/students/components/item-components/Tags/goodTag";
import StartTag from "@/app/students/components/item-components/Tags/startTag";
import {Tooltip} from "antd";
import BadTag from "@/app/students/components/item-components/Tags/badTag";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {ifAfterOfDate} from "@/app/functions/beforeOfAfterDate";

dayjs.extend(customParseFormat);

// узнавать сегодняшнюю дату и сравнивать с датой последней записи
// если запись есть больше сегодняшней даты, то добавлять старттег


export default function ExamsBlock({exams}) {
    const [lastExamResult, setLastExamResult] = useState()
    const theory = exams[0]
    const drive = exams[1]
    const driveExamsCount = drive.dates?.length
    function checkDateLastExamOfNow() {
        ifAfterOfDate(res.date)
    }
    const theoryExam = () => {
        if (theory.result) {
            return <Tooltip title={theory.date} color={'green'}>
                <GoodTag point={'Т'} date={theory.date}/>
            </Tooltip>
        } else {
            return <StartTag point={'Т'} date={theory.date}/>
        }
    }
    const driveExam = () => {
        if (theory.result && driveExamsCount === 0) {
            return
        }
        if (driveExamsCount === 1 && drive.result === false) {
            if(dayjs().isBefore(drive.dates[0])){
                return <StartTag point={'В'} date={drive.dates[0]}/>
            }else {
            return <BadTag point={'В'} date={drive.dates[0]}/>
            }
        }
        if (driveExamsCount === 1 && drive.result === true) {
            return <GoodTag point={'В'} date={drive.dates[0]}/>
        }
        if (driveExamsCount === 2 && drive.result === false) {
            if(dayjs().isBefore(drive.dates[1])){
                return <>
                    <BadTag point={'В'} date={drive.dates[0]}/>
                    <BadTag point={'В'} date={drive.dates[1]}/>
                </>

            }else {
                return <>
                    <BadTag point={'В'} date={drive.dates[0]}/>
                    <StartTag point={'В'} date={drive.dates[1]}/>
                </>
            }
        }
        if (driveExamsCount === 2 && drive.result === true) {
            return <>
                <BadTag point={'В'} date={drive.dates[0]}/>
                <GoodTag point={'В'} date={drive.dates[1]}/>
             </>
        }
        if (driveExamsCount === 3 && drive.result === false) {
            let examDate = dayjs(drive.dates[2], 'DD/MM/YYYY')
            if(dayjs().isAfter(examDate)){
                return <>
                    <BadTag point={'В'} date={drive.dates[0]}/>
                    <BadTag point={'В'} date={drive.dates[1]}/>
                    <BadTag point={'В'} date={drive.dates[2]}/>
                </>
            }else {
                return <>
                    <BadTag point={'В'} date={drive.dates[0]}/>
                    <BadTag point={'В'} date={drive.dates[1]}/>
                    <StartTag point={'В'} date={drive.dates[2]}/>
                </>
            }
        }
        if (driveExamsCount === 3 && drive.result === true) {
            return <>
                <BadTag point={'В'} date={drive.dates[0]}/>
                <BadTag point={'В'} date={drive.dates[1]}/>
                <GoodTag point={'В'} date={drive.dates[2]}/>
            </>
        }
    }


return (
    <> {exams ?
        <div className={'d-flex flex-row gap-0.5'}>
            {theoryExam()}
            {driveExam()}

        </div> :
        ''}
    </>
);
}
;