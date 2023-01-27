import React, { FC } from 'react';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../components/form/form';
import formStyles from '../components/form/form.module.css';
import { Link, useHistory } from 'react-router-dom';
import { loginUser } from '../services/reducers/auth-reducers';
import { useForm } from '../hooks/useForm';
import { useDispatch } from '../hooks/wrappers';

export interface ILogin {
    from?: {pathname: string};
    redirectLogin: () => void;
}

export const Login: FC<ILogin> = ({redirectLogin}) => {
    const {values, handleChange} = useForm({email: '', password: ''});
    const dispatch = useDispatch();
    const history = useHistory();

    const onLogin = (e: SubmitEvent) => {
        e.preventDefault();
        dispatch(loginUser({email: values.email, password: values.password}))
        redirectLogin();
        }

    function navigate () {
        return (
            <>
                <p className={`${formStyles.span} text text_type_main-default text_color_inactive`}>Вы новый пользователь? <Link to='/register' className={formStyles.link}>Зарегистрироваться</Link></p>
                <p className={`${formStyles.span} text text_type_main-default text_color_inactive`}>Забыли пароль? <Link to='/forgot-password' className={formStyles.link}>Восстановить пароль</Link></p>
            </>
        )
    }

    return (
        <Form submitHandler={onLogin} title='Вход' span={navigate()} extraClass='mt-25'>
            <EmailInput 
                onChange={handleChange} 
                value={values.email} 
                name={'email'}
                placeholder='E-mail' 
                isIcon={true} />
            <PasswordInput 
                onChange={handleChange} 
                value={values.password} 
                placeholder='Пароль' 
                icon={'ShowIcon'}
                name={'password'}/>
            <Button htmlType='submit'>Войти</Button>
        </Form>
    )
}

