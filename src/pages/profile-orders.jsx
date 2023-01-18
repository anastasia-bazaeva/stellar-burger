import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OrderCard } from '../components/order-card/order-card';
import { ProfileFeed } from '../components/order-feed/order-feed';
import { ProfileNav } from '../components/profile-nav/profile-nav';
import { wsConnect, wsDisconnect } from '../services/actions/middleware-actions';
import { enrichOrder, getCookie, wsLink } from '../utils/utils';
import profileStyles from './profile.module.css';

export function ProfileOrders () {
    const dispatch = useDispatch();
    const wsData = useSelector(store => store.WSReducer.orders);
    const ingredientsData = useSelector(state => state.reducerIngredients.ingredientsData);
    const wsOrders = wsData?.orders;
    const orderList = enrichOrder(wsOrders, ingredientsData);

    const disconnect = () => {
        return dispatch(wsDisconnect())
    }

    React.useEffect(()=> {
        dispatch(wsConnect(`${wsLink}?token=${getCookie('accessToken')}`));
        return () => {
            disconnect();
            console.log('Я лента в профиле и я отключилась')
          };
    },[])

    return (
        <div className={profileStyles.profileBox}>
            <ProfileNav activeClass='orders'/>
            <ProfileFeed orderList={orderList}/>
        </div>
    )
}