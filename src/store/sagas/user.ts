import { all, put, call, takeLatest } from "redux-saga/effects";
import {
  UserTypes,
  FetchUserAction,
  FetchFriendsAction,
  FetchRoomListAction,
} from "../actions/user";
import * as userApi from "../../apis/user";
import * as friendApi from "../../apis/friend";
import * as chatApi from "../../apis/chatting";
import { UserResponseDto } from "../../dto/user";

export default function* userSaga() {
  yield all([
    takeLatest(UserTypes.FETCH_USER_REQUEST, fetchUser$),
    takeLatest(UserTypes.FETCH_FRIENDS_REQUEST, fetchFriends$),
    takeLatest(UserTypes.FETCH_ROOMLIST_REQUEST, fetchRoomList$),
  ]);
}

function* fetchUser$(action: FetchUserAction): any {
  try {
    const userId = action.payload;
    const user: UserResponseDto = yield call(userApi.findUser, userId);
    yield put({
      type: UserTypes.FETCH_USER_SUCCESS,
      payload: user,
    });
  } catch {
    yield put({
      type: UserTypes.FETCH_USER_FAILUER,
      payload: "유저 정보를 불러오지 못했습니다.",
    });
  }
}

function* fetchFriends$(action: FetchFriendsAction): any {
  try {
    const id = action.payload;
    const friends = yield call(friendApi.fecthFriendsRequest, id);
    yield put({
      type: UserTypes.FETCH_FRIENDS_SUCCESS,
      payload: friends,
    });
  } catch {
    yield put({
      type: UserTypes.FETCH_FRIENDS_FAILUER,
      payload: "친구 목록을 불러오지 못했습니다.",
    });
  }
}

function* fetchRoomList$(action: FetchRoomListAction): any {
  try {
    const id = action.payload;
    const roomList = yield call(chatApi.fetchRoomList as any);
    yield put({
      type: UserTypes.FETCH_ROOMLIST_SUCCESS,
      payload: roomList,
    });
  } catch (err) {
    yield put({
      type: UserTypes.FETCH_ROOMLIST_FAILUER,
      payload: "채팅방 목록을 불러오지 못했습니다.",
    });
  }
}
