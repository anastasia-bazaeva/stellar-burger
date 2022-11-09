import ReactDOM from 'react-dom';
import React from "react";
import PropTypes from 'prop-types';
import ModalOverlay from "../modal-overlay/modal-overlay";
import modalStyles from './modal.module.css';


export default function Modal ({ onClose, children, isOrder }) {
  const modalsContainer = document.querySelector('#modals');

  const handleEscKeydown = (event) => {
      event.key === "Escape" && onClose();
    }

  React.useEffect(() => {
    document.addEventListener('keydown', handleEscKeydown);

    return () => {
      document.removeEventListener('keydown', handleEscKeydown);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={modalStyles.window}>
      <button className={`${isOrder? `${modalStyles.button__order}` : `${modalStyles.button__product}`}`} onClick={onClose}></button>
        {children}
      </div>
      <ModalOverlay onClick={onClose} />
    </>,
    modalsContainer
  );
}

Modal.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.any,
  isOrder: PropTypes.bool
}