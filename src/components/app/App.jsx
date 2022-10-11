import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

// import { data } from '../utils';
import { apiLink } from '../utils';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';



function App () {
  const [state, setState] = React.useState({
    data: [],
    isLoading: false
  });

  const getServerData = async () => {
    try {
      setState({...state, isLoading: true})
      const res = await fetch(`${apiLink}ingredients`);
      const data = await res.json();
      setState({...state, data: data.data, isLoading: false});
      console.log('Успешная загрузка')
    }
    catch(e) {
      console.log(`При загрузке данных с сервера что-то пошло не так: ${e}`)
      setState({...state, isLoading: false})
    }
  }

  React.useEffect(()=>{
    getServerData();
  }, [])

    return (
      <div className='App'>
        <AppHeader/>
        <main className='content'>
          <BurgerIngredients data={state.data}/>
          <BurgerConstructor data={state.data}/>
        </main>
      </div>
    )
  }


export default App;
