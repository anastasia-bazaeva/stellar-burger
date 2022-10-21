import React from "react";
import PropTypes from 'prop-types';

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import constructStyles from './burger-constructor.module.css';
import kraterBun from '../../images/kratorbulka.svg'
import Modal from "../modal/modal";
import orderStyles from '../../components/order-details/order-details.module.css';
import donePic from '../../images/done.svg';
import BurgerIngredientsContext from "../../context/burgerIngredientsContext";
import PriceContext from "../../context/burger-price-context";
import {getOrderNumber} from '../utils';


export default function BurgerConstructor () {
  const ingredientsData = React.useContext(BurgerIngredientsContext);
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false);
  const [orderNumber, setOrderNumber] = React.useState(0);
  const {priceState, priceDispatcher} = React.useContext(PriceContext);

  const saucesAndFillingsData = React.useMemo(() => 
    ingredientsData?.filter((e) => e.type !== 'bun'),
     [ingredientsData]); 

  const total = React.useMemo(()=> 
    saucesAndFillingsData.reduce((acc, p) => acc + p.price, 1255*2),
      [saucesAndFillingsData]);

  const ingredientArr = [];
  const orderList = { "ingredients": ingredientArr };

  const getOrderIds = React.useMemo(() =>{
    ingredientsData.forEach((ingredient) => {
      ingredientArr.push(ingredient._id);
    });
    console.log(orderList);
  },[ingredientsData, isOrderDetailsOpened])

  const closeAllModals = () => {
    setIsOrderDetailsOpened(false);
  };

  const getOrderInfo = async () => {
    try {
      await getOrderNumber(orderList)
      .then((data)=> {
        setOrderNumber(data.order.number)
      console.log(data)})
      console.log('Данные по заказу загружены')
    }
    catch (e) {
      console.log(`При загрузке данных с сервера по заказу что-то пошло не так: ${e}`)
    }
  }


  const handleClick = () => {
    getOrderInfo()
    .then(() => setIsOrderDetailsOpened(true))
  };  

  React.useEffect(()=>{
    priceDispatcher({type: 'item', price: total});
    console.log(orderList)
  },[total])

      return (
        <>
        <section className={`${constructStyles.order}`}>
          <div className={`${constructStyles.order__window} mt-25 pr-2`}>
            <div className={constructStyles.order__content}>
              <ConstructorElement
                type="top"
                isLocked={true}
                text="Краторная булка N-200i (верх)"
                price={1255}
                thumbnail={kraterBun}
                key="top-constr"
              />{ingredientsData && saucesAndFillingsData.map((ingredient)=> (
                <div key={ingredient._id} className={constructStyles.drag}>
                <DragIcon key={`${ingredient._id}-icon`} type="primary"/>
                <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}/>
                </div>
              ))}
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text="Краторная булка N-200i (низ)"
                price={1255}
                thumbnail={kraterBun}
                key="bottom-constr"
              />
            </div>
          </div>
          <div className={`${constructStyles.order__panel} mb-5`}>
            <div className={constructStyles.order__info}>
              <h2 className="text text_type_digits-medium">{priceState.totalPrice}</h2>
              <CurrencyIcon type="primary" />
            </div>
            <Button type="primary" size="large" onClick={handleClick} htmlType={"submit"}>Оформить заказ</Button>
          </div>
        </section>
        {isOrderDetailsOpened &&
            <Modal
             onOverlayClick={closeAllModals}
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
  isOrder: PropTypes.bool,
  src: PropTypes.any
})