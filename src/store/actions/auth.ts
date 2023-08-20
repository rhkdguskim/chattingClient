import { LoginData, Auth } from "../../dto/auth";

export enum AuthTypes {
    LOGIN_REQUEST = 'auth/LOGIN_REQUEST',
    LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS',
    LOGIN_FAILURE = 'auth/LOGIN_FAILURE',
    LOGOUT = 'auth/LOGOUT',
    CHANGE_MESSAGE = 'auth/CHANGE_MESSAGE'
  }

export interface LoginAction {
    type: AuthTypes.LOGIN_REQUEST;
    payload: LoginData;
}

export interface LoginSuccessAction {
    type: AuthTypes.LOGIN_SUCCESS;
    payload: {
        token: string;
        auth: Auth;
    }
}

export interface LoginFailureAction {
  type: AuthTypes.LOGIN_FAILURE;
  payload: string;
}

export interface LogoutAction {
  type: AuthTypes.LOGOUT;
}

// 로그인 실패 등에 따른 message
export interface ChangeMessageAction {
  type: AuthTypes.CHANGE_MESSAGE;
  payload: string;
}

export type AuthActionTypes =
| LoginAction
| LoginSuccessAction
| LoginFailureAction
| LogoutAction
| ChangeMessageAction;

export const login = (loginData: LoginData): LoginAction => ({
    type: AuthTypes.LOGIN_REQUEST,
    payload: loginData
  });

export const logout = (): LogoutAction => ({
  type: AuthTypes.LOGOUT
});

export const changeMessage = (message: string): ChangeMessageAction => ({
  type: AuthTypes.CHANGE_MESSAGE,
  payload: message
});

export const AuthActions = {
  login,
  logout,
  changeMessage
};