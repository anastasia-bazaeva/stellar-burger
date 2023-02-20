import React, { FC } from "react";
import { TOrder, TOrdersInfo } from "../../types/order-types";
import DashStyles from './dashboard.module.css'

interface IDashboard {
    wsData: TOrdersInfo;
    orderStat: {
        total: number;
        todayTotal: number;
    };
}

export const Dashboard: FC<IDashboard> = ({wsData, orderStat}) => {

    const ready = wsData.orders?.map((order: TOrder) => {
        if (order.status === 'done') {
            return (
                <li className={`${DashStyles.readyNumbers} text_type_digits-default`} key={order.number}>
                    {order.number}
                </li>)
        }
    })
    const inProgress = wsData.orders?.map((order: TOrder) => {
        if (order.status !== 'done' && order.status !== 'cancelled') {
            return (
                <li className={`${DashStyles.readyNumbers} text_type_digits-default`} key={order.number}>
                    {order.number}
                </li>)
        }
    })

    return (
        <div className={`${DashStyles.infoZone} mt-25`}>
            <div className={DashStyles.ordersInfo}>
                <div className={DashStyles.ordersWindows}>
                    <h3 className={`${DashStyles.text} text text_type_main-medium`}>Готовы:</h3>
                    <ul className={DashStyles.orders}>
                        {ready}
                    </ul>
                </div>
                <div className={DashStyles.ordersWindows}>
                    <h3 className={`${DashStyles.text} text text_type_main-medium`}>В работе:</h3>
                    <ul className={DashStyles.orders}>
                        {inProgress}
                    </ul>
                </div>
            </div>
            <div>
                <h4 className={`${DashStyles.text} text text_type_main-medium`}>Выполнено за все время:</h4>
                <p className={`${DashStyles.numbers} text text_type_digits-large`}>{orderStat.total}</p>
            </div>
            <div>
                <h4 className={`${DashStyles.text} text text_type_main-medium`}>Выполнено за сегодня:</h4>
                <p className={`${DashStyles.numbers} text text_type_digits-large`}>{orderStat.todayTotal}</p>
            </div>
        </div>
    )
}