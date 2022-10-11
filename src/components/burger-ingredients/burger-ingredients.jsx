import React from "react";
import menuStyles from './burger-ingredients.module.css';
import TabMenu from "../tab-menu/tab-menu";
// import { data } from '../utils';
import MenuSection from "../menu-section/menu-section";


function BurgerIngredients (props) {
      return (
        <section>
            <div className="pt-10 pb-10">
                <h1 className={`${menuStyles.title} text text_type_main-large pb-5`}>Соберите бургер</h1>
                <TabMenu/>
            </div>
            <div className={`${menuStyles.scrollzone}`}>
                <MenuSection list={props.data.filter(e => e.type === "bun")} type="Булки"/>
                <MenuSection list={props.data.filter(e => e.type === "sauce")} type="Соусы"/>
                <MenuSection list={props.data.filter(e => e.type === "main")} type="Начинки"/>
            </div>
        </section>
      );
    }
  
  
  export default BurgerIngredients