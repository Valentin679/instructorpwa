import React, {useState} from 'react';
import {Checkbox, DatePicker, Input, Space} from "antd";

export default function DefaultInput ({setStateValue, stateValue, placeholder}) {

    return (
        <Input onChange={(e) => {
            setStateValue(e.target.value)
        }} placeholder={placeholder} status={stateValue ? "" : "error"}></Input>
    );
};