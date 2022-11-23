import React from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useSelector, useDispatch } from 'react-redux';
import appStyles from '../app/app.module.css';

import store from '../..';
import { getData } from '../../services/reducers/ingredient-reducers';

import {Login} from '../../pages/login';
import {Register} from '../../pages/register';
import { ForgotPassword } from '../../pages/forgot-password';
import { ResetPassword } from '../../pages/reset-password';

function App() {
  const { isLoading } = useSelector(state => state.reducerIngredients);
  const dispatch = useDispatch();

  const inProgress = true;

  React.useEffect(() => {
    dispatch(getData());
  }, [])

  return (isLoading ?
    <div className={appStyles.loaderBox}>
      <div className={`${appStyles.loading} text text_type_main-large`}>Загрузка</div>
      <div className={appStyles.spinner}></div>
    </div>
    : <div className={appStyles.app}>
      <AppHeader />
      <main className={appStyles.content} id='modals'>
        {inProgress ? 
        (<ResetPassword />)
        : (<DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>)}
      </main>
    </div>
  )
}


export default App;
