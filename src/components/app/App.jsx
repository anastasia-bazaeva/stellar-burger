import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './App.css';

import { getInfo } from '../utils';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import BurgerIngredientsContext from '../../context/burgerIngredientsContext';



function App () {
  const [ingredientsData, setIngredientsData] = React.useState([null]);
  const [isLoading, setLoading] = React.useState(true);

  const getServerData = async () => {
    try {
      await getInfo()
      .then((data) => setIngredientsData(data.data))
      setLoading(false);
      
      console.log('Успешная загрузка')
    }
    catch(e) {
      console.log(`При загрузке данных с сервера что-то пошло не так: ${e}`)
      setLoading(false);
    }
  }

  React.useEffect(()=>{
    getServerData();
  }, [])

    return (isLoading?
      <div className='loader-box'>
        <div className='loading text text_type_main-large'>Загрузка</div>
        <div className='spinner'></div>
      </div>
      : <div className='App'>
        <AppHeader/>
        <BurgerIngredientsContext.Provider value={ingredientsData}>
          <main className='content' id='modals'>
            <BurgerIngredients/>
            <BurgerConstructor ingredientsData={ingredientsData}/>
          </main>
        </BurgerIngredientsContext.Provider>
      </div>
    )
  }
  

export default App;
