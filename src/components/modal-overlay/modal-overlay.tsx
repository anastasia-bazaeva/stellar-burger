import React, { FC, MouseEventHandler } from "react";
import PropTypes from 'prop-types';
import overlayStyles from './modal-overlay.module.css';

interface IModalOverlay {
    onClick: () => void
}

const ModalOverlay: FC<IModalOverlay> = ({ onClick }) => {
    return (
        <div className={overlayStyles.overlay} onClick={onClick}></div>
    )
}
export default ModalOverlay