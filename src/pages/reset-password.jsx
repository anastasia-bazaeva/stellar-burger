import React from 'react';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../components/form/form';
import formStyles from '../components/form/form.module.css';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNewPassword } from '../services/reducers/auth-reducers';
import { useForm } from '../hooks/useForm';

export function ResetPassword () {
    const {values, handleChange, setValues} = useForm({password: '', token: '' });
    //const [InputData, setInputData] = React.useState({password: '', token: '' });
    const [status, setStatus] = React.useState(false);
    const resetSent = useSelector(state => state.reducerAuth.resetSent);
    const dispatch = useDispatch();

    if(!resetSent) {
        return <Redirect to='/forgot-password'></Redirect>
    }

    // const onChange = e => {
    //     setInputData({...InputData, [e.target.name]: e.target.value});
    // }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(setNewPassword(values));
        setValues({password: '', token: '' });
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
            onChange={handleChange} 
            value={values.password || ''} 
            name={'password'}
            placeholder='Введите новый пароль' 
            isIcon={true} 
            type='text'/>
            <Input 
            onChange={handleChange} 
            value={values.token || ''} 
            name={'token'}
            placeholder='Введите код из письма'  
            type='text'/>
        <Button htmlType='submit'>Сохранить</Button>
    </Form>
    )
}