import React from "react";
import PropTypes from 'prop-types';

import menuStyles from '../burger-ingredients/burger-ingredients.module.css';
import Ingredient from "../ingredient/ingredient";


export default function MenuSection ({list, type, handleClick}) {
    return (
        <div className={`${menuStyles.menu} pt-10`}>
                <h2 className={`${menuStyles.title} text text_type_main-medium`}>
                    {type}
                    </h2>
                <ul className={`${menuStyles.menubox}`}>
                {list.map((product)=>(
                <Ingredient productInfo={product} key={product._id} onClick={handleClick}/>
            ))}
                </ul>
            </div>
    )
}

MenuSection.propTypes = ({
    list: PropTypes.array,
    type: PropTypes.any,
    handleClick: PropTypes.func
  })