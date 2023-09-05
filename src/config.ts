export enum PAGE_PATHS {
    HOME = '/',
    LOGIN = '/login',
    SIGNUP = '/signup',
    MENU = '/menu',
    FRIENDS = '/menu/friends',
    CHATTING = '/menu/chatting',
    CHATTING_ROOM = '/room'
  }
  
  export const HOST = process.env.REACT_APP_HOST || 'localhost:3000'
  export const API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost:3000'
  
  export const BASE_IMG_URL = '/asset/base_profile.jpg';
  export const NAVER_IMG_URL = '/asset/naver_login.png';
  export const KAKAO_IMG_URL = '/asset/kakao_login.png';
  export const GOOGLE_IMG_URL = '/asset/google_login.png';
