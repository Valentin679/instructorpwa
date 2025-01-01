import Image from "next/image";
import profilePic from "@/public/profile.jpg";

export default function Profile() {


    return (
        <div className={''}>
            <div className={'d-flex flex-row gap-3'}>
                <Image src={profilePic} alt={''}
                       className={'w-25 h-100 object-cover'}/>
                <div className={'d-flex flex-col gap-1'}>
                  <p>ФИО</p>
                  <p>Авто: </p>
                  <p>Наработка: ч\руб </p>
                  <p>След. экзамен</p>
                </div>
            </div>
        </div>

    );
}
