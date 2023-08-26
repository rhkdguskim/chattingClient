import jwtDecode from 'jwt-decode'
import { AuthTypes, AuthActionTypes } from '../actions/auth'
import { Auth } from '../../dto/auth';
import { Socket } from 'socket.io-client';
import * as socketio from 'socket.io-client';
import { HOST } from '../../config';
import Cookies from 'js-cookie';

export interface AuthState {
    auth: Auth | undefined;
    token: string | null;
    loginFailuerMsg: string;
    loggingIn: boolean;
    socket: Socket | undefined;
  }

   // 초기상태
  const initialState: AuthState = {
    auth: undefined,
    // 쿠키로 변경
    token: Cookies.get('jwt') || null,
    loginFailuerMsg: '',
    // 로그인 중인지 여부
    loggingIn: false,
    socket: undefined,
  };


  if (initialState.token) {
    // token에서 회원 정보를 얻습니다.
    initialState.auth = jwtDecode(initialState.token) as Auth;
    initialState.socket?.disconnect()
    console.log(`${HOST}?token=${initialState.token}`)
    initialState.socket = socketio.connect(`${HOST}?token=${initialState.token}`)
  }

  const authReducer = (state = initialState, action: AuthActionTypes) => {
    switch (action.type) {
      case AuthTypes.LOGOUT:
        return {
          ...state,
          token: null,
          auth: undefined,
        };
      case AuthTypes.LOGIN_REQUEST:
        return {
          ...state,
          loggingIn: true
        };
      case AuthTypes.LOGIN_SUCCESS:
        return {
          ...state,
          loginFailuerMsg: '',
          loggingIn: false,
          auth: action.payload.auth,
          token: action.payload.token,
          socket : socketio.connect(`${HOST}?token=${action.payload.token}`)
        };
        case AuthTypes.LOGIN_FAILURE:
          return {
            ...state,
            loggingIn: false,
            loginFailuerMsg: action.payload
          };
        case AuthTypes.CHANGE_MESSAGE:
          return {
            ...state,
            loginFailuerMsg: action.payload
          };
      default:
        return state;
    }
  };

  export default authReducer;