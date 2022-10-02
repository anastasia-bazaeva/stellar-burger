import React from "react";
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import constructStyles from './burger-constructor.module.css';
import kraterBun from '../../images/kratorbulka.svg'


function BurgerConstructor () {

  const ConstructorPanel =() => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={kraterBun}
        />
        <ConstructorElement
          text="Краторная булка N-200i (верх)"
          price={50}
          thumbnail={kraterBun}
        />
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={kraterBun}
        />
      </div>
    )
  }

      return (
        <section className={`${constructStyles.order}`}>
          <div className={`${constructStyles.order__window} mt-25 pr-2`}>
          <ConstructorPanel/>
          </div>
          <div className={`${constructStyles.order__panel} mb-5`}>
            <div className={constructStyles.order__info}>
              <h2 className="text text_type_digits-medium">123</h2>
              <CurrencyIcon type="primary" />
            </div>
            <Button type="primary" size="large">Оформить заказ</Button>
          </div>
        </section>
      );
    }

  export default BurgerConstructor