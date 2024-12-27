import GroupTag from "@/app/students/components/Tags/groupTag";
import GoodTag from "@/app/students/components/Tags/goodTag";


export default function StudentData({firstName, lastName, surname, group}) {




    return (
        <div style={{flexDirection: 'column', gap: 10}}>
            <div className={'d-flex flex-row gap-1'}>
                <p>{firstName}</p>
                <p>{lastName}</p>
                <p>{surname}</p>
                <GoodTag/>
            </div>
            <div>
                <p>Группа: <GroupTag group={group}/></p>
            </div>
        </div>
    );
}
