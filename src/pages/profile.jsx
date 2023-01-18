import React from 'react';
import { NavLink } from 'react-router-dom';
import Form from '../components/form/form';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import profileStyles from './profile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthCheck, logoutUser, updateUserInfo } from '../services/reducers/auth-reducers';
import { ProfileNav } from '../components/profile-nav/profile-nav';
import { useForm } from '../hooks/useForm';

export function Profile() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.reducerAuth.user);
    const error = useSelector(state => state.reducerAuth.errorMessage);
    const {values, handleChange, setValues} = useForm({
        email: user.email, 
        password: '', 
        name: user.name});

    // const [loginData, setLoginData] = React.useState({
    //     email: user.email, 
    //     password: '', 
    //     name: user.name});

    // const onChange = e => {
    //     setLoginData({...loginData, [e.target.name]: e.target.value});
    // }

    const updateUser = (e) => {
        e.preventDefault();
        dispatch(setValues({
            email: values.email, 
            password: values.password, 
            name: values.name
        }))
        console.log(user)
    }

    const clearUpdates = () => {
        setValues({
            email: user.email, 
            password: '', 
            name: user.name})
    }

    return (
        <div className={profileStyles.profileBox}>
            <ProfileNav activeClass='profile'/>
            <Form submitHandler={updateUser}>
                <Input
                    value={values.name}
                    onChange={handleChange} 
                    name={'name'}
                    placeholder='Имя'  
                    type='text'
                    icon={'EditIcon'} />
                <EmailInput
                    onChange={handleChange} 
                    value={values.email} 
                    name={'email'}
                    placeholder='Логин' 
                    isIcon={true} 
                    type='email'/>
                <PasswordInput
                    onChange={handleChange} 
                    value={values.password} 
                    placeholder='Пароль' 
                    icon={'EditIcon'} 
                    type='text'
                    name={'password'}/>{(values.name !== user.name) || (values.email !== user.email) || (values.password !== "") ?
                    (<div className={profileStyles.buttonBox}>
                        <div className={`${profileStyles.button} ${profileStyles.link} text text_type_main-default`} onClick={clearUpdates}>Отмена</div>
                        <Button htmlType='submit'>Сохранить</Button>
                    </div>) : <></>}
            </Form>
        </div>
    )
}