import { all, put, call, takeLatest } from 'redux-saga/effects';
import jwtDecode from 'jwt-decode';
import { AuthTypes, LoginAction, SocialLoginAction } from '../actions/auth';
import * as authApi from '../../apis/auth'
import { LoginData, SocialLoginData } from '../../dto/auth';
import { UserTypes } from '../actions/user';
import { ApiErrorResponse } from '../../dto/base';
import { setAccessToken, setRefreshToken } from '../../apis/base';

export default function* authSaga() {
  yield all([
    takeLatest(AuthTypes.LOGIN_REQUEST, login$),
    takeLatest(AuthTypes.SOCIAL_LOGIN_REQUEST, sociallogin$),
    takeLatest(AuthTypes.LOGOUT, logout$)
  ]);
}

function* login$(action: LoginAction) : Generator<any, void, any> {
  try {
    const loginData : LoginData = action.payload;
    const token : authApi.TokenResponseDto = yield call(authApi.login, loginData);
    setAccessToken(token.access_token);
    setRefreshToken(token.refresh_token);
    const auth = yield call(jwtDecode, token.access_token);
    yield put({
      type: AuthTypes.LOGIN_SUCCESS,
      payload: {
        access_token : token.access_token,
        refresh_token : token.refresh_token,
        auth
      }
    });
  } catch(err : any) {
    const result : ApiErrorResponse = err;
    yield put({
      type: AuthTypes.LOGIN_FAILURE,
      payload: result.response?.data.message
    });
  }
}

function* sociallogin$(action: SocialLoginAction) : Generator<any, void, any> {
  try {
    const data : SocialLoginData = action.payload;
    const token : authApi.TokenResponseDto = yield call(authApi.socialLogin, data);
    setAccessToken(token.access_token);
    setRefreshToken(token.refresh_token);
    const auth = yield call(jwtDecode, token.access_token);
    yield put({
      type: AuthTypes.LOGIN_SUCCESS,
      payload: {
        access_token : token.access_token,
        refresh_token : token.refresh_token,
        auth
      }
    });
  } catch(err : any) {
    const result : ApiErrorResponse = err;
    yield put({
      type: AuthTypes.LOGIN_FAILURE,
      payload: result.response?.data.message
    });
  }
}

function* logout$() {
  yield call(authApi.logout);
  yield put({
    type: UserTypes.RESET_USER
  });
}