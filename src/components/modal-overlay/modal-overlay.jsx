import React from "react";
import PropTypes from 'prop-types';
import overlayStyles from './modal-overlay.module.css';

export default function ModalOverlay ({onClick}) {
    return (
        <div className={overlayStyles.overlay} onClick={onClick}></div>
    )
}

ModalOverlay.propTypes = ({
    onClick: PropTypes.func
  })