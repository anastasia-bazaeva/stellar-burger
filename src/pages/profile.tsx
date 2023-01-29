import React from 'react';
import Form from '../components/form/form';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import profileStyles from './profile.module.css';
import { updateUserInfo } from '../services/reducers/auth-reducers';
import { ProfileNav } from '../components/profile-nav/profile-nav';
import { useForm } from '../hooks/useForm';
import { useDispatch, useSelector } from '../hooks/wrappers';
import { FormEvent } from 'react';

export function Profile() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.reducerAuth.user);
    const error = useSelector(state => state.reducerAuth.errorMessage);
    const {values, handleChange, setValues} = useForm({
        email: user!.email || '', 
        password: '', 
        name: user!.name || ''});

    const updateUser = (e: SubmitEvent | FormEvent) => {
        e.preventDefault();
        const newValues = {
            email: values.email, 
            password: values.password, 
            name: values.name
        };
        setValues(newValues);
        dispatch(updateUserInfo(newValues))
    }

    const clearUpdates = () => {
        setValues({
            email: user!.email || '', 
            password: '', 
            name: user!.name || ''})
    }

    return (
        <div className={profileStyles.profileBox}>
            <ProfileNav activeClass='profile'/>
            <Form submitHandler={updateUser}>
                <Input
                    value={values.name || ''}
                    onChange={handleChange} 
                    name={'name'}
                    placeholder='Имя'  
                    type='text'
                    icon={'EditIcon'} />
                <EmailInput
                    onChange={handleChange} 
                    value={values.email || ''} 
                    name={'email'}
                    placeholder='Логин' 
                    isIcon={true} />
                <PasswordInput
                    onChange={handleChange} 
                    value={values.password || ''} 
                    placeholder='Пароль' 
                    icon={'EditIcon'} 
                    name={'password'}/>{(values.name !== user?.name) || (values.email !== user?.email) || (values.password !== "") ?
                    (<div className={profileStyles.buttonBox}>
                        <div className={`${profileStyles.button} ${profileStyles.link} text text_type_main-default`} onClick={clearUpdates}>Отмена</div>
                        <Button htmlType='submit'>Сохранить</Button>
                    </div>) : <></>}
            </Form>
        </div>
    )
}