import React from 'react';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../components/form/form';
import formStyles from '../components/form/form.module.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNewPassword } from '../services/reducers/auth-reducers';

export function ResetPassword () {
    const [InputData, setInputData] = React.useState({password: '', token: '' });
    const [status, setStatus] = React.useState(false);
    const dispatch = useDispatch();

    const onChange = e => {
        setInputData({...InputData, [e.target.name]: e.target.value});
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(setNewPassword(InputData));
        setInputData({password: '', token: '' });
        setStatus(true)
    }

    function navigate() {
        return (
            <p className={`${formStyles.span} text text_type_main-default text_color_inactive`}>Вспомнили пароль? <Link to='/login' className={formStyles.link}>Войти</Link></p>
        )
    }

    if(status) {
        return (
        <p className={`${formStyles.span} text text_type_main-default pt-10`}>Пароль успешно изменен 
            <Link to='/login' className={formStyles.link}> Войти</Link>
        </p>)
    }

    return (
        <Form submitHandler={onSubmit} title='Восстановление пароля' span={navigate()} extraClass='mt-25'>
        <PasswordInput 
            onChange={onChange} 
            value={InputData.password || ''} 
            name={'password'}
            placeholder='Введите новый пароль' 
            isIcon={true} 
            type='text'/>
            <Input 
            onChange={onChange} 
            value={InputData.token || ''} 
            name={'token'}
            placeholder='Введите код из письма'  
            type='text'/>
        <Button htmlType='submit'>Сохранить</Button>
    </Form>
    )
}