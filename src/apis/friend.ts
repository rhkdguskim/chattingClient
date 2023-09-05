import axios from 'axios';
import { API_HOST } from '../config';
import { UserResponseDto, ChangeFriendNameRequestDto } from '../dto/user';
import { AddFriendRequestDto, DelteFriendRequestDto } from '../dto/friend';
import { ApiResponse } from '../dto/base';
import { RequestAuthAPI, getUserID } from './base';

// 친구 목록 가져옴
export const fecthFriendsRequest = RequestAuthAPI(async (id: number) => {
  const friends: ApiResponse<Array<UserResponseDto>> = await axios.get(
    `${API_HOST}/friend/${id}`
    ,{ withCredentials: true }
  );
  return friends.data;
});

// 친구 추가 요청
export const addFriendRequest = RequestAuthAPI(async (request: AddFriendRequestDto) => {
  const id = await getUserID();
  const addedFriend: boolean = await axios.post(
    `${API_HOST}/friend/${id}`,
    request
    ,{ withCredentials: true }
  );
  return addedFriend;
});

// 친구 이름 변경 요청
export const changeFriendNameRequest = RequestAuthAPI(async (request: ChangeFriendNameRequestDto
) => {
  const id = await getUserID();
  const response: boolean = await axios.put(
    `${API_HOST}/friend/${id}`,
    request
    ,{ withCredentials: true }
  );
  return response;
});


// 친구 삭제 요청
export const DelteFriendRequest = RequestAuthAPI(async (request: DelteFriendRequestDto
  ) => {
    const id = await getUserID();
    const response: boolean = await axios.delete(
      `${API_HOST}/friend/${id}`,
      {
        data: request,
        withCredentials: true
      }
    );
    return response;
  });