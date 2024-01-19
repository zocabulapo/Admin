import { React, useState, useEffect} from 'react';
import jwtDecode from 'jwt-decode';

export const decodeJwt = () =>{
    const token = localStorage.getItem("Authentication");
    if (token) {    
        try {
            const decoded = jwtDecode(token)
            console.log(decoded)
            const id = decoded.data.sub;
            const permission = decoded.data.permission;
            return {id, permission}
        } catch (err) {
            console.log(err)
        }
    }
}