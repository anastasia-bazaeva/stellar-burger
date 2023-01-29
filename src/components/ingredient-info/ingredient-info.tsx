import nutritionStyles from './ingredient-info.module.css';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../hooks/wrappers';
import { TIngredient } from '../../types/ingredient-types';


export default function IngredientInfo() {
    const ingredients = useSelector(state => state.reducerIngredients.ingredientsData);
    const { id } = useParams<{id: string}>();
    let product: TIngredient | null = null;

    if (ingredients.length < 1) {
        return (
            <div className='text text_type_main-medium'>Зaгрузка</div>
        )
    }

    if (ingredients.length > 0) {
    product = ingredients?.find((item) => item._id.toString() === id);
    }
    const { name, image_large, calories, proteins, fat, carbohydrates } = product;

    return (
        <div className={nutritionStyles.container}>
            <h2 className={`${nutritionStyles.title} text text_type_main-large`}>Детали ингридиента</h2>
            <img className={nutritionStyles.image} src={image_large} alt={name} />
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
