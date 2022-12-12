import React from "react";
import FeedStyles from '../../pages/feed.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { nanoid } from "nanoid";

export function OrderCard({ images, status }) {

    let text = '';
    if (status === 'cancelled') {
        text = 'Отменен';
    } else if (status === 'done') {
        text = 'Выполнен';
    } else {
        text = 'Готовится';
    }

    let moreIngredients = images.length - 5;

    return (
        <div className={FeedStyles.orderCard}>
            <div className={FeedStyles.orderCardBox}>
                <h4 className={`${FeedStyles.textBlock} text text_type_digits-default`}>
                    #4549848
                </h4>
                <FormattedDate className={`${FeedStyles.textBlock} text text_type_main-default text_color_inactive`} date={new Date()} />
            </div>
            <h3 className={`${FeedStyles.textBlock} text text_type_main-medium`}>
                Name of the Burger
            </h3>
            {status ?
                <span className={`${FeedStyles.status} text text_type_main-small`}>{text}</span>
                : <></>}
            <div className={FeedStyles.orderCardBox}>
                <ul className={FeedStyles.iconList}>
                    {images.length < 6 && images.map((image, index) => {
                        return (
                            <li key={nanoid()} className={FeedStyles.iconItem} style={{ zIndex: 6 - index }}>
                                <img className={FeedStyles.icon} src={image} /></li>)
                    })}
                    {images.length > 5 && images.slice(0, 5).map((image, index) => {
                        return (
                            <li key={nanoid()} className={FeedStyles.iconItem} style={{ zIndex: 6 - index }}>
                                <img className={FeedStyles.icon} src={image} /></li>)
                    })}
                    {images.length > 5 && <li key={nanoid()} className={FeedStyles.iconItem} style={{ zIndex: 0, position: 'relative' }}>
                        <img className={FeedStyles.icon} src={images[5]} />
                        <div className={`${FeedStyles.extra} text text_type_digits-default`} style={{ zIndex: 1 }}>
                            {`+${moreIngredients}`}
                            </div></li>}
                </ul>
                <div className={FeedStyles.orderCardBox}>
                    <p className={`${FeedStyles.textBlock} text text_type_digits-medium`}>150</p>
                    <CurrencyIcon />
                </div>
            </div>
        </div>
    )
}