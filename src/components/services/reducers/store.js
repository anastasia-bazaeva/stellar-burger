import { configureStore } from '@reduxjs/toolkit';
import reducerConstructor from './constructor-reducers.js';
import reducerIngredients from './ingredient-reducers.js';
import reducerDetails from './ingredient-details-reducers';


const store = new configureStore({
    reducer: {
      reducerIngredients,
      reducerConstructor,
      reducerDetails
    },
  });

  export default store;