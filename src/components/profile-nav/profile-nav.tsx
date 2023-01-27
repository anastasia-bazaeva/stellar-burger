import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from '../../hooks/wrappers';
import profileStyles from '../../pages/profile.module.css';
import { clearAuthCheck, logoutUser } from '../../services/reducers/auth-reducers';

interface IProfileNav {
    activeClass: string
}

export const ProfileNav: FC<IProfileNav> = ({activeClass}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.reducerAuth.user);

    const logout = () => {
        dispatch(logoutUser(localStorage.getItem('refreshToken')));
        dispatch(clearAuthCheck())
    }

    const activeOrNotProfile = activeClass === 'profile' 
    ? `${profileStyles.navItem} text text_type_main-medium text_color_inactive ${profileStyles.navItemActive}` 
    : `${profileStyles.navItem} text text_type_main-medium text_color_inactive`;
    
    const activeOrNotOrders = activeClass === 'orders' 
    ? `${profileStyles.navItem} text text_type_main-medium text_color_inactive ${profileStyles.navItemActive}` 
    : `${profileStyles.navItem} text text_type_main-medium text_color_inactive`;
    return (
        <nav className={profileStyles.navmenu}>
                <ul className={profileStyles.navlist}>
                    <li>
                        <NavLink exact to='/profile' className={activeOrNotProfile}>
                            Профиль
                        </NavLink>
                    </li>
                    <li>
                        <NavLink exact to='/profile/orders' className={activeOrNotOrders}>
                        История заказов
                        </NavLink>
                    </li>
                    <li onClick={logout} className={`${profileStyles.navItem} text text_type_main-medium text_color_inactive`}>
                        Выход
                    </li>
                </ul>
                <p className={`${profileStyles.text} text text_type_main-default text_color_inactive`}>
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </nav>
    )
}