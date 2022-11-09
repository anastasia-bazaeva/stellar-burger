import React from "react";
import PropTypes from 'prop-types';
import { useDrag } from "react-dnd";

import menuStyles from '../burger-ingredients/burger-ingredients.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../modal/modal";
import IngredientInfo from "../ingredient-info/ingredient-info";
import { useSelector, useDispatch } from 'react-redux';
import { addBunPrice, addItem, addItemPrice, deleteItem, removeBunCount, removeBunPrice, setBun, setBunCount } from "../services/reducers/reducers";

export default function Ingredient ({productInfo}) {

  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false);
  const { priceState, constructorIngredients, selectedBun, count, bunCount } = useSelector( state => state.reducerConstructor);
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

  let number = productInfo._id === selectedBun?._id ? 2: constructorIngredients.filter(item => item._id === productInfo._id).length;

  const showCounter = (productInfo) => {
    if (productInfo.type === 'bun') {
      number = 2;
    } 
    number = constructorIngredients.filter(item => item._id === productInfo._id).length;
    console.log(productInfo.type);
    return number;
  }

  const closeAllModals = () => {
    setIsOrderDetailsOpened(false);
  };

  const handleClick = (productInfo, price) => {
    if (productInfo.type === "bun") {
      dispatch(setBun(productInfo));
      showCounter(productInfo);
      console.log(showCounter(productInfo))
      //dispatch(setBunCount(productInfo));
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
  // },[constructorIngredients, ])
    
    return (
      !isDrag &&
        <>
        <li ref={dragRef} className={menuStyles.card} id='card' onClick={() => handleClick(productInfo, productInfo.price, productInfo._id)}>
            <div>
            {(number > 0)?
            <Counter count={number} size="default" />
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