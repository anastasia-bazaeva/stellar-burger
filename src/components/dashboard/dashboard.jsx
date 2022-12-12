import React from "react";
import DashStyles from './dashboard.module.css'

export function Dashboard () {
    return (
        <div className={`${DashStyles.infoZone} mt-25`}>
            <div className={DashStyles.ordersInfo}>
                <div className={DashStyles.ordersWindows}>
                    <h3 className={`${DashStyles.text} text text_type_main-medium`}>Готовы:</h3>
                    <ul className={DashStyles.orders}>
                        <li className={`${DashStyles.readyNumbers} text_type_digits-default`}>
                            00009090
                        </li>
                        <li className={`${DashStyles.readyNumbers} text_type_digits-default`}>
                            00009090
                        </li>
                    </ul>
                </div>
                <div className={DashStyles.ordersWindows}>
                    <h3 className={`${DashStyles.text} text text_type_main-medium`}>В работе:</h3>
                    <ul className={DashStyles.orders}>
                        <li className='text text_type_digits-default'>
                            00009090
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <h4 className={`${DashStyles.text} text text_type_main-medium`}>Выполнено за все время:</h4>
                <p className={`${DashStyles.numbers} text text_type_digits-large`}>21045</p>
            </div>
            <div>
                <h4 className={`${DashStyles.text} text text_type_main-medium`}>Выполнено за сегодня:</h4>
                <p className={`${DashStyles.numbers} text text_type_digits-large`}>210</p>
            </div>
        </div>
    )
}