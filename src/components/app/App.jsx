import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './App.css';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { getInfo } from '../utils';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import BurgerIngredientsContext from '../../context/burgerIngredientsContext';
import PriceContext from '../../context/burger-price-context';
import { useSelector, useDispatch } from 'react-redux';

import store from '../..';
import { getData } from '../services/reducers/ingredient-reducers';
import { addBunPrice, addItem, addItemPrice, setBun } from '../services/reducers/reducers';

// const initialIngredientsPrice = { totalPrice: 0 };

// function reducer (state, action) {
//   switch (action.type) {
//     case "item":
//       return { totalPrice: action.price };
//     case "reset":
//       return initialIngredientsPrice;
//     default:
//       throw new Error(`Wrong type of action: ${action.type}`);
//   }
// }


function App () {
  //const [ingredientsData, setIngredientsData] = React.useState([null]);
  const { isLoading, ingredientsData, defaultBun } = useSelector (state => state.reducerIngredients);
  const  selectedBun  = useSelector(state => state.reducerConstructor);
  //const [priceState, priceDispatcher] = React.useReducer(reducer, initialIngredientsPrice, undefined);
  const dispatch = useDispatch();

  // const getServerData = async () => {
  //   try {
  //     await dispatch(getIngredients())
  //     .then((data) => dispatch(setIngredients(data.data)))
  //     // setLoading(false);
      
  //     console.log('Успешная загрузка')
  //   }
  //   catch(e) {
  //     console.log(`При загрузке данных с сервера что-то пошло не так: ${e}`);
  //     dispatch(getError());
  //     // setLoading(false);
  //   }
  // }

  // const handleDrop = (item) => {
  //   if (item.type === "bun") {
  //     dispatch(setBun(item))
  //   }
  //   dispatch(addItem(item));
  //   dispatch(addItemPrice(item.price))
  // };

  React.useEffect(()=>{
    dispatch(getData());
  }, [])

    return (isLoading?
      <div className='loader-box'>
        <div className='loading text text_type_main-large'>Загрузка</div>
        <div className='spinner'></div>
      </div>
      : <div className='App'>
        <AppHeader/>
          <main className='content' id='modals'>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients/>
              <BurgerConstructor/>
            </DndProvider>
          </main>
      </div>
    )
  }
  

export default App;
