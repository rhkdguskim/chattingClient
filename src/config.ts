export enum PAGE_PATHS {
  HOME = "/",
  LOGIN = "/login",
  OAUTH = "/oauth",
  SIGNUP = "/signup",
  MENU = "/menu",
  FRIENDS = "/menu/friends",
  CHATTING = "/menu/chatting",
  CHATTING_ROOM = "/room",
}

export const HOST = process.env.REACT_APP_HOST || "localhost:3000";
export const API_HOST =
  process.env.REACT_APP_API_HOST || "http://localhost:8080/api";

export const API_WEB_SOCKET_HOST = process.env.REACT_APP_API_HOST || "http://localhost:8080/";

export const BASE_IMG_URL = "/asset/base_profile.jpg";
export const NAVER_IMG_URL = "/asset/naver_login.png";
export const KAKAO_IMG_URL = "/asset/kakao_login.png";
export const GOOGLE_IMG_URL = "/asset/google_login.png";
export const KAKAO_REST_API_KEY = "7dd48b864b7c129d14f8f65cf429093b";
export const KAKAO_REDIRECT_URL =
  process.env.REACT_APP_OAUTH_REDIRECT_URL || "http://localhost:3001/oauth";

export const NAVER_REST_API_KEY = "oTcoSe0Nvv4q6RaZyyAS";
export const NAVER_REDIRECT_URL =
  process.env.REACT_APP_OAUTH_REDIRECT_URL || "http://localhost:3001/oauth";

export const GOOGLE_REST_API_KEY =
  "846841962221-phpmlehpgrv1lj4ko9fkrmnalt3uo1fk.apps.googleusercontent.com";
export const GOOGLE_REDIRECT_URL =
  process.env.REACT_APP_OAUTH_REDIRECT_URL || "http://localhost:3001/oauth";
export const GOOGLE_SCOPE = "profile email";
