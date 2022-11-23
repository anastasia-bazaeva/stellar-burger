import React from 'react';
import { Button, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../components/form/form';
import formStyles from '../components/form/form.module.css';

export function ResetPassword () {
    function navigate() {
        return (
            <p className={`${formStyles.span} text text_type_main-default text_color_inactive`}>Вспомнили пароль? <a>Войти</a></p>
        )
    }

    return (
        <Form title='Восстановление пароля' span={navigate()} extraClass='mt-25'>
        <EmailInput 
            // onChange={onChange} 
            value={null} 
            name={'password'}
            placeholder='Укажите e-mail' 
            isIcon={true} 
            type='text'/>
            <Input 
            // onChange={onChange} 
            value={null} 
            name={'code'}
            placeholder='Введите код из письма'  
            type='text'/>
        <Button htmlType='submit'>Сохранить</Button>
    </Form>
    )
}