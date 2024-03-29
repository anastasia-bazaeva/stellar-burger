import React, { FC } from 'react';
import PropTypes from 'prop-types';
import orderStyles from './order-details.module.css';
import donePic from '../../images/done.svg'

interface IOrderDetails {
    orderNumber: number
}

const OrderDetails: FC<IOrderDetails> = ({ orderNumber }) => {
    return (
        <div className={orderStyles.order}>
            <div className={orderStyles.info}>
                <h2 className={`${orderStyles.digits} text text_type_digits-large`}>{orderNumber}</h2>
                <p className={`${orderStyles.text} text text_type_main-medium`}>Идентификатор заказа</p>
            </div>
            <img src={donePic} alt='Галочка' />
            <div className={orderStyles.spanArea}>
                <span className={`${orderStyles.text} text text_type_main-default`}>Ваш заказ уже начали готовить</span>
                <span className={`${orderStyles.text} text text_type_main-default text_color_inactive`}>Дождитесь готовности на орбитальной станции</span>
            </div>
        </div>
    )
}


export default OrderDetails