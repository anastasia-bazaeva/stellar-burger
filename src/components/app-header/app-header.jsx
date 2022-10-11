import React from 'react';
import headerStyles from './app-header.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon  } from '@ya.praktikum/react-developer-burger-ui-components';


class AppHeader extends React.Component {
    render() {
      return (
        <header className={`${headerStyles.header}`}>
          <nav className={`${headerStyles.nav} p-4`}>
            <div className={headerStyles.iconblock}>
                <a href="#" className={`${headerStyles.iconbox} p-5`}>
                  <BurgerIcon type="primary" />
                  <p className={`${headerStyles.title} text text_type_main-default`}>Конструктор</p>
                </a>
                <a href="#" className={`${headerStyles.iconbox} p-5`}>
                  <ListIcon type="secondary" />
                  <p className={`${headerStyles.title} text text_type_main-default text_color_inactive`}>Лента заказов</p>
                </a>
            </div>
            <div>
              <Logo />
            </div>
            <a href="#" className={`${headerStyles.iconbox_profile} p-5`}>
              <ProfileIcon type="secondary" />
              <p className={`${headerStyles.title} text text_type_main-default text_color_inactive`}>Личный кабинет</p>
            </a>
          </nav>
        </header>
      );
    }
  }
  
  export default AppHeader 