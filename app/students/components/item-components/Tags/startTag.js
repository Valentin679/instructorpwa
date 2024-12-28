import {Tag} from "antd";

export default function StartTag({point}) {

    return (
        // <div className={'border border-success px-2 py-0.5 rounded '}><p className={'text-sm'}>{point}</p></div>
        <Tag style={{marginInlineEnd: 0}} color="green">{point}</Tag>
    );
}



