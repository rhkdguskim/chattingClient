export enum PAGE_PATHS {
    HOME = '/',
    LOGIN = '/login',
    SIGNUP = '/signup',
    MENU = '/menu',
    FRIENDS = '/menu/friends',
    CHATTING = '/menu/chatting',
    CHATTING_ROOM = '/room'
  }
  
  export const HOST = process.env.HOST || 'https://port-0-kakaotalk-backend-eu1k2lllawv5vy.sel3.cloudtype.app';
  
  export const API_HOST = process.env.API_HOST || `${HOST}`;
  
  export const BASE_IMG_URL = '/asset/base_profile.jpg';