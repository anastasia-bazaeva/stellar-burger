import React from "react";
import PropTypes from 'prop-types';

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import constructStyles from './burger-constructor.module.css';
import kraterBun from '../../images/kratorbulka.svg'
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import orderStyles from '../../components/order-details/order-details.module.css';
import nutritionStyles from '../ingredient-info/ingredient-info.module.css';
import donePic from '../../images/done.svg';


export default function BurgerConstructor ({data}) {
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false);
  const [orderNumber, setOrderNumber] = React.useState(0);

  const saucesAndFillingsData = data.filter((e) => e.type !== 'bun');
  const total = saucesAndFillingsData.reduce((acc, p) => acc + p.price, 400);

  const closeAllModals = () => {
    setIsOrderDetailsOpened(false);
  };

  const handleClick = () => {
    setIsOrderDetailsOpened(true);
    setOrderNumber(Math.floor(Math.random() * 999999));
  };
  
  const handleEscKeydown = (event) => {
    event.key === "Escape" && closeAllModals();
  };

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
            <Button type="primary" size="large" onClick={handleClick} htmlType={"submit"}>Оформить заказ</Button>
          </div>
        </section>
        {isOrderDetailsOpened &&
            <Modal
             onOverlayClick={closeAllModals}
             onEscKeydown={handleEscKeydown}
             isOrder={true}
           >
            <div className={orderStyles.order}>
              <div className={orderStyles.info}>
                  <h2 className={`${orderStyles.digits} text text_type_digits-large`}>{orderNumber}</h2>
                  <p className={`${orderStyles.text} text text_type_main-medium`}>Идентификатор заказа</p>
              </div>
              <img src={donePic} alt='Галочка'/>
              <div className={orderStyles.spanArea}>
                  <span className={`${orderStyles.text} text text_type_main-default`}>Ваш заказ уже начали готовить</span>
                  <span className={`${orderStyles.text} text text_type_main-default text_color_inactive`}>Дождитесь готовности на орбитальной станции</span>
              </div>
            </div>
             </Modal>}
             </>
      );
    }
BurgerConstructor.propTypes = ({
  type: PropTypes.string,
  isLocked: PropTypes.bool,
  text: PropTypes.string, 
  price: PropTypes.number,
  thumbnail: PropTypes.any,
  key: PropTypes.any,
  onOverlayClick: PropTypes.func,
  onEscKeydown: PropTypes.func,
  isOrder: PropTypes.bool,
  src: PropTypes.any
})