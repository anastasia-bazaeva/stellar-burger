import errorImg from '../images/free-icon-404-error-8452615.png';
import errorStyles from './page404.module.css';
import { Link } from 'react-router-dom';
import formStyles from '../components/form/form.module.css';

export function Page404 () {
    return (
        <div className={errorStyles.window}>
            <h1 className='text text_type_main-large'>Ошибка 404</h1>
            <img className={errorStyles.picture} src={errorImg} alt='Изображение для иллюстрации ошибки 404'/>
            <p className='text text_type_main-default text_color_inactive'>Такой страницы не существует</p>
            <Link to='/' className={`${formStyles.link} text text_type_main-default`}>Вернуться на главную</Link>
        </div>
    )
}