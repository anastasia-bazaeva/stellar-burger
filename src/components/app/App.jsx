import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { data } from '../utils';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';


function App () {

    return (
      <div className='App'>
        <AppHeader/>
        <main className='content'>
          <BurgerIngredients/>
          <BurgerConstructor/>
        </main>
      </div>
    )
  }


export default App;
