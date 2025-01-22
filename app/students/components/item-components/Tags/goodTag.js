import {BsFillPeopleFill} from "react-icons/bs";
import {FaTableList} from "react-icons/fa6";
import NavItem from "@/app/components/Nav/NavItem";
import {ImProfile} from "react-icons/im";
import {Tag, Tooltip} from "antd";

export default function GoodTag({point, date}) {
    return (
        // <div className={'bg-success text-white px-2 py-0.5 rounded '}><p className={'text-sm'}>{point}</p></div>
        <Tooltip placement="topRight" title={date}>
            <Tag style={{marginInlineEnd: 0}} color="#87d068">{point}</Tag>
        </Tooltip>
    );
}



