import ReactDOM from 'react-dom';
import React from "react";
import PropTypes from 'prop-types';
import ModalOverlay from "../modal-overlay/modal-overlay";
import modalStyles from './modal.module.css';


export default function Modal ({ onOverlayClick, onEscKeydown, children, isOrder }) {
  const modalsContainer = document.querySelector('#modals');
  React.useEffect(() => {
    document.addEventListener('keydown', onEscKeydown);

    return () => {
      document.removeEventListener('keydown', onEscKeydown);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={modalStyles.window}>
      <button className={`${isOrder? `${modalStyles.button__order}` : `${modalStyles.button__product}`}`} onClick={onOverlayClick}></button>
        {children}
      </div>
      <ModalOverlay onClick={onOverlayClick} />
    </>,
    modalsContainer
  );
}

Modal.propsTypes = {
  onClick: PropTypes.func
}