import React, { FC } from "react";
import FeedStyles from '../../pages/feed.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import { ILocationState } from "../app/app";

interface IOrderCard {
    images: Array<string>;
    status?: string;
    name: string;
    price: number;
    number: number;
    date: string;
}

export const OrderCard: FC<IOrderCard> = ({ images, status, name, price, number, date }) => {
    const location = useLocation<ILocationState>();

    let text = '';
    if (status === 'cancelled') {
        text = 'Отменен';
    } else if (status === 'done') {
        text = 'Выполнен';
    } else {
        text = 'Готовится';
    }

    let moreIngredients = images.length - 5;

    const pickAddress = () => {
        if (location.pathname.startsWith('/feed')) {
            return {
                pathname: `/feed/${number}`,
                state: {background: location}
                }
        } else {
            return {
                pathname: `/profile/orders/${number}`,
                state: {background: location}
                }
        }
    }

    return (
        <Link className={FeedStyles.link} to={pickAddress}>
            <div className={FeedStyles.orderCard}>
                <div className={FeedStyles.orderCardBox}>
                    <h4 className={`${FeedStyles.textBlock} text text_type_digits-default`}>
                        #{number}
                    </h4>
                    <FormattedDate className={`${FeedStyles.textBlock} text text_type_main-default text_color_inactive`} date={new Date(date)} />
                </div>
                <h3 className={`${FeedStyles.textBlock} text text_type_main-medium`}>
                    {name}
                </h3>
                {status ?
                    <span className={status === 'done'? `${FeedStyles.status} text text_type_main-small ${FeedStyles.statusDone}` : `${FeedStyles.status} text text_type_main-small`}>{text}</span>
                    : <></>}
                <div className={FeedStyles.orderCardBox}>
                    <ul className={FeedStyles.iconList}>
                        {images.length < 6 && images.map((image, index) => {
                            return (
                                <li key={`${image}-${index}`} className={FeedStyles.iconItem} style={{ zIndex: 6 - index }}>
                                    <img className={FeedStyles.icon} src={image} /></li>)
                        })}
                        {images.length > 5 && images.slice(0, 5).map((image, index) => {
                            return (
                                <li key={`${image}-${index}`} className={FeedStyles.iconItem} style={{ zIndex: 6 - index }}>
                                    <img className={FeedStyles.icon} src={image} /></li>)
                        })}
                        {images.length > 5 && <li key={`${images[5]}-extra`} className={FeedStyles.iconItem} style={{ zIndex: 0, position: 'relative' }}>
                            <img className={FeedStyles.icon} src={images[5]} />
                            <div className={`${FeedStyles.extra} text text_type_digits-default`} style={{ zIndex: 1 }}>
                                {`+${moreIngredients}`}
                                </div></li>}
                    </ul>
                    <div className={FeedStyles.orderCardBox}>
                        <p className={`${FeedStyles.textBlock} text text_type_digits-medium`}>{price}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
           </div>
        </Link>
    )
}