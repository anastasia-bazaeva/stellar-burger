import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './App.css';

import { getInfo } from '../utils';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import BurgerIngredientsContext from '../../context/burgerIngredientsContext';
import PriceContext from '../../context/burger-price-context';
import { useSelector, useDispatch } from 'react-redux';

import store from '../..';
import { getData } from '../services/reducers/ingredient-reducers';

const initialIngredientsPrice = { totalPrice: 0 };

function reducer (state, action) {
  switch (action.type) {
    case "item":
      return { totalPrice: action.price };
    case "reset":
      return initialIngredientsPrice;
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}


function App () {
  //const [ingredientsData, setIngredientsData] = React.useState([null]);
  const { isLoading } = useSelector (state => state.reducerIngredients.isLoading);
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
            <BurgerIngredients/>
            <BurgerConstructor/>
          </main>
      </div>
    )
  }
  

export default App;
