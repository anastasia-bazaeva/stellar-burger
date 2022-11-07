import React from "react";
import PropTypes from 'prop-types';
import { useDrag } from "react-dnd";

import menuStyles from '../burger-ingredients/burger-ingredients.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../modal/modal";
import IngredientInfo from "../ingredient-info/ingredient-info";
import { useSelector, useDispatch } from 'react-redux';
import { addBunPrice, addItem, addItemPrice, deleteItem, removeBunCount, removeBunPrice, setBun } from "../services/reducers/reducers";

export default function Ingredient ({productInfo}) {

  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false);
  const { priceState, constructorIngredients, selectedBun, count } = useSelector( state => state.reducerConstructor);
  const dispatch = useDispatch();
  const [counter, setCounter] = React.useState(null);
  //const id = productInfo._id; 

  const [{isDrag}, dragRef] = useDrag({
    type: "ingredient",
    item: productInfo,
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  let number = 0;

  // React.useEffect(()=>{
  //   return ()=>{
  //       document.removeEventListener('click', handleClick);
  //   }
  // })

  const showCounter = (productInfo) => {
    if (selectedBun && productInfo === selectedBun) {
      number = 2;
    } 
    number = count.filter(item => item === productInfo._id).length;
    // if (productInfo.type === "bun"){
    //   return number + 1;
    // }
    return number;
  }

  const closeAllModals = () => {
    setIsOrderDetailsOpened(false);
  };

  const handleClick = (productInfo, price) => {
    if (productInfo.type === "bun") {
      dispatch(setBun(productInfo));
      //dispatch(addBunPrice(productInfo.price))
      //showCounter(productInfo)
    } else {
      setIsOrderDetailsOpened(true);
      dispatch(addItem(productInfo));
      dispatch(addItemPrice(price));
      //showCounter(productInfo);
      // if (counter) {
      //   setCounter(counter + 1);
      // }
      // else {
      //   setCounter(1);
    // }
    }
    // console.log(counter)
  };

  // React.useEffect(()=>{
  //   showCounter(productInfo)
  // },[])
    
    return (
      !isDrag &&
        <>
        <li ref={dragRef} className={menuStyles.card} id='card' onClick={() => handleClick(productInfo, productInfo.price, productInfo._id)}>
            <div>
            {(showCounter(productInfo) > 0)?
            <Counter count={showCounter(productInfo)} size="default" />
            :<></>}
            </div>
            <img src={productInfo.image} alt={productInfo.name}/>
            <div className={menuStyles.span_area}>
                    <span className={`${menuStyles.title} text text_type_digits-default`}>{productInfo.price}</span>
                    <CurrencyIcon type="primary" />
            </div>
            <p className={`${menuStyles.product__name} text text_type_main-default`}>{productInfo.name}</p>
        </li>
        {isOrderDetailsOpened &&
            <Modal
             onOverlayClick={closeAllModals}
             isOrder={false}
           >
             <IngredientInfo productInfo={productInfo}/>
             </Modal>}
             </>
    )
}

Ingredient.propTypes = ({
  count: PropTypes.number,
  src: PropTypes.any,
  onOverlayClick: PropTypes.func,
  isOrder: PropTypes.bool,
})