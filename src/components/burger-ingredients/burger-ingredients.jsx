import React from "react";
// import ReactDOM from "react";
import PropTypes from 'prop-types';

import menuStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import MenuSection from "../menu-section/menu-section";

import BurgerIngredientsContext from "../../context/burgerIngredientsContext";

function BurgerIngredients () {
  const [current, setCurrent] = React.useState('bun');
  const menuZone = React.useRef();

  const ingredients = React.useContext(BurgerIngredientsContext);

  React.useEffect(() => {
        const putScroll = () => {
            if (menuZone.current.scrollTop <= 270) {
                setCurrent('bun')
            } else if (menuZone.current.scrollTop <= 700) {
                setCurrent('sauce')
            } else {
                setCurrent('main')
            }
        }
         
        menuZone.current.addEventListener('scroll', putScroll);

        return ()=>{
          document.removeEventListener('scroll', putScroll);
        }
    }, [])

    const putView = (value) => {
      setCurrent(value);
      document.querySelector(`#${value}`).scrollIntoView({behavior: 'smooth'});
    }

      return (
        <section>
            <div className="pt-10 pb-10">
                <h1 className={`${menuStyles.title} text text_type_main-large pb-5`}>Соберите бургер</h1>
                <div style={{ display: 'flex' }}>
                  <Tab value='bun' active={current === 'bun'} onClick={putView}>
                    Булки
                  </Tab>
                  <Tab value='sauce' active={current === 'sauce'} onClick={putView}>
                    Соусы
                  </Tab>
                  <Tab value='main' active={current === 'main'} onClick={putView}>
                    Начинки
                  </Tab>
                </div>
            </div>
            <div className={`${menuStyles.scrollzone}`} ref={menuZone}>
              <div id={'bun'}>
                <MenuSection list={ingredients?.filter(e => e.type === "bun")} type="Булки"/>
              </div>
              <div id={'sauce'}>
                <MenuSection list={ingredients?.filter(e => e.type === "sauce")} type="Соусы"/>
              </div>
              <div id={'main'}>
                <MenuSection list={ingredients?.filter(e => e.type === "main")} type="Начинки"/>
              </div>
            </div>
        </section>
      )
    }
    
  BurgerIngredients.propsTypes = ({
    active: PropTypes.bool,
    onClick: PropTypes.func,
    list: PropTypes.array,
    type: PropTypes.string,
    id: PropTypes.string
  })
  
  export default BurgerIngredients