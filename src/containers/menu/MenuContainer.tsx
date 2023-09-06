import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { Socket } from "socket.io-client";
import { MenuRoute } from "../../routes/";
import { MenuSideBar } from "../../components/menu/";
import { AuthActions } from "../../store/actions/auth";
import { UserActions } from "../../store/actions/user";
import { ChatActions } from "../../store/actions/chatting";
import { RootState } from "../../store/reducers";
import { PAGE_PATHS } from "../../config";
import { Auth } from "../../dto/auth";
import { ProfileContainer, ChattingRoomContainer } from "../";
import { ChattingResponseDto, UpdateRoomListDto } from "../../dto/chatting";
import { ChattingContainer, FriendsContainer } from "../";

const Wrapper = styled.main`
  width: 100%;
  display: flex;
`;

interface Props {
  rootState: RootState;
  authActions: typeof AuthActions;
  userActions: typeof UserActions;
  chatActions: typeof ChatActions;
}

const MenuContainer: React.FC<Props> = (props) => {
  const { authActions, chatActions, userActions } = props;
  const chatState = props.rootState.chat;
  const [currentView, setCurrentView] = useState("Friend");
  const [prevChatRoomId, setPrevChatRoomId] = useState(0);

  // 초기 연결시에만 들어옴.
  useEffect(() => {
    const auth = props.rootState.auth.auth;
    if (auth) {
      const socket = props.rootState.auth.socket;
      props.userActions.fetchUser(auth.user_id);
      props.userActions.fetchFriends(auth.id);
      props.userActions.fetchRoomList(auth.id);
      if (socket) {
        socket.on("connect", () => {
          console.log("소켓이 재 연결되어 다시 Join 합니다.");
          socket.emit("Join");
        });
        socket.emit("Join");
        socket.on("SendMessage", (response: ChattingResponseDto) => {
          updateRooms(response);
        });
      }
    }

    // useEffect의 반환값으로 해제 함수를 반환
    return () => {
      if (socket) {
        socket.off("SendMessage");
      }
    };
  }, []);

  useEffect(() => {
    if (prevChatRoomId !== chatState.id) {
      setPrevChatRoomId(chatState.id);
      const socket = props.rootState.auth.socket;
      const { addChatting } = props.chatActions;
      if (socket) {
        socket.emit("Join"); // 채팅방생성시에 리로딩
        socket.on("SendMessage", async (response: ChattingResponseDto) => {
          if (response.room_id === chatState.id) {
            await addChatting(response);
          }
          await updateRooms(response);
        });
      }
    }
    return () => {
      if (socket) {
        socket.off("SendMessage");
      }
    };
  }, [chatState.id]);

  const onShowView = (view: string) => {
    setCurrentView(view);
  };

  const updateRooms = async (response: ChattingResponseDto) => {
    const userState = props.rootState.user;
    const roomList = userState.room_list;
    const { fetchRoomList, updateRoomList } = props.userActions;

    const findRoom = roomList.find((room) => room.id === response.room_id);
    if (findRoom) {
      const haveReadChat = response.room_id === chatState.id;
      const notReadChat = haveReadChat ? 0 : findRoom.not_read_chat + 1;
      const lastReadChatId = haveReadChat
        ? response.id
        : findRoom.last_read_chat_id;
      const updateRoomObj = {
        id: response.room_id,
        last_chat: response.message,
        updatedAt: response.createdAt,
        not_read_chat: notReadChat,
        last_read_chat_id: lastReadChatId,
      };
      updateRoomList(updateRoomObj);
    } else {
      await fetchRoomList(userState.id);
    }
  };

  const authState = props.rootState.auth;
  const token = authState.auth;
  const socket = authState.socket;
  const userState = props.rootState.user;
  const roomList = userState.room_list;

  // 로그인 상태가 아니라면 로그인 메뉴로 이동합니다.
  if (!token) {
    return <Navigate to={PAGE_PATHS.LOGIN} />;
  }

  return (
    <React.Fragment>
      <ProfileContainer />
      {chatState.isChattingRoomShown ? <ChattingRoomContainer /> : null}
      <Wrapper>
        <MenuSideBar
          roomList={roomList}
          socket={socket}
          logout={authActions.logout}
          onShowView={onShowView}
        />
        {currentView === "Friend" ? (
          <FriendsContainer />
        ) : (
          <ChattingContainer />
        )}
      </Wrapper>
    </React.Fragment>
  );
};

const mapStateToProps = (state: RootState) => ({
  rootState: state,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  authActions: bindActionCreators(AuthActions, dispatch),
  userActions: bindActionCreators(UserActions, dispatch),
  chatActions: bindActionCreators(ChatActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);
