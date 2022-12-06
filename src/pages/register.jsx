import React from 'react';
import { Button, EmailInput, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../components/form/form';
import formStyles from '../components/form/form.module.css';
import { Link, useHistory } from 'react-router-dom';
import { registerUser } from '../services/reducers/auth-reducers';
import { useDispatch } from 'react-redux';

export function Register (from) {
    const [loginData, setLoginData] = React.useState({email: '', password: '', name: ''});
    const dispatch = useDispatch();
    const history = useHistory();
    //const InputRef = React.useRef(null);

    // const onIconClick = ()=> {
    //     InputRef.current.focus();
    // }

    const onChange = e => {
        setLoginData({...loginData, [e.target.name]: e.target.value});
    }

    function navigate () {
        return (
            <p className={`${formStyles.span} text text_type_main-default text_color_inactive`}>Уже зарегистрированы? <Link className={formStyles.link} to='/login'>Войти</Link></p>
        )
    }

    const onRegister = (e) => {
        e.preventDefault();
        console.log(loginData);
        dispatch(registerUser({
            email: loginData.email,
            password: loginData.password,
            name: loginData.name
        }))
        .then(res => console.log(res))
          if(from){
            history.replace(from.pathname);
          } else {
            history.push('/');
          }
        }

    return (
        <Form submitHandler={onRegister} title='Регистрация' span={navigate()} extraClass='mt-25'>
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