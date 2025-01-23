import { decodeJWT } from '../decode';


export const isTokenExpired = (token: string): boolean => {
  try {
    const decodedToken = decodeJWT(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.payload.exp <= currentTime;
  } catch (error) {
    return true; 
  }
};

