import React from "react";
import FeedStyles from '../../pages/feed.module.css';
import Cheese from '../../images/Сыр.svg';
import Kolca from '../../images/Kольца.svg';
import Sauce from '../../images/spicyx.svg';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { nanoid } from "nanoid";

export function OrderCard({images}) {

    return (
        <div className={FeedStyles.orderCard}>
                        <div className={FeedStyles.orderCardBox}>
                            <h4 className={`${FeedStyles.textBlock} text text_type_digits-default`}>
                                #4549848
                            </h4>
                            <FormattedDate className={`${FeedStyles.textBlock} text text_type_main-default text_color_inactive`} date={new Date()}/>
                        </div>
                        <h3 className={`${FeedStyles.textBlock} text text_type_main-medium`}>
                            Name of the Burger
                        </h3>
                        <div className={FeedStyles.orderCardBox}>
                            <ul className={FeedStyles.iconList}>{images.map((image, index) => {
                                return (
                                <li key={nanoid()} className={FeedStyles.iconItem} style={{zIndex: 6 - index}}>
                                <img className={FeedStyles.icon} src={image}/></li>)
                            })
                            }
                            </ul>
                            <div className={FeedStyles.orderCardBox}>
                                <p className={`${FeedStyles.textBlock} text text_type_digits-medium`}>150</p>
                                <CurrencyIcon/>
                            </div>
                        </div>
                    </div>
    )
}