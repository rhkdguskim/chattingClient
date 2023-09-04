import { RoomListResponseDto } from './chatting';

// user state type
export interface UserDataDto {
  id: number;
  user_id: string;
  name: string;
  status_msg: string;
  profile_img_url: string;
  background_img_url: string;
  friends_list: Array<UserResponseDto>;
  room_list: Array<RoomListResponseDto>;
}

// 서버에서 가져온 유저 정보
export interface UserResponseDto {
  id: number;
  user_id: string;
  name: string;
  status_msg: string;
  profile_img_url: string;
  background_img_url: string;
}

// 프로필 변경 요청 시
export interface ProfileChangeRequestDto {
    id: number;
    name?: string;
    status_msg?: string;
    profile_img_url?: string;
    background_img_url?: string;
  }
  
  // 친구 이름 변경 요청 시
  export interface ChangeFriendNameRequestDto {
    my_id:number;
    friend_id: number;
    friend_name: string;
  }