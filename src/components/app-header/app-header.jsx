import React from 'react';
import headerStyles from './app-header.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';


function AppHeader () {
  const [activeButton, setActiveButton] = React.useState('menu');

  const checkIconType = (value) => (activeButton === value)? 'primary' : 'secondary';
  const textStyle = (value) => (activeButton === value) ? `${headerStyles.title} text text_type_main-default` 
  : `${headerStyles.title} text text_type_main-default text_color_inactive`;

  const setPage = (e, value) => {
    e.preventDefault();
    setActiveButton(value)
  }
  
    return (
      <header className={`${headerStyles.header}`}>
        <nav className={`${headerStyles.nav} p-4`}>
          <div className={headerStyles.iconblock}>
            <a href="#" className={`${headerStyles.iconbox} p-5`} onClick={(e)=>setPage(e, 'menu')}>
              <BurgerIcon type={checkIconType('menu')} />
              <p className={textStyle('menu')}>Конструктор</p>
            </a>
            <a href="#" className={`${headerStyles.iconbox} p-5`} onClick={(e)=>setPage(e, 'feed')}>
              <ListIcon type={checkIconType('feed')} />
              <p className={textStyle('feed')}>Лента заказов</p>
            </a>
          </div>
          <div>
            <Logo />
          </div>
          <a href="#" className={`${headerStyles.iconbox_profile} p-5`} onClick={(e)=>setPage(e, 'profile')}>
            <ProfileIcon type={checkIconType('profile')} />
            <p className={textStyle('profile')}>Личный кабинет</p>
          </a>
        </nav>
      </header>
    );
  }

export default AppHeader 