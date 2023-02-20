import React, { FC } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import appStyles from '../app/app.module.css';
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
import { getUserInfo } from '../../services/reducers/auth-reducers';
import { ProfileOrders } from '../../pages/profile-orders';
import { FeedOrderDetails } from '../feed-order-details/feed-order-details';
import { useDispatch, useSelector } from '../../hooks/wrappers';
import * as H from 'history';

export interface ILocationState {
  from: {
    pathname: string;
  };
  background?: H.Location | undefined;
}


const App: FC = () => {

  const { isLoading } = useSelector (state => state.reducerIngredients);
  const ingredients = useSelector(state => state.reducerIngredients.ingredientsData);
  const dispatch = useDispatch ();
  const history = useHistory<ILocationState>();
  const location = useLocation<ILocationState>();

  const background = location.state?.background;
  const from = location.state?.from;

  const token = getCookie('accessToken');

  const closeAllModals = () => {
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
  }, [token])

  return (
    isLoading ?
    <div className={appStyles.loaderBox}>
      <div className={`${appStyles.loading} text text_type_main-large`}>Загрузка</div>
      <div className={appStyles.spinner}></div>
    </div>
    : (<div className={appStyles.app}>
      <AppHeader />
      <main className={appStyles.content}>
          <Switch location={background || location}>
            <ProtectedRoute path='/login' onlyUnAuth>
              <Login from={from} redirectLogin={redirectLogin}/>
            </ProtectedRoute>
            <ProtectedRoute path='/register' onlyUnAuth>
              <Register from={from} redirectLogin={redirectLogin}/>
            </ProtectedRoute>
            <ProtectedRoute path='/forgot-password' onlyUnAuth>
              <ForgotPassword/>
            </ProtectedRoute>
            <ProtectedRoute path='/reset-password' onlyUnAuth>
              <ResetPassword/>
            </ProtectedRoute>
            <ProtectedRoute exact path='/profile'>
              <Profile/>
            </ProtectedRoute>
            <ProtectedRoute exact path='/profile/orders'>
                <ProfileOrders/>
              </ProtectedRoute>
              <Route exact path='/profile/orders/:number'>
                {<FeedOrderDetails />}
              </Route>
            <Route exact path='/feed'>
              <Feed/>
            </Route>
            <Route exact path='/feed/:number'>
              {<FeedOrderDetails />}
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
            <Switch>
              <Route exact path='/ingredients/:id' >
                  <Modal onClose={closeAllModals}>
                    {ingredients && <IngredientInfo/>}
                  </Modal>
              </Route>
              <Route exact path='/feed/:number' >
                  <Modal onClose={closeAllModals}>
                    <FeedOrderDetails isModal={true} />
                  </Modal>
              </Route>
              <Route exact path='/profile/orders/:number' >
                  <Modal onClose={closeAllModals}>
                    <FeedOrderDetails isModal={true} />
                  </Modal>
              </Route>
            </Switch>)}
      </main>
    </div>)
  )
}


export default App;
