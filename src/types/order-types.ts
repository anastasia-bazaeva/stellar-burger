import { TIngredient } from "./ingredient-types";
import { TOwner } from "./user-types";

export type TFullOrder ={
    number: number;
    status: string;
    name: string;
    date: string;
    ingredients: Array<TIngredient>;
    ingredientsPictures: Array<string>;
    price: number;
  }

export type TOrderResponse = {
    order : {
        createdAt: string;
        ingredients: TIngredient[] | TIngredient;
        name: string;
        number: number;
        owner: TOwner;
        price: number;
        status: string;
        updatedAt: string;
        _id: string;
    };
    success?: boolean;
    name?: string;
    }

export type TOrder = {
    _id: string;
    owner: string;
    status: string;
    ingredients: Array<string>;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
    __v: number;
}

export type TOrdersInfo = {
    success?: boolean, 
    orders: TOrder[] | [];
    total: number;
    totalToday: number;
};