import React from 'react';
import './App.css';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useSelector, useDispatch } from 'react-redux';

import store from '../..';
import { getData } from '../../services/reducers/ingredient-reducers';

function App () {
  const { isLoading } = useSelector (state => state.reducerIngredients);
  const dispatch = useDispatch();

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
