import React from "react";
import PropTypes from 'prop-types';

import menuStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import MenuSection from "../menu-section/menu-section";

function BurgerIngredients (props) {
  const [current, setCurrent] = React.useState('bun');
  const menuZone = React.useRef();

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

    // const putView = (value) => {
    //   setCurrent(value);
    //   document.querySelector(`#${value}`).scrollIntoView({behavior: 'smooth'});
    // }
    // вообще никак не получилось через element.scrollIntoView - элемент все время null с рефами или по id

      return (
        <section>
            <div className="pt-10 pb-10">
                <h1 className={`${menuStyles.title} text text_type_main-large pb-5`}>Соберите бургер</h1>
                <div style={{ display: 'flex' }}>
                  <Tab value='bun' active={current === 'bun'} onClick={setCurrent}>
                    Булки
                  </Tab>
                  <Tab value='sauce' active={current === 'sauce'} onClick={setCurrent}>
                    Соусы
                  </Tab>
                  <Tab value='main' active={current === 'main'} onClick={setCurrent}>
                    Начинки
                  </Tab>
                </div>
            </div>
            <div className={`${menuStyles.scrollzone}`} ref={menuZone}>
                <MenuSection list={props.ingredientsData?.filter(e => e.type === "bun")} type="Булки" id={'bun'}/>
                <MenuSection list={props.ingredientsData?.filter(e => e.type === "sauce")} type="Соусы" id={'sauce'}/>
                <MenuSection list={props.ingredientsData?.filter(e => e.type === "main")} type="Начинки" id={'main'}/>
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