import React, { useRef } from "react";
import PropTypes from 'prop-types';
import { useDrop } from "react-dnd";
import { nanoid } from "@reduxjs/toolkit";

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import constructStyles from './burger-constructor.module.css';
import Modal from "../modal/modal";
import orderStyles from '../../components/order-details/order-details.module.css';
import donePic from '../../images/done.svg';
import {getOrderNumber} from '../utils';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, addItemPrice, clearOrder, createOrder, deleteItem, getOrder, removeItemPrice, setBun, setOrderNumber } from "../services/reducers/reducers";
import ConstructorItem from "../constructor-item/constructor-item";


export default function BurgerConstructor ({onDropHandler}) {
  const { priceState, constructorIngredients, orderList, orderNumber, selectedBun } = useSelector(state => state.reducerConstructor);
  const ingredients = useSelector(state => state.reducerIngredients.ingredientsData);
  //const defaultBun = useSelector(state => state.reducerIngredients.defaultBun);
  const dispatch = useDispatch();
  //const ingredientsData = React.useContext(BurgerIngredientsContext);
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false);
  //const [orderNumber, setOrderNumber] = React.useState(0);
  //const {priceState, priceDispatcher} = React.useContext(PriceContext);

  //  const handleDrop = (item) => {
  //   if (item.type === "bun") {
  //     dispatch(setBun(item))
  //   }
  //   dispatch(addItem(item));
  //   dispatch(addItemPrice(item.price))
  // };

  const [{isHover, canDrop}, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      dispatch(
        item.type !== "bun"?
        addItem(item)
        :setBun(item)
      );
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  const borderColor = (isHover && canDrop) ? constructStyles.order__box : constructStyles.order;

  const saucesAndFillingsData = React.useMemo(() => 
  constructorIngredients?.filter((e) => e.type !== 'bun'),
     [constructorIngredients]); 
     //посмотреть потом, зачем я тут фильтрую. Во второй части проекта там уже вроде есть логика и нет булочек

  // const getIngredientList = () => {
  //   const orderObj = { "ingredients": orderList };
  //   const bunId = selectedBun?._id; 
  //     dispatch(createOrder([
  //       bunId, 
  //       ...constructorIngredients.map(item => item._id),
  //       bunId]))
  //   console.log(orderList);
  //     return orderObj
  // }

  // const getOrderIds = React.useMemo(() =>{
  //     getIngredientList();
  //     console.log(getIngredientList());
  //   },[ingredients])

  const getTotal = React.useMemo(() =>{
      return priceState + selectedBun?.price*2;
    },[priceState, selectedBun])

  // const ingredientArr = [];
  // const orderObj = { "ingredients": orderList };

  // const getOrderIds = React.useMemo(() =>{
  //   getIngredientList();
  //   console.log(orderObj);
  // },[constructorIngredients, isOrderDetailsOpened])

  const closeAllModals = () => {
    setIsOrderDetailsOpened(false);
  };

  const getOrderInfo = () => {
    dispatch(getOrder(
            selectedBun._id, 
            ...constructorIngredients.map(item => item._id),
            selectedBun._id 
            ))
    .then(res => {
      res.payload.success && setIsOrderDetailsOpened(true);
      dispatch(clearOrder())
    })
    .catch(e => console.log(`При загрузке данных по заказу что-то пошло не так: ${e}`))
    // try {
    //   await getOrderNumber(getIngredientList())
    //   .then((data)=> {
    //     setOrderNumber(data.order.number)
    //   console.log(data)})
    //   console.log('Данные по заказу загружены')
    // }
    // catch (e) {
    //   console.log(`При загрузке данных по заказу что-то пошло не так: ${e}`)
    // }
  }

  const handleClose = (uid, price) => {
    dispatch(deleteItem(uid));
    dispatch(removeItemPrice(price))
  }

  const handleClick = () => {
    getOrderInfo();
    //setIsOrderDetailsOpened(true)
  };  

  const isScroll = (!selectedBun && priceState === 0) ? constructStyles.order : constructStyles.order__window;

  // React.useEffect(()=>{
  //   dispatch(setBun(defaultBun))
  // },[])


      return (
        <>
        <section className={borderColor}>
          <div ref={dropTarget} className={`${isScroll} mt-25 pr-2`}>
            {(!selectedBun && priceState === 0)? <div className={`${constructStyles.order__note} text text_type_main-large mt-25`}>Добавьте что-нибудь в заказ</div>
            :<div className={constructStyles.order__content}>
            {selectedBun && <ConstructorElement
                type="top"
                isLocked={true}
                text={selectedBun?.name}
                price={selectedBun?.price}
                thumbnail={selectedBun?.image}
                key="top-constr"
              />}{constructorIngredients && saucesAndFillingsData?.map((item, index)=> (
                <ConstructorItem
                key={item.uid}
                ingredient={item}
                index={index}
                handleClose={handleClose}
                />
              ))}
              {selectedBun && <ConstructorElement
                type="bottom"
                isLocked={true}
                text={selectedBun?.name}
                price={selectedBun?.price}
                thumbnail={selectedBun?.image}
                key="bottom-constr"
              />}
            </div>}
          </div>
          <div className={`${constructStyles.order__panel} mb-5`}>
            <div className={constructStyles.order__info}>
              <h2 className="text text_type_digits-medium">{selectedBun? getTotal : priceState}</h2>
              <CurrencyIcon type="primary" />
            </div>
            {selectedBun? <Button type="primary" size="large" onClick={handleClick} htmlType={"submit"}>Оформить заказ</Button>
            :<div className={`${constructStyles.order__panel} text text_type_main-default`}>Как только вы выберете булочку,<br></br> заказ можно будет оформить</div>}
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