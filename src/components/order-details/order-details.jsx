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