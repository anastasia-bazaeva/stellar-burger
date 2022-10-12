import React from "react";
import menuStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
// import { data } from '../utils';
import MenuSection from "../menu-section/menu-section";



function BurgerIngredients (props) {
  const [current, setCurrent] = React.useState('one');
  const menuZone = React.useRef();

  React.useEffect(() => {
        const putScroll = () => {
            if (menuZone.current.scrollTop <= 270) {
                setCurrent('one')
            } else if (menuZone.current.scrollTop <= 700) {
                setCurrent('two')
            } else {
                setCurrent('three')
            }
        }
        
        menuZone.current.addEventListener('scroll', putScroll);

        // return ()=>{
        //   menuZone.current.removeEventListener('scroll', putScroll);
        // }
    }, [])

      return (
        <section>
            <div className="pt-10 pb-10">
                <h1 className={`${menuStyles.title} text text_type_main-large pb-5`}>Соберите бургер</h1>
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
            </div>
            <div className={`${menuStyles.scrollzone}`} ref={menuZone}>
                <MenuSection list={props.data.filter(e => e.type === "bun")} type="Булки" id={'one'}/>
                <MenuSection list={props.data.filter(e => e.type === "sauce")} type="Соусы" id={'two'}/>
                <MenuSection list={props.data.filter(e => e.type === "main")} type="Начинки" id={'three'}/>
            </div>
        </section>
      )
    }
  
  
  export default BurgerIngredients