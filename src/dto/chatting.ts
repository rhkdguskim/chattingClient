// 서버에서 채팅방 리스트에 대한 정보를 받아올 때
import { UserResponseDto } from "./user";
export enum RoomType {
  Individual = 1,
  two = 2,
  Group= 3,
}

export enum ChatType {
  text,
  image,
  video,
}

// chat state
export interface ChattingDto {
  id: number;
  type: RoomType | undefined;
  room_name: string;
  participant: Array<UserResponseDto>;
  chatting: Array<ChattingResponseDto>;
  last_read_chat_id: number;
}

export interface RoomListResponseDto {
  id: number;
  owner_id: string;
  type: RoomType;
  room_name: string;
  participant: Array<UserResponseDto>;
  last_chat: string;
  not_read_chat: number;
  last_read_chat_id: number;
  updatedAt: Date;
}

export interface Participant {
  id : number;
}

export interface CreateRoomRequestDto {
  room_name: string;
  participant: Array<Participant>;
}

// 서버에서 채팅방 정보 가져옴
export interface CreateRoomResponseDto {
  id: number;
  type: RoomType;
  owner_id: string;
  room_name: string;
  last_chat: string;
  not_read_chat: number;
  last_read_chat_id: number;
  updatedAt: Date;
}

// 채팅방 리스트의 채팅방들 정보를 바꿀 때 요청
export interface UpdateRoomListDto {
  id: number;
  room_name?: string;
  last_chat?: string;
  not_read_chat?: number;
  last_read_chat_id?: number;
  updatedAt?: Date;
}

// 채팅 송신
export interface ChattingRequestDto {
  room_id: number;
  type: RoomType;
  participant: Array<UserResponseDto>;
  user_id: number;
  message: string;
  messageType: ChatType;
}
export interface ChatUserInfo {
  id : number;
}

export interface ChatRoomInfo {
  id : number;
}
// 채팅 수신
export interface ChattingResponseDto {
  id: number;
  room: ChatRoomInfo;
  user: ChatUserInfo;
  message: string;
  not_read_chat: number;
  createdAt: Date;
}

export interface ChattingRequestByCursorDto {
  room_id: number;
  cursor: number | null;
}

// 현재 채팅방의 정보를 바꿀 때 요청
export interface ChangeChattingRoomDto {
  id?: number;
  room_name?: string;
  participant?: Array<UserResponseDto>;
  last_read_chat_id?: number;
}

// 채팅 읽었음을 알려줄 떄 사용
export interface ReadChatRequestDto {
  id : number;
  user_id: number; // 사용자 ID
  room_id: number; // 방 ID
}

// 상대방이 채팅 읽었음을 알려 올 때 사용
export interface ReadChatResponseDto {
  id : number;
  user_id: number; // 사용자 ID
  room_id: number; // 방 ID
}
