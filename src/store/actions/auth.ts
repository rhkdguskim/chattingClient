import { SocialLoginData, LoginData, Auth } from "../../dto/auth";

export enum AuthTypes {
  LOGIN_REQUEST = "auth/LOGIN_REQUEST",
  SOCIAL_LOGIN_REQUEST = "auth/SOCIAL_LOGIN_REQUEST",
  LOGIN_SUCCESS = "auth/LOGIN_SUCCESS",
  LOGIN_FAILURE = "auth/LOGIN_FAILURE",
  LOGOUT = "auth/LOGOUT",
  CHANGE_MESSAGE = "auth/CHANGE_MESSAGE",
}

export interface LoginAction {
  type: AuthTypes.LOGIN_REQUEST;
  payload: LoginData;
}

export interface SocialLoginAction {
  type: AuthTypes.SOCIAL_LOGIN_REQUEST;
  payload: SocialLoginData;
}

export interface LoginSuccessAction {
  type: AuthTypes.LOGIN_SUCCESS;
  payload: {
    access_token: string;
    refresh_token: string;
    auth: Auth;
  };
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
  | SocialLoginAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutAction
  | ChangeMessageAction;

export const login = (loginData: LoginData): LoginAction => ({
  type: AuthTypes.LOGIN_REQUEST,
  payload: loginData,
});

export const Sociallogin = (
  socialloinData: SocialLoginData,
): SocialLoginAction => ({
  type: AuthTypes.SOCIAL_LOGIN_REQUEST,
  payload: socialloinData,
});

export const logout = (): LogoutAction => ({
  type: AuthTypes.LOGOUT,
});

export const changeMessage = (message: string): ChangeMessageAction => ({
  type: AuthTypes.CHANGE_MESSAGE,
  payload: message,
});

export const AuthActions = {
  login,
  Sociallogin,
  logout,
  changeMessage,
};
