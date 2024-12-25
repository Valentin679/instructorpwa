import {Tag, Tooltip} from "antd";

export default function GroupTag({group}) {
    return (
        // <div className={'border border-success px-2 py-0.5 rounded '}><p className={'text-sm'}>{point}</p></div>
        <Tooltip title={group.year} color={'green'}>
            <Tag style={{marginInlineEnd: 0}} color="green">{group.number}</Tag>
        </Tooltip>
    );
}



