import axios from 'axios';
import { API_HOST } from '../config';
import {
  CreateRoomRequestDto,
  CreateRoomResponseDto,
  RoomListResponseDto,
  ChattingResponseDto,
  ChattingRequestByCursorDto,
} from '../dto/chatting';
import { ApiResponse } from '../dto/base';
import { RequestAuthAPI, getUserID } from './base';

// 채팅방 입장 시, 채팅방 정보를 얻음
export const createRoom = RequestAuthAPI<CreateRoomRequestDto, CreateRoomResponseDto>(async (param: CreateRoomRequestDto) => {
  const id = await getUserID();
  const room: ApiResponse<CreateRoomResponseDto> = await axios.post(
    
    `${API_HOST}/room/${id}`,
    param
    ,{ withCredentials: true }
  );
  return room.data;
});
// 현재 채팅방 목록을 가져옴
export const fetchRoomList = RequestAuthAPI(async () => {
  const id = await getUserID();
  const roomList: ApiResponse<Array<RoomListResponseDto>> = await axios.get(
    `${API_HOST}/room/${id}`
    ,{ withCredentials: true }
  );
  return roomList.data;
});

// 채팅방의 채팅 데이터를 가져옴
export const fetchChatting = async (param: ChattingRequestByCursorDto) => {
  const { room_id, cursor } = param;
  const chatting: ApiResponse<Array<ChattingResponseDto>> = await axios.get(
    `${API_HOST}/chatting/${room_id}?cursor=${cursor}`
    ,{ withCredentials: true }
  );
  return chatting.data;
};