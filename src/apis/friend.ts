import axios from "axios";
import {API_HOST} from "../config";
import {ChangeFriendNameRequestDto, UserResponseDto} from "../dto/user";
import {AddFriendRequestDto, DelteFriendRequestDto} from "../dto/friend";
import {ApiResponse} from "../dto/base";
import {getRefreshToken, getUserID, RequestAuthAPI} from "./base";

// 친구 목록 가져옴
export const fetchFriendsRequest = RequestAuthAPI(async (id: number) => {
  const friends: ApiResponse<Array<UserResponseDto>> = await axios.get(
    `${API_HOST}/friend/${id}`,
    { withCredentials: true,
        headers : {
            'authorization': `${getRefreshToken()}`,
        }},
  );
  return friends.data;
});

// 친구 추가 요청
export const addFriendRequest = RequestAuthAPI(
  async (request: AddFriendRequestDto) => {
    const id = await getUserID();
      return await axios.post(
        `${API_HOST}/friend/${id}`,
        request,
        {
            withCredentials: true,
            headers: {
                'authorization': `${getRefreshToken()}`,
            }
        },
    );
  },
);

// 친구 이름 변경 요청
export const changeFriendNameRequest = RequestAuthAPI(
  async (request: ChangeFriendNameRequestDto) => {
    const id = await getUserID();
      return await axios.put(
        `${API_HOST}/friend/${id}`,
        request,
        {
            withCredentials: true,
            headers: {
                'authorization': `${getRefreshToken()}`,
            }
        },
    );
  },
);

// 친구 삭제 요청
export const DelteFriendRequest = RequestAuthAPI(
  async (request: DelteFriendRequestDto) => {
    const id = await getUserID();
    const response: boolean = await axios.delete(`${API_HOST}/friend/${id}`, {
      data: request,
      withCredentials: true,
    });
    return response;
  },
);
