import {Tag} from "antd";

export default function QuantityLessonsBlock({quantity}) {

    return (
        <p>{quantity <= 27 ?
            quantity + '/27' :
            quantity - 27 + ' ДП'
        }</p>
    );
}



