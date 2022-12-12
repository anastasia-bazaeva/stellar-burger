import React from "react";
import FeedStyles from './feed.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import Cheese from '../images/Сыр.svg';
import Kolca from '../images/Kольца.svg';
import Sauce from '../images/spicyx.svg';
import { OrderCard } from "../components/order-card/order-card";
import { Dashboard } from "../components/dashboard/dashboard";

export function Feed () {
    const images = [
        Cheese,
        Kolca,
        Sauce,
        Kolca,
        Sauce,
        Kolca,
        Sauce,
        Kolca,
        Sauce
    ]
    return (
        <section className={FeedStyles.section}>
            <div className={FeedStyles.feed}>
                <h2 className={`${FeedStyles.textBlock} text text_type_main-large pt-10 pb-5`}>Лента заказов</h2>
                <div className={FeedStyles.scrollzone}>
                    <OrderCard images={images} status='cancelled'/>
                    <OrderCard images={images}/>
                    <OrderCard images={images}/>
                    <OrderCard images={images}/>
                </div>
            </div>
            <div>
                    <Dashboard/>
            </div>
        </section>
    )
}