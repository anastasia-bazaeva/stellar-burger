import React from 'react';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../components/form/form';
import formStyles from '../components/form/form.module.css';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../services/reducers/auth-reducers';


export function ForgotPassword() {
    const [InputData, setInputData] = React.useState({email: ''});
    const dispatch = useDispatch();
    const resetSent = useSelector(state => state.reducerAuth.resetSent);

    const onChange = e => {
        setInputData({email: e.target.value});
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPassword(InputData));
        setInputData({email: ''})
    }

    function navigate() {
        return (
            <p className={`${formStyles.span} text text_type_main-default text_color_inactive`}>Вспомнили пароль? <Link to='/login' className={formStyles.link}>Войти</Link></p>
        )
    }

    if (resetSent) {
        return <Redirect to='/reset-password'></Redirect>
     }

    return (
        <Form submitHandler={onSubmit} title='Восстановление пароля' span={navigate()} extraClass='mt-25'>
            <EmailInput 
                onChange={onChange} 
                value={InputData.email || ''} 
                name={'email'}
                placeholder='Укажите e-mail' 
                isIcon={true} 
                type='email'/>
            <Button htmlType='submit'>Восстановить</Button>
        </Form>
    )
}