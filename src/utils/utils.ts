import { TIngredient } from "../types/ingredient-types";
import { TFullOrder, TOrder } from "../types/order-types";

export const apiLink = 'https://norma.nomoreparties.space/api/';
export const wsLink = 'wss://norma.nomoreparties.space/orders';

export type TMethods = 'POST'|'GET'|'DELETE'|'PATCH';
type TOptions = {
  method: TMethods,
        headers?: {
            "Content-Type": string,
            "Authorization"?: string,
        },
        body?: string,
}

export function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }

    return res.json().then((err) => Promise.reject(err));
}

export function request(url: string, options: TOptions)  {
    return fetch(url, options).then(checkResponse)
}

export function getInfo () {
    return fetch(`${apiLink}ingredients`).then(checkResponse)
}

export type TOrderIngredients = Array<string>

export const getOrderNumber = (data: TOrderIngredients) => {
    return request(`${apiLink}orders`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getCookie('accessToken')
        },
        body: JSON.stringify({ "ingredients": data })
    })
}


type TMultiProperty = number | string | boolean | null;

type TCookieProps = {
  path?: string;
  expires?: Date | TMultiProperty;
} & { [name: string] : TMultiProperty }


export function getCookie(name: string) {
    const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  
  export function setCookie(name: string, value: TMultiProperty, props?: TCookieProps | any): void {
    props = {
        path: '/',
        ...props
    };
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
      const d = new Date();
      d.setTime(d.getTime() + exp * 1000);
      exp = props.expires = d;
    }
    if (exp && exp.toGMTString()) {
      props.expires = exp.toGMTString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
      updatedCookie += '; ' + propName;
      const propValue = props[propName];
      if (propValue !== true) {
        updatedCookie += '=' + propValue;
      }
    }
    document.cookie = updatedCookie;
  }
  
  export function deleteCookie(name: string) {
  setCookie(name, null, { expires: -1 });
}

export const WebsocketStatus = {
  CONNECTING : 'CONNECTING',
  ONLINE : 'ONLINE',
  OFFLINE : 'OFFLINE'
}

export const enrichOrder = (wsOrders: TOrder[], ingredientsData: TIngredient[]): Array<TFullOrder> => {
  const fullOrder = [];

  fullOrder.push(wsOrders?.map((order:TOrder) => {
    
    fullOrder.push({
      'number': order.number,
      'status': order.status,
      'name': order.name,
      'date': order.createdAt,
      'ingredients': order.ingredients,
      'ingredientsPictures': order.ingredients.map(ingredient => ingredientsData.filter(storeIngredient => storeIngredient._id === ingredient)[0].image),
      'price': order.ingredients.map(ingredient => ingredientsData.filter(storeIngredient => storeIngredient._id === ingredient)[0].price).reduce((acc, current) => { return acc + current},0)
      })
  }));
  fullOrder.pop();
  return fullOrder;
}