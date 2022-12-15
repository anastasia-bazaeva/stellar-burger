import React from "react";
import FeedStyles from './feed.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import Cheese from '../images/Сыр.svg';
import Kolca from '../images/Kольца.svg';
import Sauce from '../images/spicyx.svg';
import { OrderCard } from "../components/order-card/order-card";
import { Dashboard } from "../components/dashboard/dashboard";
import { useDispatch } from "react-redux";
import { wsConnect, wsDisconnect } from "../services/actions/middleware-actions";
import { wsLink } from "../utils/utils";

export function Feed () {
    const dispatch = useDispatch();
// пока совсем глупые данные беру просто для того, чтобы могла сверстать компоненты
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
    const disconnect = () => {
        return dispatch(wsDisconnect())
    }

    React.useEffect(()=>{
        dispatch(wsConnect(`${wsLink}/all`))
    },[])

    return (
        <section className={FeedStyles.section}>
            <div className={FeedStyles.feed}>
                <h2 className={`${FeedStyles.textBlock} text text_type_main-large pt-10 pb-5`}>Лента заказов</h2>
                <div className={FeedStyles.scrollzone}>
                {images.map((image, index) => {
                        return (<OrderCard images={images} key={index}/>)
                    })}
                </div>
            </div>
            <div>
                <div onClick={disconnect}>ВЫКЛ СОКЕТ</div>
                <Dashboard/>
            </div>
        </section>
    )
}