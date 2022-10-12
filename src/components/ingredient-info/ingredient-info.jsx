import React from "react";
import nutritionStyles from './ingredient-info.module.css';

export default function IngredientInfo ({productInfo}) {

    return (
        <div className={nutritionStyles.container}>
            <img src={productInfo.image} alt={productInfo.name}/>
            <h3 className="text text_type_main-medium">{productInfo.name}</h3>
            <div className={nutritionStyles.nutrients}>
                <p className="text text_type_main-default text_color_inactive">Калории,ккал<br/>{productInfo.calories}</p>
                <p className="text text_type_main-default text_color_inactive">Белки, г<br/>{productInfo.proteins}</p>
                <p className="text text_type_main-default text_color_inactive">Жиры, г<br/>{productInfo.fat}</p>
                <p className="text text_type_main-default text_color_inactive">Углеводы, г<br/>{productInfo.carbohydrates}</p>
            </div>
        </div>
    )
}