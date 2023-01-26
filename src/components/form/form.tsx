import React, { FC, ReactElement } from 'react';
import formStyles from './form.module.css';

interface FormProps {
    children: ReactElement | ReactElement[];
    title?: string;
    span?: ReactElement;
    submitHandler: any;
    extraClass?: string;
}

const Form:FC<FormProps> = ({children, title, span, submitHandler, extraClass}) => {
    return (
        <form onSubmit={submitHandler} className={`${formStyles.form} ${extraClass}`}>
            {title && <h2 className={`${formStyles.title} text text_type_main-medium`}>{title}</h2>}
            {children}
            {span && <div className={formStyles.spanZone}>{span}</div>}
        </form>
    )
}

export default Form;