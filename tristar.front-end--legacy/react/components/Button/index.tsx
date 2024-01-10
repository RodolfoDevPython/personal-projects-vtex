import React from "react";

interface ButtonProps {
    isLoading?: boolean;
    onClick?: () => void;
    children?: any;
    disabled?: boolean;
}

import "./style.scss";

export function Button({ isLoading, onClick, children, disabled }: ButtonProps) {

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`doc-modal-button-tristar-default ${isLoading && "loading"}`}>
            {children}
        </button>
    )

}