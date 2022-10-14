import React from 'react';
import orderStyles from './order-details.module.css';

export default function OrderDetails ({total}) {
    <div className={orderStyles.order}>
        <div>
            <h2>{total}</h2>
            <p>Идентификатор заказа</p>
        </div>
        <img/>
        <div>
            <span>Ваш заказ уже начали готовить</span>
            <span>Дождитесь готовности на орбитальной станции</span>
        </div>
    </div>
}
// никак не получилось использовать как children в модальном окне, 
// не работало содержимое, только пустая модалка и оверлей, хотя в
// том же модальном спокойно работал IngredientInfo
// оставлено на случай, если наставник подскажет почему так и как починить 