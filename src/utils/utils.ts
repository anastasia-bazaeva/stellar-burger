
export const apiLink = 'https://norma.nomoreparties.space/api/';
export const wsLink = 'wss://norma.nomoreparties.space/orders';

type TOptions = {
  method: 'POST'|'GET'|'DELETE'|'PATCH',
        headers?: {
            "Content-Type": string,
            "Authorization"?: string,
        },
        body?: string,
}

// type TBodyResponse<T> = {
//   success: boolean;
//   data: T;
// }

// type TResponse<T> = {
//   json: () => Promise<T>;
//   ok: boolean;
// }

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

// DATA
// {"success":true,
//"name":"Space экзо-плантаго флюоресцентный бургер",
//"order":
//{"ingredients":
//[
//   {"_id":"60d3b41abdacab0026a733c7",
// "name":"Флюоресцентная булка R2-D3",
// "type":"bun",
// "proteins":44,
// "fat":26,
// "carbohydrates":85,
// "calories":643,
// "price":988,
// "image":"https://code.s3.yandex.net/react/code/bun-01.png",
// "image_mobile":"https://code.s3.yandex.net/react/code/bun-01-mobile.png",
// "image_large":"https://code.s3.yandex.net/react/code/bun-01-large.png",
// "__v":0},
// ],
// "_id":"63d12fb2936b17001be53816",
// "owner":{
//   "name":"Anastasia",
//   "email":"genrich.croco@gmail.com",
//   "createdAt":"2022-12-01T11:51:32.690Z",
//   "updatedAt":"2022-12-06T10:53:39.160Z"},
//   "status":"done",
//   "name":"Space экзо-плантаго флюоресцентный бургер",
//   "createdAt":"2023-01-25T13:33:38.513Z",
//   "updatedAt":"2023-01-25T13:33:38.953Z",
//   "number":37859,
//   "price":15256}}

type TOrderIngredients = Array<string>

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

//убрать в createAsyncThunk
// export const getOrderDetails = (order) => {
//   return request(`${apiLink}orders/${order}`,{
//     method: 'GET',
//     headers: {
//       "Content-Type": "application/json",
//     }
//   })
// }

type TMultiProperty = number | string | boolean | null;

type TCookieProps = {
  path?: string;
  expires?: TMultiProperty | Date;
} & { [name: string] : TMultiProperty }


export function getCookie(name: string) {
    const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  
  export function setCookie(name: string, value: TMultiProperty, props?: TCookieProps): void {
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
  
  export function deleteCookie(name: string) {
  setCookie(name, null, { expires: -1 });
}

export const WebsocketStatus = {
  CONNECTING : 'CONNECTING',
  ONLINE : 'ONLINE',
  OFFLINE : 'OFFLINE'
}

export type TIngredient = {
_id: string;
name: string;
type: string;
proteins: number;
fat: number;
carbohydrates: number;
calories: number;
price: number;
image: string;
image_mobile: string;
image_large: string;
__v: number;
}

type TFullOrder = {
  number: number;
  status: string;
  name: string;
  date: string;
  ingredients: Array<TIngredient>;
  ingredientsPictures: Array<string>;
  price: number;
}

export const enrichOrder = (wsOrders, ingredientsData) => {
  const fullOrder: Array<TFullOrder> = [];

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