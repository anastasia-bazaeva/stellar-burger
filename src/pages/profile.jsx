import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../components/form/form';
import { EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import profileStyles from './profile.module.css';

export function Profile() {
    return (
        <div className={profileStyles.profileBox}>
            <nav className={profileStyles.navmenu}>
                <ul className={profileStyles.navlist}>
                    <li>
                        <Link to='/profile' className={`${profileStyles.navItem} text text_type_main-medium text_color_inactive ${profileStyles.navItemActive}`}>
                            Профиль
                        </Link>
                    </li>
                    <li>
                        <Link to='/' className={`${profileStyles.navItem} text text_type_main-medium text_color_inactive`}>
                        История заказов
                        </Link>
                    </li>
                    <li className={`${profileStyles.navItem} text text_type_main-medium text_color_inactive`}>
                        Выход
                    </li>
                </ul>
                <p className={`${profileStyles.text} text text_type_main-default text_color_inactive`}>
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </nav>
            <Form>
                <Input
                    //value={null}
                    //onChange={onChange} 
                    name={'code'}
                    placeholder='Имя'  
                    type='text'
                    icon={'EditIcon'} />
                <EmailInput
                    //onChange={onChange} 
                    //value={loginData.email} 
                    name={'email'}
                    placeholder='Логин' 
                    isIcon={true} 
                    type='email'/>
                <PasswordInput
                    //onChange={onChange} 
                    //value={loginData.password} 
                    placeholder='Пароль' 
                    icon={'EditIcon'} 
                    type='text'
                    name={'password'}/>
            </Form>
        </div>
    )
}