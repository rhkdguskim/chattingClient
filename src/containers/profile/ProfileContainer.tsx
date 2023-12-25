import React, { Component } from "react";
import styled from "styled-components";
import { UserProfile, Menu } from "../../components/profile";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { RootState } from "../../store/reducers";
import { ProfileActions } from "../..//store/actions/profile";
import { UserActions } from "../..//store/actions/user";
import { ChatActions } from "../../store/actions/chatting";
import Modal from "../../page/Modal";
import { CreateRoomRequestDto, RoomListResponseDto } from "../../dto/chatting";
import { AddFriendRequestDto } from "../../dto/friend";
import { addFriendRequest } from "../../apis/friend";
import { createRoom } from "../../apis/chatting";

const Wrapper = styled.main`
  width: 360px;
  height: 580px;
  margin: auto;
  color: #fff;
  text-align: center;
`;
const BackgroundBase = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: #848b91;
  z-index: -1;
  & img {
    width: 100%;
    height: 100%;
    opacity: 0.6;
  }
`;
const CancelIcon = styled.i`
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 15px;
  color: #fff;
  z-index: 100;
  cursor: pointer;
`;

interface Props {
  rootState: RootState;
  userActions: typeof UserActions;
  profileActions: typeof ProfileActions;
  chatActions: typeof ChatActions;
}

class ProfileContainer extends Component<Props> {
  render() {
    const profileState = this.props.rootState.profile;
    const userState = this.props.rootState.user;
    const chatState = this.props.rootState.chat;
    const isMe = profileState.id === userState.id;
    const isFriend = !!userState.friends_list.find(
      (friend) => friend.id === profileState.id,
    );

    const { hideProfile } = this.props.profileActions;
    const { showChattingRoom, hideChattingRoom } = this.props.chatActions;
    const setBackground = profileState.background_img_url ? (
      <img src={profileState.background_img_url} alt="bg_image" />
    ) : (
      ""
    );
    if (!profileState.isProfileShown) return null;

    const onChatClick = async (isSingle: boolean) => {
      const participant = isSingle ? [profileState] : [profileState, userState];
      const roomObj: CreateRoomRequestDto = {
        room_name: "",
        participant,
      };
      const room = await createRoom(roomObj);
      const roomObjChanged: RoomListResponseDto = {
        ...room,
        participant,
      };

      hideProfile();
      if (chatState.isChattingRoomShown) {
        hideChattingRoom();
      }
      showChattingRoom(roomObjChanged);
    };

    const onAddFriendClick = async () => {
      const my_id = userState.id;
      const friend_id = profileState.id;
      const friend_name = profileState.name;
      const { addFriend } = this.props.userActions;
      const request: AddFriendRequestDto = { friend_id, friend_name };
      try {
        await addFriendRequest(request);
        addFriend({...profileState});
      } catch (err) {
        alert("친구 추가 실패");
      }
    };
    return (
      <Modal onClose={hideProfile}>
        <Wrapper>
          <BackgroundBase>{setBackground}</BackgroundBase>
          <CancelIcon className="fas fa-times" onClick={hideProfile} />
          <UserProfile />
          <Menu
            isMe={isMe}
            isFriend={isFriend}
            onAddFriendClick={onAddFriendClick}
            onChatClick={onChatClick}
          />
        </Wrapper>
      </Modal>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  rootState: state,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  userActions: bindActionCreators(UserActions, dispatch),
  profileActions: bindActionCreators(ProfileActions, dispatch),
  chatActions: bindActionCreators(ChatActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
