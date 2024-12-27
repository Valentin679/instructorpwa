import React from 'react';
import {Tag} from "antd";

export default function QuantityLessonsBlock({quantity}) {
    return (
        <>
            {
                quantity < 27 ?
                    <Tag color="#108ee9">{quantity + 1}/27</Tag> : quantity === 27 ?
                        <Tag color="#5d0081">1 ДП</Tag> :
                        <Tag color="#5d0081">{quantity - 27} ДП</Tag>
            }
            </>
    );
};