import React from "react";
import menuStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import KraterBun from '../../images/kratorbulka.svg'
import FluoBun from '../../images/fluobulka.svg'

class BurgerIngredients extends React.Component {

    tab = () => {
        const [current, setCurrent] = React.useState('one')
        return (
          <div style={{ display: 'flex' }}>
            <Tab value="one" active={current === 'one'} onClick={setCurrent}>
              Булки
            </Tab>
            <Tab value="two" active={current === 'two'} onClick={setCurrent}>
              Соусы
            </Tab>
            <Tab value="three" active={current === 'three'} onClick={setCurrent}>
              Начинки
            </Tab>
          </div>
        )
      }

    render() {
      return (
        <section>
            <div className="pt-10 pb-10">
                <h1 className={`${menuStyles.title} text text_type_main-large pb-5`}>Соберите бургер</h1>
                <this.tab/>
            </div>
            <div>
                <div className={`${menuStyles.menu}`}>
                    <h2 className={`${menuStyles.title} text text_type_main-medium`}>Булки</h2>
                    <div className={`${menuStyles.menubox}`}>
                        <div className={menuStyles.card}>
                            <img src={KraterBun} alt='Кратерная булка'/>
                            <div>
                                <span>20</span>
                                <CurrencyIcon type="primary" />
                            </div>
                            <p>Кратерная булка N-200i</p>
                        </div>
                        <div className={menuStyles.card}>
                            <img src={FluoBun} alt='Флюорисцентная булка'/>
                            <div>
                                <span>20</span>
                                <CurrencyIcon type="primary" />
                            </div>
                            <p>Флюорисцентная булка R2-D3</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h2>Соусы</h2>
                </div>
                <div>
                    <h2>Начинки</h2>
                </div>
            </div>
        </section>
      );
    }
  }
  
  export default BurgerIngredients