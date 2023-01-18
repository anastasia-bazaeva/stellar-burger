import React from "react";
import FeedStyles from './feed.module.css';
import { OrderCard } from "../components/order-card/order-card";
import { Dashboard } from "../components/dashboard/dashboard";
import { useDispatch, useSelector } from "react-redux";
import { wsConnect, wsDisconnect } from "../services/actions/middleware-actions";
import { enrichOrder, wsLink } from "../utils/utils";

export function Feed () {
    const dispatch = useDispatch();
    const wsData = useSelector(store => store.WSReducer.orders);
    const ingredientsData = useSelector(state => state.reducerIngredients.ingredientsData);
    const wsOrders = wsData.orders;
    const orderStat = {
        'total': wsData.total,
        'todayTotal': wsData.totalToday
    }
    

    const orderList = enrichOrder(wsOrders, ingredientsData);

    const disconnect = () => {
        return dispatch(wsDisconnect())
    }

    React.useEffect(()=>{
        dispatch(wsConnect(`${wsLink}/all`));
        return () => {
            disconnect();
            console.log('Я лента заказов и я отключилась')
          };
    },[])

    return (
        <section className={FeedStyles.section}>
            <div className={FeedStyles.feed}>
                <h2 className={`${FeedStyles.textBlock} text text_type_main-large pt-10 pb-5`}>Лента заказов</h2>
                <div className={FeedStyles.scrollzone}>
                {orderList.map((order) => {
                        return (<OrderCard 
                            date={order.date}
                            number={order.number} 
                            name={order.name} 
                            images={order.ingredientsPictures} 
                            price={order.price} 
                            key={order.number}
                            />)
                    })}
                </div>
            </div>
            <div>
                <Dashboard wsData={wsData} orderStat={orderStat}/>
            </div>
        </section>
    )
}