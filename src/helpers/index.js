import jwt from 'jsonwebtoken';

export const decodeItemFromLS = (item) =>{
    return JSON.parse(JSON.stringify(jwt.decode(localStorage.getItem(item) || ''))); 
};