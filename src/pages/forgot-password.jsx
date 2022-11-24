import React from 'react';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../components/form/form';
import formStyles from '../components/form/form.module.css';
import { Link } from 'react-router-dom';


export function ForgotPassword() {

    function navigate() {
        return (
            <p className={`${formStyles.span} text text_type_main-default text_color_inactive`}>Вспомнили пароль? <Link to='/login' className={formStyles.link}>Войти</Link></p>
        )
    }

    return (
        <Form title='Восстановление пароля' span={navigate()} extraClass='mt-25'>
            <EmailInput 
                // onChange={onChange} 
                value={null} 
                name={'email'}
                placeholder='Укажите e-mail' 
                isIcon={true} 
                type='email'/>
            <Button htmlType='submit'>Восстановить</Button>
        </Form>
    )
}