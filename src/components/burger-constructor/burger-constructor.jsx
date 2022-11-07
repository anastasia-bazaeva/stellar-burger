import React from "react";
import PropTypes from 'prop-types';

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
import { addBunPrice, createOrder, deleteItem, getOrder, removeItemPrice, setBun, setOrderNumber } from "../services/reducers/reducers";


export default function BurgerConstructor () {
  const { priceState, constructorIngredients, orderList, orderNumber, selectedBun } = useSelector(state => state.reducerConstructor);
  const ingredients = useSelector(state => state.reducerIngredients.ingredientsData);
  const defaultBun = useSelector(state => state.reducerIngredients.defaultBun);
  const dispatch = useDispatch();
  //const ingredientsData = React.useContext(BurgerIngredientsContext);
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false);
  //const [orderNumber, setOrderNumber] = React.useState(0);
  //const {priceState, priceDispatcher} = React.useContext(PriceContext);

  const saucesAndFillingsData = React.useMemo(() => 
  constructorIngredients?.filter((e) => e.type !== 'bun'),
     [constructorIngredients]); 

  const getIngredientList = () => {
    const orderObj = { "ingredients": orderList };
      dispatch(createOrder([
        selectedBun._id, 
        ...constructorIngredients.map(item => item._id),
        selectedBun._id]))
    console.log(orderList);
      return orderObj
  }

  // const getOrderIds = React.useMemo(() =>{
  //     getIngredientList();
  //     console.log(getIngredientList());
  //   },[ingredients])

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
    dispatch(getOrder(getIngredientList()))
    // try {
    //   await getOrderNumber(getIngredientList())
    //   .then((data)=> {
    //     setOrderNumber(data.order.number)
    //   console.log(data)})
    //   console.log('Данные по заказу загружены')
    // }
    // catch (e) {
    //   console.log(`При загрузке данных с сервера по заказу что-то пошло не так: ${e}`)
    // }
  }

  const handleClose = (id, price) => {
    dispatch(deleteItem(id));
    dispatch(removeItemPrice(price))
  }

  const handleClick = () => {
    getOrderInfo();
    setIsOrderDetailsOpened(true)
    console.log('CLICK')
  };  

  React.useEffect(()=>{
    dispatch(setBun(defaultBun))
  },[])

      return (
        <>
        <section className={`${constructStyles.order}`}>
          <div className={`${constructStyles.order__window} mt-25 pr-2`}>
            <div className={constructStyles.order__content}>
              <ConstructorElement
                type="top"
                isLocked={true}
                text={selectedBun?.name}
                price={selectedBun?.price}
                thumbnail={selectedBun?.image}
                key="top-constr"
              />{constructorIngredients && saucesAndFillingsData.map((ingredient)=> (
                <div key={ingredient._id} className={constructStyles.drag}>
                <DragIcon key={`${ingredient._id}-icon`} type="primary"/>
                <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={()=> handleClose(ingredient._id, ingredient.price)}/>
                </div>
              ))}
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={selectedBun?.name}
                price={selectedBun?.price}
                thumbnail={selectedBun?.image}
                key="bottom-constr"
              />
            </div>
          </div>
          <div className={`${constructStyles.order__panel} mb-5`}>
            <div className={constructStyles.order__info}>
              <h2 className="text text_type_digits-medium">{priceState}</h2>
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