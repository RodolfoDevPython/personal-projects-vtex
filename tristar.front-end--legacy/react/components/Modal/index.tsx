import React from 'react';
import Modal from 'react-modal';

// import closeImg from "../../assets/close.svg";
import "./style.scss";

interface ModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    tristarState: {
        step: number
    };
    statesProps: any
}

import {
    // ModalStep1,
    ModalStep2,
    ModalStepFormLogin,
    ModalStepFormUpload,
    ModalStepFinish,
    ModalStepRegister,
} from '../ModalSteps'

Modal.setAppElement('#documentation-modal-root');

export function ModalComponent({ isOpen, onRequestClose, tristarState, statesProps }: ModalProps) {

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Example Modal"
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button
                onClick={onRequestClose}
                className="react-modal-close"
            >
                <svg width='9' height='9' viewBox='0 0 9 9' fill='none' xmlns='http://www.w3.org/2000/svg'><rect y='1.5' width='2.12132' height='10.6066' rx='1.06066' transform='rotate(-45 0 1.5)' fill='#EA212C' /><rect width='2.12132' height='10.6066' rx='1.06066' transform='matrix(-0.707107 -0.707107 -0.707107 0.707107 9 1.5)' fill='#EA212C' /></svg>

            </button>

            {/* {tristarState.step === 1 && <ModalStep1 {...statesProps} />} */}

            {tristarState.step === 1 && <ModalStepFormLogin {...statesProps} />}

            {tristarState.step === 3 && <ModalStepFormUpload {...statesProps} />}

            {tristarState.step === 6 && <ModalStepRegister {...statesProps} />}

            {tristarState.step === 4 && <ModalStepFinish {...statesProps} />}

            {tristarState.step === 5 && <ModalStep2 {...statesProps} />}


        </Modal>
    )
}