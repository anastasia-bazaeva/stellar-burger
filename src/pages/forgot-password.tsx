import React from 'react';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../components/form/form';
import formStyles from '../components/form/form.module.css';
import { Link, Redirect } from 'react-router-dom';
import { resetPassword } from '../services/reducers/auth-reducers';
import { useForm } from '../hooks/useForm';
import { useDispatch, useSelector } from '../hooks/wrappers';
import { FormEvent } from 'react';


export function ForgotPassword() {
    const {values, handleChange, setValues} = useForm({email: ''});
    const dispatch = useDispatch();
    const resetSent = useSelector(state => state.reducerAuth.resetSent);


    const onSubmit = (e: SubmitEvent | FormEvent) => {
        e.preventDefault();
        dispatch(resetPassword({email: values.email}));
        setValues({email: ''})
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
                onChange={handleChange} 
                value={values.email || ''} 
                name={'email'}
                placeholder='Укажите e-mail' 
                isIcon={true} />
            <Button htmlType='submit'>Восстановить</Button>
        </Form>
    )
}