import { textChangeRangeIsUnchanged } from "typescript";
import { apiLink} from "../utils";

export const checkResponse = (res) => {
    if(res.ok) {
        return res.json();
    }
    return Promise.reject(`При загрузке данных с сервера что-то пошло не так: ${res.status}`)
}

export const getInfo = () => {
    return fetch(`${apiLink}ingredients`)
    .then(checkResponse);
}