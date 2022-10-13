import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './App.css';

// import { data } from '../utils';
import { apiLink } from '../utils';
import { getInfo } from '../api/api';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';



function App () {
  const [data, setState] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);

  const getServerData = async () => {
    try {
      await getInfo()
      .then((data) => setState(data.data))
      // const res = await fetch(`${apiLink}ingredients`);
      // const data = await res.json();
      // setState(data.data);
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
        <React.StrictMode>
        <main className='content' id='modals'>
          <BurgerIngredients data={data}/>
          <BurgerConstructor data={data}/>
        </main>
        </React.StrictMode>
      </div>
    )
  }
  App.propTypes = {
    data: PropTypes.array
  };
  

export default App;
