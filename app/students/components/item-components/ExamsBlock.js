import React from 'react';
import GoodTag from "@/app/students/components/item-components/Tags/goodTag";
import StartTag from "@/app/students/components/item-components/Tags/startTag";
import {Tooltip} from "antd";
import BadTag from "@/app/students/components/item-components/Tags/badTag";

export default function ExamsBlock({exams}) {
    // console.log(exams)
    const theory = exams[0]
    const drive = exams[1]
    const driveExamsCount = drive.dates?.length
    const theoryExam = () => {
        if (theory.result) {
            return <Tooltip title={theory.date} color={'green'}>
                <GoodTag point={'Т'}/>
            </Tooltip>
        } else {
            return <StartTag point={'Т'}/>
        }
    }
    const driveExam = () => {
        if (theory.result && driveExamsCount === 0) {
            return <StartTag point={'В'}/>
        }
        if (driveExamsCount === 1) {
            return <BadTag point={'В'}/>

        }
        if (driveExamsCount === 2) {
            return <><BadTag point={'В'}/><BadTag point={'В'}/></>
        }

    }


return (
    <> {exams ?
        <div className={'d-flex flex-row gap-0.5'}>
            {theoryExam()}
            {/*{exams[0].result ?*/}
            {/*    <Tooltip title={exams[0].date} color={'green'}>*/}
            {/*        <GoodTag point={'Т'}/>*/}
            {/*    </Tooltip>*/}
            {/*    : <StartTag point={'Т'}/>}*/}
            {driveExam()}
            {/*{exams[0].result ?*/}
            {/*    !exams[1].result && exams[1].dates.length === 0 ? <StartTag point={'В'}/> :*/}
            {/*        exams[1].dates.length === 1 ?*/}
            {/*            <BadTag point={'В'}/> : exams[1].dates.length === 2 ?*/}
            {/*                <div><BadTag point={'В'}/> <BadTag point={'В'}/></div> : null :*/}
            {/*    null*/}
            {/*}*/}

        </div> :
        ''}
    </>
);
}
;