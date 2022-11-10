import React from "react";
import PropTypes from 'prop-types';
import { useDrag } from "react-dnd";

import menuStyles from '../burger-ingredients/burger-ingredients.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../modal/modal";
import IngredientInfo from "../ingredient-info/ingredient-info";
import { useSelector, useDispatch } from 'react-redux';
import { clearDetails, setDetails } from "../../services/reducers/ingredient-details-reducers";

export default function Ingredient({ productInfo }) {

  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false);
  const { constructorIngredients, selectedBun } = useSelector(state => state.reducerConstructor);
  const productDetails = useSelector(state => state.reducerDetails.productDetails);
  const dispatch = useDispatch();

  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: productInfo,
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  let number = productInfo._id === selectedBun?._id ? 2 : constructorIngredients.filter(item => item._id === productInfo._id).length;

  const closeAllModals = () => {
    setIsOrderDetailsOpened(false);
    dispatch(clearDetails())

  };

  const handleClick = (productInfo) => {
    dispatch(setDetails(productInfo));
    setIsOrderDetailsOpened(true)
  };

  return (
    !isDrag &&
    <>
      <li ref={dragRef} className={menuStyles.card} id='card' onClick={() => handleClick(productInfo)}>
        <div>
          {(number > 0) ?
            <Counter count={number} size="default" />
            : <></>}
        </div>
        <img src={productInfo.image} alt={productInfo.name} />
        <div className={menuStyles.span_area}>
          <span className={`${menuStyles.title} text text_type_digits-default`}>{productInfo.price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${menuStyles.product__name} text text_type_main-default`}>{productInfo.name}</p>
      </li>
      {isOrderDetailsOpened &&
        <Modal
          onClose={closeAllModals}
          isOrder={false}
        >
          <IngredientInfo productInfo={productDetails} />
        </Modal>}
    </>
  )
}

Ingredient.propTypes = ({
  productInfo: PropTypes.object
})