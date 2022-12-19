import { textChangeRangeIsUnchanged } from "typescript";

export const apiLink = 'https://norma.nomoreparties.space/api/';
export const wsLink = 'wss://norma.nomoreparties.space/orders';

export const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }

    return res.json().then((err) => Promise.reject(err));
}

export function request(url, options) {
    return fetch(url, options).then(checkResponse)
}

export const getInfo = () => {
    return request(`${apiLink}ingredients`)
}

export const getOrderNumber = (data) => {
    return request(`${apiLink}orders`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getCookie('accessToken')
        },
        body: JSON.stringify({ "ingredients": data })
    })
}

export const getOrderDetails = (order) => {
  return request(`${apiLink}orders/${order}`,{
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    }
  })
}


export function getCookie(name) {
    const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  
  export function setCookie(name, value, props) {
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
    if (exp && exp.toUTCString) {
      props.expires = exp.toUTCString();
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
  
  export function deleteCookie(name) {
  setCookie(name, null, { expires: -1 });
}

export const WebsocketStatus = {
  CONNECTING : 'CONNECTING',
  ONLINE : 'ONLINE',
  OFFLINE : 'OFFLINE'
}

export const enrichOrder = (wsOrders, ingredientsData) => {
  const fullOrder = [];

  fullOrder.push(wsOrders?.map(order => {
    //console.log(wsOrders)
    // console.log(ingredientsData[0]._id)
    // console.log(order.ingredients.map(ingredient => ingredientsData.filter(storeIngredient => storeIngredient._id === ingredient)[0].price).reduce((acc, current) => { return acc + current},0))
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