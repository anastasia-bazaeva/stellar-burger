import React from "react";
import menuStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { data } from '../utils';



function BurgerIngredients () {

    const TabMenu = () => {
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


      function Ingredient ({productInfo}) {
        return (
            <li className={menuStyles.card}>
                <div>
                 <Counter count={1} size="default" />
                </div>
                <img src={productInfo.image} alt={productInfo.name}/>
                <div className={menuStyles.span_area}>
                        <span className={`${menuStyles.title} text text_type_digits-default`}>{productInfo.price}</span>
                        <CurrencyIcon type="primary" />
                </div>
                <p className={`${menuStyles.product__name} text text_type_main-default`}>{productInfo.name}</p>
            </li>
        )
    }
    
    function MenuSection ({list, type}) {
        return (
            <div className={`${menuStyles.menu} pt-10`}>
                    <h2 className={`${menuStyles.title} text text_type_main-medium`}>
                        {type}
                        </h2>
                    <ul className={`${menuStyles.menubox}`}>
                    {list.map((product)=>(
                    <Ingredient productInfo={product} key={product._id}/>
                ))}
                    </ul>
                </div>
        )
    }
    
      return (
        <section>
            <div className="pt-10 pb-10">
                <h1 className={`${menuStyles.title} text text_type_main-large pb-5`}>Соберите бургер</h1>
                <TabMenu/>
            </div>
            <div className={`${menuStyles.scrollzone}`}>
                <MenuSection list={data.filter(e => e.type === "bun")} type="Булки"/>
                <MenuSection list={data.filter(e => e.type === "sauce")} type="Соусы"/>
                <MenuSection list={data.filter(e => e.type === "main")} type="Начинки"/>
            </div>
        </section>
      );
    }
  
  
  export default BurgerIngredients