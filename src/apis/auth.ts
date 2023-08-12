import axios from 'axios';
import { API_HOST } from '../config';
import { LoginData, SignupData } from '../dto/auth';
import { ApiResponse } from '../dto/base';

interface SignupRequestDto {
  user_id: string;
  password: string;
  name: string;
}

interface LoginResponseDto {
  access_token: string;
}

// 서버에 회원가입 요청
export const signup = async (signupData: SignupData) => {
  const signupRequest: SignupRequestDto = {
    user_id: signupData.user_id,
    password: signupData.password,
    name: signupData.name
  };
  await axios.post(`${API_HOST}/auth/signup`, signupRequest);
};

// 서버에 로그인 요청
export const login = async (loginData: LoginData) => {
  const request = {
    user_id: loginData.user_id,
    password: loginData.password
  };
  const response = await axios.post(
    `${API_HOST}/auth/login`,
    request,
    { withCredentials: true },
  );
  console.log(response.data)
  const token = response.data.access_token;
  return token;
};

export const logout = () => {
  window.sessionStorage.removeItem('jwt');
};