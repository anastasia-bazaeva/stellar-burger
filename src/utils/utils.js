import { textChangeRangeIsUnchanged } from "typescript";

export const apiLink = 'https://norma.nomoreparties.space/api/';

export const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`При загрузке данных с сервера что-то пошло не так. ${res.status}: ${res.message}`)
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
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "ingredients": data })
    })
}

// export const getUserData = (data) => {
//   return request(`${apiLink}auth/login`, {
//     method: 'POST',
//     headers: {
//         "Content-Type": "application/json"
//     },
//     body: JSON.stringify({ data })
// })
// }

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

