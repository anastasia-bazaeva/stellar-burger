import React, { FC } from 'react';
import { OrderCard } from '../order-card/order-card';
import FeedStyles from '../../pages/feed.module.css';
import { TFullOrder } from '../../types/order-types';

interface IProfileFeed {
    orderList: TFullOrder[]
}

export const ProfileFeed: FC<IProfileFeed> = ({orderList}) => {

    const myOrders = orderList?.reverse();
    
    return (
        <div className={FeedStyles.feed}>
                <div className={FeedStyles.scrollzone}>
                    {myOrders?.map((order) => {
                        return (<OrderCard 
                            date={order.date}
                            number={order.number} 
                            name={order.name} 
                            images={order.ingredientsPictures} 
                            price={order.price} 
                            key={order.number}
                            status={order.status}/>)
                    })}
                </div>
            </div>
    )
}