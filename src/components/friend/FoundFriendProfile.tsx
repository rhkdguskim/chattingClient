import React, { MouseEvent } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { UserResponseDto } from "../../dto/user";
import { BASE_IMG_URL } from "../../config";
import { addFriendRequest } from "../../apis/friend";
import { AddFriendRequestDto } from "../../dto/friend";
import { UserActions } from "../../store/actions/user";
import { RootState } from "../../store/reducers";
import {
  ChangeChattingRoomDto,
  CreateRoomRequestDto,
  RoomListResponseDto,
  RoomType,
} from "../../dto/chatting";
import {
  ChatActions,
  changeChattingRoomInfo,
  fetchChatting,
} from "../../store/actions/chatting";
import { createRoom } from "../../apis/chatting";

const FoundUserProfile = styled.div`
  margin-top: 50px;
  & img {
    display: block;
    width: 90px;
    height: 90px;
    border-radius: 35px;
    margin: auto;
  }

  & p {
    text-align: center;
    padding-top: 10px;
  }
`;
const FindNull = styled.div`
  text-align: center;
  & p {
    padding-top: 50px;
    font-size: 15px;
    font-weight: bold;
  }
`;
const Button = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: inline-block;
  padding: 10px;
  background: #fee500;
  &:hover {
    background: #fada0a;
    cursor: pointer;
  }
`;

interface Props {
  findUserId: string;
  foundUser: UserResponseDto | undefined | null;
  onClose(): void;
  rootState: RootState;
  userActions: typeof UserActions;
  chatActions: typeof ChatActions;
}

// 친구 찾기 창에서 친구를 찾았을 때 나타나는 친구 정보
const FoundFriendProfile: React.FC<Props> = (props) => {
  const {
    findUserId,
    foundUser,
    onClose,
    rootState,
    userActions,
    chatActions,
  } = props;
  const userData = rootState.user;
  if (foundUser) {
    const my_id = userData.id;
    const friend_id = foundUser.id;
    const friend_name = foundUser.name;
    const friendsList = userData.friends_list;
    const existFriend = friendsList.find((friend) => friend.id === friend_id);
    const isMe = my_id === friend_id;
    const { addFriend } = userActions;
    const { showChattingRoom } = chatActions;
    // 친구 추가
    const onAddFriendClick = async (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const request: AddFriendRequestDto = { friend_id, friend_name };
      try {
        await addFriendRequest(request);
        await addFriend(foundUser);
        await onClose();
      } catch (err) {
        alert("친구 추가 실패");
      }
    };

    const onChatClick = () => {
      const roomObj: CreateRoomRequestDto = {
        room_name: foundUser.name,
        participant: existFriend ? [existFriend, userData] : [userData],
      };
      createRoom(roomObj).then((room) => {
        if (room) {
          const createRoomObj: CreateRoomRequestDto = {
            room_name: room.room_name,
            participant: existFriend ? [existFriend, userData] : [userData],
          };
          const roomObj: RoomListResponseDto = {
            ...room,
            participant: existFriend ? [existFriend, userData] : [userData],
          };
          showChattingRoom(roomObj);
        }
      });
      onClose();
    };

    /** 
            이미 친구이거나 나일 경우 => 1:1 채팅 버튼, 
            아닐 경우 => 친구 추가 버튼 
        **/
    const renderBtn =
      existFriend || isMe ? (
        <Button onClick={onChatClick}>1:1 채팅</Button>
      ) : (
        <Button onClick={onAddFriendClick}>친구 추가</Button>
      );

    return (
      <FoundUserProfile>
        <img
          src={foundUser.profile_img_url || BASE_IMG_URL}
          alt="profile_img"
        />
        <p>{existFriend?.name || foundUser.name}</p>
        {renderBtn}
      </FoundUserProfile>
    );
  }

  // 친구를 찾지 못한 경우 나타나는 컴포넌트
  if (foundUser === null) {
    return (
      <FindNull>
        <p>{`'${findUserId}'를 찾을 수 없습니다.`}</p>
      </FindNull>
    );
  }
  return null;
};

const mapStateToProps = (state: RootState) => ({
  rootState: state,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  userActions: bindActionCreators(UserActions, dispatch),
  chatActions: bindActionCreators(ChatActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FoundFriendProfile);
