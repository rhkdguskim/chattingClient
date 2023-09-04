import { all, put, call, takeLatest } from 'redux-saga/effects';
import jwtDecode from 'jwt-decode';
import { AuthTypes, LoginAction } from '../actions/auth';
import * as authApi from '../../apis/auth'
import { LoginData } from '../../dto/auth';
import { UserTypes } from '../actions/user';
import { ApiErrorResponse } from '../../dto/base';

export default function* authSaga() {
  yield all([
    takeLatest(AuthTypes.LOGIN_REQUEST, login$),
    takeLatest(AuthTypes.LOGOUT, logout$)
  ]);
}

function* login$(action: LoginAction) : Generator<any, void, any> {
  try {
    const loginData : LoginData = action.payload;
    const token = yield call(authApi.login, loginData);
    const auth = yield call(jwtDecode, token);
    yield put({
      type: AuthTypes.LOGIN_SUCCESS,
      payload: {
        token,
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