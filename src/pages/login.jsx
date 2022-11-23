import React from 'react';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../components/form/form';
import formStyles from '../components/form/form.module.css';
import { Link, Redirect, useHistory } from 'react-router-dom';

export function Login() {
    const [loginData, setLoginData] = React.useState({email: '', password: ''});

    const onChange = e => {
        setLoginData({...loginData, [e.target.name]: e.target.value});
    }

    function navigate () {
        return (
            <>
                <p className={`${formStyles.span} text text_type_main-default text_color_inactive`}>Вы новый пользователь? <a>Зарегистрироваться</a></p>
                <p className={`${formStyles.span} text text_type_main-default text_color_inactive`}>Забыли пароль? <a>Восстановить пароль</a></p>
            </>
        )
    }

    return (
        <Form title='Вход' span={navigate()} extraClass='mt-25'>
            <EmailInput 
                onChange={onChange} 
                value={loginData.email} 
                name={'email'}
                placeholder='E-mail' 
                isIcon={true} 
                type='email'/>
            <PasswordInput 
                onChange={onChange} 
                value={loginData.password} 
                placeholder='Пароль' 
                icon={'ShowIcon'} 
                type='text'
                name={'password'}/>
            <Button htmlType='submit'>Войти</Button>
        </Form>
    )
}

