import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import orderStyles from './feed-order-details.module.css';
import FeedStyles from '../../pages/feed.module.css';
import { fetchOrder } from '../../services/reducers/ws-reducers';
import { clearFetchedOrder } from '../../services/actions/middleware-actions';


export function FeedOrderDetails ({isModal}) {
    const dispatch = useDispatch();
    const wsData = useSelector(store => store.WSReducer.orders);
    const ingredientsData = useSelector(state => state.reducerIngredients.ingredientsData);
    const wsOrders = wsData.orders;
    const { number } = useParams();  

    const myOrder = wsOrders?.find(order => order.number == number);
    //console.log(myOrder);

    const totalPrice = myOrder?.ingredients?.map(ingredient => ingredientsData?.filter(storeIngredient => storeIngredient._id === ingredient)[0].price).reduce((acc, current) => { return acc + current},0);
    
    let uniqueIngredients = [];

    const getUnique = () => {
        return myOrder?.ingredients?.filter((item, position) => {
          return myOrder?.ingredients?.lastIndexOf(item) === position; 
        });
    }

    uniqueIngredients = getUnique();
    //console.log(uniqueIngredients);
    
    let text = '';
    if (myOrder?.status === 'cancelled') {
        text = 'Отменен';
    } else if (myOrder?.status === 'done') {
        text = 'Выполнен';
    } else {
        text = 'Готовится';
    }

    const count = (id) => {
        let counter = 0;

        myOrder?.ingredients?.forEach(ingredient => {
            if (ingredient === id) {
                counter ++;
            }
        })
        
        return counter
    }

    React.useEffect(()=>{

        if(!isModal) {
            dispatch(fetchOrder(number))
        };

        return () => {
            if(!isModal){
                return dispatch(clearFetchedOrder())
            }
        }

    },[])

    return (
        <div className={orderStyles.container}>
            <h2 className={`${FeedStyles.textBlock} text text_type_digits-default pb-10`}>#{myOrder?.number}</h2>
            <h2 className={`${FeedStyles.textBlock} text text_type_main-medium`}>{myOrder?.name}</h2>
            <p className={myOrder?.status === 'done'? `${FeedStyles.status} text text_type_main-small ${FeedStyles.statusDone}` : `${FeedStyles.status} text text_type_main-small`}>{text}</p>
            <h3 className={`${FeedStyles.textBlock} text text_type_main-medium pt-15 pb-6`}>Состав:</h3>
            <div className={uniqueIngredients?.length > 3 ? FeedStyles.scrollzone : null}>
                <ul className={orderStyles.ingredientsInfo}>
                    {uniqueIngredients?.map(ingredient => {
                return (
                    <li key={ingredient} className={orderStyles.list}>
                        <div className={orderStyles.listGroup}>
                            <div className={orderStyles.iconItem}>
                                <img className={FeedStyles.icon} src={ingredientsData.filter(storeIngredient => storeIngredient._id === ingredient)[0].image}/>
                            </div>
                            <p className={`${FeedStyles.textBlock} text text_type_main-default`}>{ingredientsData.filter(storeIngredient => storeIngredient._id === ingredient)[0].name}</p>
                        </div>
                        <div className={orderStyles.listGroup}>
                            <p className={`${FeedStyles.textBlock} text text_type_digits-default`}>{count(ingredient)} x {ingredientsData.filter(storeIngredient => storeIngredient._id === ingredient)[0].price}</p>
                            <CurrencyIcon/>
                        </div>
                    </li>
                )
            })}
                </ul>
            </div>
            <div className={`${orderStyles.list} mt-10`}>
                <FormattedDate className={`${FeedStyles.textBlock} text text_type_main-default text_color_inactive`} date={new Date(myOrder?.createdAt)}/>
                <div className={orderStyles.listGroup}>
                    <p className={`${FeedStyles.textBlock} text text_type_digits-default`}>{totalPrice}</p>
                    <CurrencyIcon/>
                </div>
            </div>
        </div>
    )
}

FeedOrderDetails.propTypes = {
    isModal: PropTypes.bool
  }