import axios from 'axios';
import { API_HOST } from '../config';
import { UserResponseDto, ChangeFriendNameRequestDto } from '../dto/user';
import { AddFriendRequestDto, DelteFriendRequestDto } from '../dto/friend';
import { ApiResponse } from '../dto/base';

// 친구 목록 가져옴
export const fecthFriendsRequest = async (id: number) => {
  const friends: ApiResponse<Array<UserResponseDto>> = await axios.get(
    `${API_HOST}/friend/${id}`
    ,{ withCredentials: true }
  );
  console.log(friends)
  return friends.data;
};

// 친구 추가 요청
export const addFriendRequest = async (id: number, request: AddFriendRequestDto) => {
  const addedFriend: boolean = await axios.post(
    `${API_HOST}/friend/${id}`,
    request
    ,{ withCredentials: true }
  );
  return addedFriend;
};

// 친구 이름 변경 요청
export const changeFriendNameRequest = async (id: number, request: ChangeFriendNameRequestDto
) => {
  const response: boolean = await axios.put(
    `${API_HOST}/friend/${id}`,
    request
    ,{ withCredentials: true }
  );
  return response;
};


// 친구 이름 변경 요청
export const DelteFriendRequest = async (id: number, request: DelteFriendRequestDto
  ) => {
    const response: boolean = await axios.delete(
      `${API_HOST}/friend/${id}`,
      {
        data: request,
        withCredentials: true
      }
    );
    return response;
  };