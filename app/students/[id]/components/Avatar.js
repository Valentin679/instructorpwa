import profilePic from "@/public/profile.jpg";
import Image from "next/image";


export default function Avatar() {




    return (
        <Image src={profilePic} alt={''}
               className={'w-25 h-100 object-cover'}/>

    );
}
