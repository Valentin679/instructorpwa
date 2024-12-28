import GroupTag from "@/app/students/components/item-components/Tags/groupTag";
import GoodTag from "@/app/students/components/item-components/Tags/goodTag";
import ExamsBlock from "@/app/students/components/item-components/ExamsBlock";
import QuantityLessonsBlock from "@/app/students/components/item-components/QuantityLessonsBlock";


export default function StudentData({firstName, lastName, surname, group, exams, quantity}) {




    return (
        <div style={{flexDirection: 'column', gap: 10}}>
            <div className={'d-flex flex-row gap-1'}>
                <p>{lastName}</p>
                <p>{firstName}</p>
                <p>{surname}</p>
            </div>
            <div className={'d-flex flex-row gap-1'}>
               Экзамены: <ExamsBlock exams={exams}/>
            </div>
            <div>
                <p>Группа: <GroupTag group={group}/></p>
            </div>
            <div className={'d-flex flex-row gap-1'}>
                Занятия: <QuantityLessonsBlock quantity={quantity}/>
            </div>
        </div>
    );
}
