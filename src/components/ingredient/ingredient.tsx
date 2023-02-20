import React, { FC } from "react";
import PropTypes from 'prop-types';
import { useDrag } from "react-dnd";
import { Link, useLocation } from 'react-router-dom';

import menuStyles from '../burger-ingredients/burger-ingredients.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import { clearDetails, setDetails } from "../../services/reducers/ingredient-details-reducers";
import { useDispatch, useSelector } from "../../hooks/wrappers";
import { TIngredient } from "../../types/ingredient-types";


function Ingredient ({ productInfo }: {productInfo: TIngredient}) {

  //const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false);
  const { constructorIngredients, selectedBun } = useSelector(state => state.reducerConstructor);
  const productDetails = useSelector(state => state.reducerDetails.productDetails);
  const dispatch = useDispatch();
  const location = useLocation();

  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: productInfo,
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  let number = productInfo?._id === selectedBun?._id ? 2 : constructorIngredients?.filter(item => item._id === productInfo._id).length;

  const handleClick = (productInfo:TIngredient) => {
    dispatch(setDetails(productInfo));
  };

  return (
      !isDrag ?
      <>
        <li ref={dragRef} className={menuStyles.card} id='card' onClick={() => handleClick(productInfo)}>
        <Link className={menuStyles.link} to={{
          pathname: `/ingredients/${productInfo._id}`,
          state: {background: location}
          }}>
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
          </Link>
        </li>
    </>
    : <></>
  )
}
export default Ingredient