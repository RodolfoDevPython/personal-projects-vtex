import React from "react";

interface InputProps {
    onChange: any;
    value: any;
    label: string;
    error: boolean;
}

import "./style.scss";

export function Input({ onChange, value, label, error }: InputProps) {

    return (
        <label htmlFor="" className={`doc-modal-input-tristar-default ${error && "error"}`} >
            <span>{label}</span>
            <input
                type="text"
                value={value}
                onChange={onChange}
            />
        </label>

    )
}