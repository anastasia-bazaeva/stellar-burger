import React, { FC } from "react";
import PropTypes from 'prop-types';

import menuStyles from '../burger-ingredients/burger-ingredients.module.css';
import Ingredient from "../ingredient/ingredient";
import { TIngredient } from "../../types/ingredient-types";

interface IMenuSection {
    list: Array<TIngredient>;
    type: string;
}

const MenuSection: FC<IMenuSection> = ({ list, type }) => {
    return (
        <div className={`${menuStyles.menu} pt-10`}>
            <h2 className={`${menuStyles.title} text text_type_main-medium`}>
                {type}
            </h2>
            <ul className={`${menuStyles.menubox}`}>
                {list.map((product) => (
                    <Ingredient productInfo={product} key={product._id} />
                ))}
            </ul>
        </div>
    )
}

export default MenuSection