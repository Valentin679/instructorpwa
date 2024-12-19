import {BsFillPeopleFill} from "react-icons/bs";
import {FaTableList} from "react-icons/fa6";
import NavItem from "@/app/components/Nav/NavItem";
import {ImProfile} from "react-icons/im";
import {Tag} from "antd";

export default function StartTag({point}) {
    return (
        // <div className={'border border-success px-2 py-0.5 rounded '}><p className={'text-sm'}>{point}</p></div>
        <Tag color="green">{point}</Tag>
    );
}



