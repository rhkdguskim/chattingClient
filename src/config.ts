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