import React from "react";
import PropTypes from 'prop-types';

import menuStyles from '../burger-ingredients/burger-ingredients.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../modal/modal";
import IngredientInfo from "../ingredient-info/ingredient-info";
import { useSelector, useDispatch } from 'react-redux';
import { addBunPrice, addItem, addItemPrice, removeBunPrice, setBun } from "../services/reducers/reducers";

export default function Ingredient ({productInfo}) {

  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false);
  const { priceState, constructorIngredients, selectedBun } = useSelector( state => state.reducerConstructor);
  const dispatch = useDispatch();
  const [counter, setCounter] = React.useState(null);

  // React.useEffect(()=>{
  //   return ()=>{
  //       document.removeEventListener('click', handleClick);
  //   }
  // })

  const closeAllModals = () => {
    setIsOrderDetailsOpened(false);
  };

  const handleClick = (productInfo, price, id) => {
    if (productInfo.type === "bun") {
      dispatch(removeBunPrice(selectedBun.price))
      dispatch(setBun(productInfo));
      dispatch(addBunPrice(productInfo.price))
    } else {
      setIsOrderDetailsOpened(true);
      dispatch(addItem(productInfo));
      dispatch(addItemPrice(price));
      if (counter) {
        setCounter(counter + 1);
      }
      else {
        setCounter(1);
    }
    }
  };
    
    return (
        <>
        <li className={menuStyles.card} id='card' onClick={() => handleClick(productInfo, productInfo.price, productInfo._id)}>
            <div>
            {counter && <Counter count={counter} size="default" />}
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