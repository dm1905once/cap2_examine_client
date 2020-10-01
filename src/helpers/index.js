import jwt from 'jsonwebtoken';

export const getTokenFromLS = () =>{
    return JSON.parse(JSON.stringify(jwt.decode(localStorage.getItem("_token") || ''))); 
};