import {Tag, Tooltip} from "antd";

export default function StartTag({point, date}) {

    return (
        // <div className={'border border-success px-2 py-0.5 rounded '}><p className={'text-sm'}>{point}</p></div>
        <Tooltip placement="topRight" title={date}>
            <Tag style={{marginInlineEnd: 0}} color="green">{point}</Tag>
        </Tooltip>
    );
}



