import axios from 'axios';
import { API_HOST } from '../config';
import { Auth, LoginData, SignupData } from '../dto/auth';
import { ApiErrorResponse, ApiResponse } from '../dto/base';
import { TokenResponseDto } from './auth';
import jwtDecode from 'jwt-decode';

export interface refreshtokenRequest {
  refresh_token : string | null
  id : number,
}

export const getToken = () => {
    return {
        access_token : window.sessionStorage.getItem('access_token'),
        refresh_token : window.sessionStorage.getItem('refresh_token')
    };
}

export const getAccessToken = () => {
    return window.sessionStorage.getItem('access_token')
}

export const getRefreshToken = () => {
    return window.sessionStorage.getItem('refresh_token')
}

export const setAccessToken = (token : string) => {
  return window.sessionStorage.setItem('access_token', token)
}

export const setRefreshToken = (token : string) => {
  return window.sessionStorage.setItem('refresh_token', token)
}

export const removeAccessToken = () => {
  window.sessionStorage.removeItem('access_token');
}

export const removeRefreshToken = () => {
  window.sessionStorage.removeItem('access_token');
}

export const getUserID = async () => {
    const access_token = getAccessToken();
    const result : Auth = await jwtDecode(access_token as string)
    console.log(result)
    return result.id
}

 // 서버에 refresh token으로 token을 다시 재발급 받기
 const refreshtoken = async () : Promise<TokenResponseDto> => {
    const refresh_token = getRefreshToken();
    const request : refreshtokenRequest = {
      refresh_token,
      id: await getUserID(),
    }
    return await axios.post(`${API_HOST}/auth/refreshtoken`,
    request,
    { withCredentials: true }); 
  }

  type ApiCallFunction<T, R> = (...args: T[]) => Promise<R>;

  export const RequestAuthAPI = <T, R>(apiCall: ApiCallFunction<T, R>) => {
    return async (args: T): Promise<R> => {
      try {
        return await apiCall(args);
      } catch (err: any) {
        const errResponse: ApiErrorResponse = err;
        if (errResponse.response && errResponse.response.status === 401) {
          try {
            await refreshtoken();
            return await apiCall(args);
          } catch (err) {
            console.log(err)
            throw err
          }
        } else {
          console.log(err)
          throw err;
        }
      }
    };
  };

 