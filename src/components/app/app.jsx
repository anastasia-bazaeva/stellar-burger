import React from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useSelector, useDispatch } from 'react-redux';
import appStyles from '../app/app.module.css';

import store from '../..';
import { getData } from '../../services/reducers/ingredient-reducers';
import { getCookie } from '../../utils/utils'

import {Login} from '../../pages/login';
import {Register} from '../../pages/register';
import { ForgotPassword } from '../../pages/forgot-password';
import { ResetPassword } from '../../pages/reset-password';
import { Page404 } from '../../pages/page404';
import { Profile } from '../../pages/profile';
import { Feed } from '../../pages/feed';
import IngredientInfo from '../ingredient-info/ingredient-info';
import Modal from '../modal/modal';
import { ProtectedRoute } from '../protected-route/protected-route';
import { getUserInfo, refreshToken } from '../../services/reducers/auth-reducers';
import { OrderCard } from '../order-card/order-card';

function App() {
  const { isLoading } = useSelector(state => state.reducerIngredients);
  const productDetails = useSelector(state => state.reducerDetails.productDetails);
  const ingredients = useSelector(state => state.reducerIngredients.ingredientsData);
  const error = useSelector(state => state.reducerAuth.errorMessage);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const background = location.state?.background;
  const from = location.state?.from;

  const closeAllModals = () => {
    //setIsOrderDetailsOpened(false);
    //dispatch(clearDetails());
    history.goBack();
  };

  const redirectLogin = () => {
    if(from){
      history.replace(from.pathname);
    } else {
      history.push('/');
    }
  }

  React.useEffect(() => {
    dispatch(getData());
    dispatch(getUserInfo())
  }, [getCookie('accessToken')])

  return (
    isLoading ?
    <div className={appStyles.loaderBox}>
      <div className={`${appStyles.loading} text text_type_main-large`}>Загрузка</div>
      <div className={appStyles.spinner}></div>
    </div>
    : (<div className={appStyles.app}>
      <AppHeader />
      <main className={appStyles.content} id='modals'>
          <Switch location={background || location}>
            <ProtectedRoute path='/login' onlyUnAuth>
              <Login from={from} redirectLogin={redirectLogin}/>
            </ProtectedRoute>
            <ProtectedRoute path='/register' onlyUnAuth>
              <Register from={from}/>
            </ProtectedRoute>
            <ProtectedRoute path='/forgot-password' onlyUnAuth>
              <ForgotPassword/>
            </ProtectedRoute>
            <ProtectedRoute path='/reset-password' onlyUnAuth>
              <ResetPassword/>
            </ProtectedRoute>
            <ProtectedRoute path='/profile'>
              <Profile/>
            </ProtectedRoute>
            <Route path='/feed'>
              <Feed/>
            </Route>
            <Route path='/feed/:id'>
              <OrderCard/>
            </Route>
            <Route path='/ingredients/:id' >
             {ingredients && <IngredientInfo/>}
            </Route>
            <Route exact path='/'>
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
              </DndProvider>
            </Route>
            <Route>
              <Page404/>
            </Route>
          </Switch>
          {background && (
          <Route path='/ingredients/:id' >
              <Modal onClose={closeAllModals}>
                {ingredients && <IngredientInfo/>}
              </Modal>
          </Route>)}
          {background && (
            <Route path='/feed/:id' >
                <Modal onClose={closeAllModals}>
                  <OrderCard/>
                </Modal>
            </Route>)}
      </main>
    </div>)
  )
}


export default App;
