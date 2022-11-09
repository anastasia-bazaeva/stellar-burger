import { textChangeRangeIsUnchanged } from "typescript";

export const apiLink = 'https://norma.nomoreparties.space/api/';

export const checkResponse = (res) => {
    if(res.ok) {
        return res.json();
    }
    return Promise.reject(`При загрузке данных с сервера что-то пошло не так: ${res.status}`)
}

function request(url, options) {
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
        body: JSON.stringify({ "ingredients": data})
    })
}