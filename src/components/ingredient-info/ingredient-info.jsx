import nutritionStyles from './ingredient-info.module.css';
import PropTypes from 'prop-types';

export default function IngredientInfo({ productInfo }) {

    return (
        <div className={nutritionStyles.container}>
            <h2 className={`${nutritionStyles.title} text text_type_main-large`}>Детали ингридиента</h2>
            <img className={nutritionStyles.image} src={productInfo.image} alt={productInfo.name} />
            <h3 className="text text_type_main-medium mt-4">{productInfo.name}</h3>
            <div className={`${nutritionStyles.nutrients} mt-8`}>
                <p className="text text_type_main-default text_color_inactive">Калории,ккал<br />{productInfo.calories}</p>
                <p className="text text_type_main-default text_color_inactive">Белки, г<br />{productInfo.proteins}</p>
                <p className="text text_type_main-default text_color_inactive">Жиры, г<br />{productInfo.fat}</p>
                <p className="text text_type_main-default text_color_inactive">Углеводы, г<br />{productInfo.carbohydrates}</p>
            </div>
        </div>
    )
}

IngredientInfo.propTypes = {
    productInfo: PropTypes.object
}