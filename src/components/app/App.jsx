import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';


class App extends React.Component {
  render() {
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
}


export default App;
