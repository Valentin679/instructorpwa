import {BsFillPeopleFill} from "react-icons/bs";
import {FaTableList} from "react-icons/fa6";
import NavItem from "@/app/components/Nav/NavItem";
import {ImProfile} from "react-icons/im";
import {Tag} from "antd";

export default function GoodTag({point}) {
    return (
        // <div className={'bg-success text-white px-2 py-0.5 rounded '}><p className={'text-sm'}>{point}</p></div>
        <Tag color="#87d068">{point}</Tag>
    );
}



