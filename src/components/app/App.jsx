import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

// import { data } from '../utils';
import { apiLink } from '../utils';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';



function App () {
  const [data, setState] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);

  const getServerData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiLink}ingredients`);
      const data = await res.json();
      setState(data.data);
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

    return (
      <div className='App'>
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


export default App;
