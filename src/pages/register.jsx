import React from 'react';
import { Button, EmailInput, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../components/form/form';
import formStyles from '../components/form/form.module.css';
import { Link, useHistory } from 'react-router-dom';
import { registerUser } from '../services/reducers/auth-reducers';
import { useDispatch } from 'react-redux';
import { useForm } from '../hooks/useForm';

export function Register (from) {
    const {values, handleChange, setValues} = useForm({email: '', password: '', name: ''});
    // const [loginData, setLoginData] = React.useState({email: '', password: '', name: ''});
    const dispatch = useDispatch();
    const history = useHistory();
    //const InputRef = React.useRef(null);

    // const onIconClick = ()=> {
    //     InputRef.current.focus();
    // }

    // const onChange = e => {
    //     setLoginData({...loginData, [e.target.name]: e.target.value});
    // }

    function navigate () {
        return (
            <p className={`${formStyles.span} text text_type_main-default text_color_inactive`}>Уже зарегистрированы? <Link className={formStyles.link} to='/login'>Войти</Link></p>
        )
    }

    const onRegister = (e) => {
        e.preventDefault();
        dispatch(registerUser({
            email: values.email,
            password: values.password,
            name: values.name
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
                onChange={handleChange}
                value={values.name}
                placeholder='Имя'
                type='text'
                name={'name'}/>
            <EmailInput 
                onChange={handleChange} 
                value={values.email} 
                name={'email'}
                placeholder='E-mail' 
                isIcon={true} 
                type='email'/>
            <PasswordInput 
                onChange={handleChange} 
                value={values.password} 
                placeholder='Пароль' 
                icon={'ShowIcon'} 
                type='text'
                name={'password'}/>
            <Button htmlType='submit'>Зарегистрироваться</Button>
        </Form>
    )
}