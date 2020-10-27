import jwt from 'jsonwebtoken';

export const getTokenFromLS = (tokenName) =>{
    return JSON.parse(JSON.stringify(jwt.decode(localStorage.getItem(tokenName) || ''))); 
};
