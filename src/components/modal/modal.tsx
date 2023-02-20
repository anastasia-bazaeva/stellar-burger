import ReactDOM from 'react-dom';
import React, { ReactElement, FC } from "react";
import PropTypes from 'prop-types';
import ModalOverlay from "../modal-overlay/modal-overlay";
import modalStyles from './modal.module.css';
import { useLocation } from 'react-router-dom';
import { ILocationState } from '../app/app';

interface IModal {
  onClose: () => void;
  children?: ReactElement | ReactElement[];
  isOrder?: boolean;
}

 const Modal: FC<IModal> = ({ onClose, children, isOrder }) => {
  const location = useLocation<ILocationState>();
  const modalsContainer = document.querySelector('#modals') as Element;

  const handleEscKeydown = (event: KeyboardEvent) => {
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
        <button className={`${isOrder ? `${modalStyles.button__order}` : `${modalStyles.button__product}`}`} onClick={onClose}></button>
        {children}
      </div>
      <ModalOverlay onClick={onClose} />
    </>,
    modalsContainer
  );
}

export default Modal