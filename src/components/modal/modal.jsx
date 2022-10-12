import ReactDOM from 'react-dom';
import React from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";
import modalStyles from './modal.module.css';


export default function Modal ({ onOverlayClick, onEscKeydown, children }) {
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
        {children}
      </div>
      <ModalOverlay onClick={onOverlayClick} />
    </>,
    modalsContainer
  );
}