import {BsFillPeopleFill} from "react-icons/bs";
import {FaTableList} from "react-icons/fa6";
import NavItem from "@/app/components/Nav/NavItem";
import {ImProfile} from "react-icons/im";
import {Tag} from "antd";

export default function EndTag({point}) {
    return (
        <Tag color={'#563e7c'}>{point}</Tag>
        // <div className={'bg-success text-primary px-2 py-0.5 rounded '}><p className={'text-sm'}>{point}</p></div>
    );
}



