import ReactDOM from 'react-dom';
import React from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";
import modalStyles from './modal.module.css';


export default function Modal ({ title, onOverlayClick, onEscKeydown, children, modalsContainer }) {

  React.useEffect(() => {
    document.addEventListener('keydown', onEscKeydown);

    return () => {
      document.removeEventListener('keydown', onEscKeydown);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={modalStyles.window}>
        <div className={modalStyles.container}>
        <h3>{title}</h3> 
        {children}
        </div>
      </div>
      <ModalOverlay onClick={onOverlayClick} />
    </>,
    modalsContainer
  );
}