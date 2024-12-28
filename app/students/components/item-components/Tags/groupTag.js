import {Tag, Tooltip} from "antd";

export default function GroupTag({group}) {
    return (

        <Tooltip title={group.year} color={'green'}>
            <Tag style={{marginInlineEnd: 0}} color="green">{group.number}</Tag>
        </Tooltip>
    );
}



