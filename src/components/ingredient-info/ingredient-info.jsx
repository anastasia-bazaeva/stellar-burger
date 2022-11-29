import nutritionStyles from './ingredient-info.module.css';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

export default function IngredientInfo({ productInfo }) {
    const { id } = useParams();
    console.log(productInfo);
    //const product = productInfo?.find((item) => item._id === id);
    const { name, image, calories, proteins, fat, carbohydrates } = productInfo;

    return (
        <div className={nutritionStyles.container}>
            <h2 className={`${nutritionStyles.title} text text_type_main-large`}>Детали ингридиента</h2>
            <img className={nutritionStyles.image} src={image} alt={name} />
            <h3 className="text text_type_main-medium mt-4">{name}</h3>
            <div className={`${nutritionStyles.nutrients} mt-8`}>
                <p className="text text_type_main-default text_color_inactive">Калории,ккал<br />{calories}</p>
                <p className="text text_type_main-default text_color_inactive">Белки, г<br />{proteins}</p>
                <p className="text text_type_main-default text_color_inactive">Жиры, г<br />{fat}</p>
                <p className="text text_type_main-default text_color_inactive">Углеводы, г<br />{carbohydrates}</p>
            </div>
        </div>
    )
}

IngredientInfo.propTypes = {
    productInfo: PropTypes.object
}