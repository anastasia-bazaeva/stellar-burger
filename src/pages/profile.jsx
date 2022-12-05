import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../components/form/form';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import profileStyles from './profile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from '../utils/utils';
import { clearAuthCheck, getUserInfo, logoutUser, refreshToken, updateUserInfo } from '../services/reducers/auth-reducers';

export function Profile() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.reducerAuth.user);
    const error = useSelector(state => state.reducerAuth.errorMessage);

    const [loginData, setLoginData] = React.useState({
        email: user.email, 
        password: '', 
        name: user.name});

    const onChange = e => {
        setLoginData({...loginData, [e.target.name]: e.target.value});
    }

    const logout = () => {
        dispatch(logoutUser(localStorage.getItem('refreshToken')));
        dispatch(clearAuthCheck())
    }

    const updateUser = (e) => {
        e.preventDefault();
        dispatch(updateUserInfo({
            email: loginData.email, 
            password: loginData.password, 
            name: loginData.name
        }))
        console.log(user)
    }

    const clearUpdates = () => {
        setLoginData({
            email: user.email, 
            password: '', 
            name: user.name})
    }

    // React.useEffect(()=>{
    //     console.log(localStorage.getItem('refreshToken'));
    //     dispatch(getUserInfo())
    //     // if (error?.includes("jwt expired")){
    //     //     dispatch(refreshToken())
    //     // }
    //     // if(!getCookie('accessToken')) {
    //     //     dispatch(refreshToken()).then(() => dispatch(getUserInfo()))
    //     // }
    // },[getCookie('accessToken')])

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
                    <li onClick={logout} className={`${profileStyles.navItem} text text_type_main-medium text_color_inactive`}>
                        Выход
                    </li>
                </ul>
                <p className={`${profileStyles.text} text text_type_main-default text_color_inactive`}>
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </nav>
            <Form submitHandler={updateUser}>
                <Input
                    value={loginData.name}
                    onChange={onChange} 
                    name={'name'}
                    placeholder='Имя'  
                    type='text'
                    icon={'EditIcon'} />
                <EmailInput
                    onChange={onChange} 
                    value={loginData.email} 
                    name={'email'}
                    placeholder='Логин' 
                    isIcon={true} 
                    type='email'/>
                <PasswordInput
                    onChange={onChange} 
                    value={loginData.password} 
                    placeholder='Пароль' 
                    icon={'EditIcon'} 
                    type='text'
                    name={'password'}/>
                    <div className={profileStyles.buttonBox}>
                        <div className={`${profileStyles.button} ${profileStyles.link} text text_type_main-default`} onClick={clearUpdates}>Отмена</div>
                        <Button htmlType='submit'>Сохранить</Button>
                    </div>
            </Form>
        </div>
    )
}