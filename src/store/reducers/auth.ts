import jwtDecode from "jwt-decode";
import { AuthTypes, AuthActionTypes } from "../actions/auth";
import { Auth } from "../../dto/auth";
import { Socket } from "socket.io-client";
import * as socketio from "socket.io-client";
import {API_HOST, API_WEB_SOCKET_HOST} from "../../config";
import Cookies from "js-cookie";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
} from "../../apis/base";

export interface AuthState {
  auth: Auth | undefined;
  access_token: string | null;
  refresh_token: string | null;
  loginFailuerMsg: string;
  loggingIn: boolean;
  socket: Socket | undefined;
}

// 초기상태
const initialState: AuthState = {
  auth: undefined,
  // 쿠키로 변경
  access_token: getAccessToken() || null,
  refresh_token: getRefreshToken() || null,
  loginFailuerMsg: "",
  // 로그인 중인지 여부
  loggingIn: false,
  socket: undefined,
};

if (initialState.access_token) {
  // token에서 회원 정보를 얻습니다.
  initialState.auth = jwtDecode(initialState.access_token) as Auth;
  initialState.socket?.disconnect();
  initialState.socket = socketio.connect(
    `${API_WEB_SOCKET_HOST}?token=${initialState.access_token}`,
  );
}

const authReducer = (state = initialState, action: AuthActionTypes) => {
  switch (action.type) {
    case AuthTypes.LOGOUT:
      return {
        ...state,
        access_token: null,
        refresh_token: null,
        auth: undefined,
      };
    case AuthTypes.LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
      };
    case AuthTypes.SOCIAL_LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
      };
    case AuthTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loginFailuerMsg: "",
        loggingIn: false,
        auth: action.payload.auth,
        access_token: action.payload.access_token,
        refresh_token: action.payload.refresh_token,
        socket: socketio.connect(
          `${API_WEB_SOCKET_HOST}?token=${action.payload.access_token}`,
        ),
      };
    case AuthTypes.LOGIN_FAILURE:
      return {
        ...state,
        loggingIn: false,
        loginFailuerMsg: action.payload,
      };
    case AuthTypes.CHANGE_MESSAGE:
      return {
        ...state,
        loginFailuerMsg: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
