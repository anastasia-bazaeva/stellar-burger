import React from "react";
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import constructStyles from './burger-constructor.module.css';
import kraterBun from '../../images/kratorbulka.svg'
import Modal from "../app/modal/modal";
import OrderDetails from "../app/order-details/order-details";


export default function BurgerConstructor ({data}) {
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false);

  const saucesAndFillingsData = data.filter((e) => e.type !== 'bun');
  const total = saucesAndFillingsData.reduce((acc, p) => acc + p.price, 0);

  const closeAllModals = () => {
    setIsOrderDetailsOpened(false);
  };

  const handleClick = () => {
    setIsOrderDetailsOpened(true);
  };
  
  const handleEscKeydown = (event) => {
    event.key === "Escape" && closeAllModals();
  };

  const modalsContainer = document.querySelector('#modals');

      return (
        <>
        <section className={`${constructStyles.order}`}>
          <div className={`${constructStyles.order__window} mt-25 pr-2`}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end'}}>
              <ConstructorElement
                type="top"
                isLocked={true}
                text="Краторная булка N-200i (верх)"
                price={200}
                thumbnail={kraterBun}
                key="top-constr"
              />{data && saucesAndFillingsData.map((ingredient)=> (
                <div className={constructStyles.drag}>
                <DragIcon key={`${ingredient._id}-icon`} type="primary"/>
                <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                key={ingredient._id}/>
                </div>
              ))}
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text="Краторная булка N-200i (низ)"
                price={200}
                thumbnail={kraterBun}
                key="bottom-constr"
              />
            </div>
          </div>
          <div className={`${constructStyles.order__panel} mb-5`}>
            <div className={constructStyles.order__info}>
              <h2 className="text text_type_digits-medium">{total}</h2>
              <CurrencyIcon type="primary" />
            </div>
            <Button type="primary" size="large" onClick={handleClick}>Оформить заказ</Button>
          </div>
        </section>
        {isOrderDetailsOpened &&
            <Modal
             onOverlayClick={closeAllModals}
             onEscKeydown={handleEscKeydown}
             modalsContainer={modalsContainer}
           >
            <OrderDetails total={total} closeAllModals={closeAllModals}/>
             </Modal>}
             </>
      );
    }
