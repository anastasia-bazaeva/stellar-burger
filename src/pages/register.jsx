import React from 'react';
import { Button, EmailInput, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../components/form/form';
import formStyles from '../components/form/form.module.css';

export function Register () {
    const [loginData, setLoginData] = React.useState({name: '', email: '', password: ''});
    //const InputRef = React.useRef(null);

    // const onIconClick = ()=> {
    //     InputRef.current.focus();
    // }

    const onChange = e => {
        setLoginData({...loginData, [e.target.name]: e.target.value});
    }

    function navigate () {
        return (
            <p className={`${formStyles.span} text text_type_main-default text_color_inactive`}>Уже зарегистрированы? <a>Войти</a></p>
        )
    }

    return (
        <Form title='Регистрация' span={navigate()} extraClass='mt-25'>
            <Input
                // ref={InputRef}
                onChange={onChange}
                value={loginData.name}
                placeholder='Имя'
                type='text'
                name={'name'}/>
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
            <Button htmlType='submit'>Зарегистрироваться</Button>
        </Form>
    )
}