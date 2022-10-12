import React from "react";
import overlayStyles from './modal-overlay.module.css';

export default function ModalOverlay ({onClick}) {
    return (
        <div className={overlayStyles.overlay} onClick={onClick}>Это оверлей</div>
    )
}