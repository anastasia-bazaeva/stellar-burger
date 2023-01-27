import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import constructStyles from './burger-constructor.module.css';
import Modal from "../modal/modal";
import { addItem, clearOrder, deleteItem, getOrder, removeItemPrice, setBun } from "../../services/reducers/constructor-reducers";
import FillingItem from "../filling-item/filling-item";
import OrderDetails from "../order-details/order-details";
import { Redirect, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "../../hooks/wrappers";


export default function BurgerConstructor() {
  const { priceState, constructorIngredients, orderNumber, selectedBun, isLoading } = useSelector(state => state.reducerConstructor);
  const dispatch = useDispatch();
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false);
  const user = useSelector(state => state.reducerAuth.user);
  const location = useLocation();
  const history = useHistory();

  const [{ isHover, canDrop }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      dispatch(
        item.type !== "bun" ?
          addItem(item)
          : setBun(item)
      );
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  const borderColor = (isHover && canDrop) ? constructStyles.order__box : constructStyles.order;

  const getTotal = React.useMemo(() => {
    return priceState + selectedBun?.price * 2;
  }, [priceState, selectedBun])

  const closeAllModals = () => {
    setIsOrderDetailsOpened(false);
  };

  const getOrderInfo = () => {
    dispatch(getOrder([
      selectedBun._id,
      ...constructorIngredients.map(item => item._id),
      selectedBun._id
    ]
    ))
      .then(res => {
        res.payload.success && setIsOrderDetailsOpened(true);
        dispatch(clearOrder())
      })
      .catch(e => console.log(`При загрузке данных по заказу что-то пошло не так: ${e}`))
  }

  const handleClose = (uid, price) => {
    dispatch(deleteItem(uid));
    dispatch(removeItemPrice(price))
  }

  const handleClick = () => {
    if(!user) {
      return history.replace('/login')
    } else {
      return getOrderInfo()
    }
  };

  const isScroll = (!selectedBun && priceState === 0) ? constructStyles.order : constructStyles.order__window;

  return (
    <>
      <section className={borderColor}>
        <div ref={dropTarget} className={`${isScroll} mt-25 pr-2`}>
          {(!selectedBun && priceState === 0) ? <div className={`${constructStyles.order__note} text text_type_main-large`}><h3>Добавьте что-нибудь в заказ</h3><p className="text text_type_main-medium">Для этого перетащите понравившиеся ингридиенты сюда</p></div>
            : <div className={constructStyles.order__content}>
              {selectedBun && <ConstructorElement
                type="top"
                isLocked={true}
                text={`${selectedBun?.name} (верх)`}
                price={selectedBun?.price}
                thumbnail={selectedBun?.image}
                key="top-constr"
              />}{constructorIngredients && constructorIngredients.map((item, index) => (
                <FillingItem
                  key={item.uid}
                  ingredient={item}
                  index={index}
                  handleClose={handleClose}
                />
              ))}
              {selectedBun && <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${selectedBun?.name} (низ)`}
                price={selectedBun?.price}
                thumbnail={selectedBun?.image}
                key="bottom-constr"
              />}
            </div>}
        </div>
        <div className={`${constructStyles.order__panel} mb-5`}>
          <div className={constructStyles.order__info}>
            <h2 className="text text_type_digits-medium">{selectedBun ? getTotal : priceState}</h2>
            <CurrencyIcon type="primary" />
          </div>
          {selectedBun ? <Button type="primary" size="large" onClick={handleClick} htmlType={"submit"}>{user ? 'Оформить заказ' : 'Войти'}</Button>
            : <div className={`${constructStyles.order__panel} text text_type_main-default`}>Как только вы выберете булочку,<br></br> заказ можно будет оформить</div>}
        </div>
      </section>
      {isLoading &&
        <Modal
          onClose={closeAllModals}
          isOrder={true}
        ><div className={constructStyles.order__spinner}>
            <div className={`${constructStyles.spinner} ${constructStyles.order__spinnerItem}`}></div>
          </div>
        </Modal>}
      {isOrderDetailsOpened &&
        <Modal
          onClose={closeAllModals}
          isOrder={true}
        >
          <OrderDetails orderNumber={orderNumber} />
        </Modal>}
    </>
  );
}

