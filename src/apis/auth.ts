import axios from 'axios';
import { API_HOST } from '../config';
import { LoginData, SignupData } from '../dto/auth';
import { ApiResponse } from '../dto/base';
import { removeAccessToken, removeRefreshToken } from './base';

interface SignupRequestDto {
  user_id: string;
  password: string;
  name: string;
}

interface LoginRequestDto {
  user_id: string;
  password: string;
}

export interface TokenResponseDto {
  access_token: string;
  refresh_token: string;
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
export const login = async (loginData: LoginData) : Promise<TokenResponseDto> => {
  const request : LoginRequestDto = {
    user_id: loginData.user_id,
    password: loginData.password
  };
  const response : ApiResponse<TokenResponseDto> = await axios.post(
    `${API_HOST}/auth/login`,
    request,
    { withCredentials: true },
  );
  return response.data;
};

// 로그아웃 요청
export const logout = () => {
  removeAccessToken();
  removeRefreshToken();
};

// 서버에 소셜 로그인 요청
export const socialLogin = async (provider: string) => {
  // 카카오, 네이버, 구글의 각각의 소셜 로그인 요청 데이터 생성
  let socialLoginUrl = '';
  if (provider === 'kakao') {
    socialLoginUrl = `${API_HOST}/auth/kakao/login`;
  } else if (provider === 'naver') {
    socialLoginUrl = `${API_HOST}/auth/naver/login`;
  } else if (provider === 'google') {
    socialLoginUrl = `${API_HOST}/auth/google/login`;
  }

  if (!socialLoginUrl) {
    throw new Error('Invalid provider');
  }

  try {
    const response = await axios.get(socialLoginUrl);
    console.log(response.data);
    const token = response.data.access_token;
    return token;
  } catch (error) {
    console.error('Social login error:', error);
    throw error;
  }
};