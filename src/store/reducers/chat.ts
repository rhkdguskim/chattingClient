import { ChatTypes, ChatActionTypes } from '../actions/chatting';
import { ChattingDto } from '../../dto/chatting';

export interface ChatState extends ChattingDto {
  isChattingRoomShown: boolean;
  isFetchChattingLoading: boolean;
}

const initialState: ChatState = {
  id: -1,
  type: undefined,
  room_name: '',
  participant: [],
  chatting: [],
  last_read_chat_id: -1,
  isChattingRoomShown: false,
  isFetchChattingLoading: false
};

const chatReducer = (state = initialState, action: ChatActionTypes) => {
  switch (action.type) {
    case ChatTypes.SHOW_CHATTING_ROOM:
      return {
        ...state,
        ...action.payload,
        isChattingRoomShown: true
      };
    case ChatTypes.HIDE_CHATTING_ROOM:
      return {
        ...state,
        room_id: -1,
        type: undefined,
        participant: [],
        chatting: [],
        isChattingRoomShown: false,
        isFetchChattingLoading: false
      };
    case ChatTypes.CHANGE_CHATTING_ROOM_INFO:
      return {
        ...state,
        ...action.payload
      };
    case ChatTypes.ADD_CHATTING:
      return {
        ...state,
        chatting: [...state.chatting, action.payload]
      };
    case ChatTypes.READ_CHATTING:
      const len = state.chatting.length - 1;
      const range = action.payload;
      // range에 포함되는 채팅만 숫자를 줄임
      for (let i = len; i >= 0; i--) {
        const id = state.chatting[i].id;
        if (id <= range[0]) {
          break;
        } else if (id <= range[1]) {
          state.chatting[i].not_read--;
        }
      }
      return {
        ...state
      };
    case ChatTypes.FETCH_CHATTING_REQUEST:
      return {
        ...state,
        isFetchChattingLoading: true
      };
    case ChatTypes.FETCH_CHATTING_SUCCESS:
      if (action.payload.length === 0) {
        return {
          ...state,
          isFetchChattingLoading: true
        };
      }
      return {
        ...state,
        chatting: [...action.payload, ...state.chatting],
        isFetchChattingLoading: false
      };
    default:
      return state;
  }
};

export default chatReducer;