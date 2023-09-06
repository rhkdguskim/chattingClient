import React from "react";
import styled from "styled-components";
import { Socket } from "socket.io-client";
import { NavLink } from "react-router-dom";
import { SideBar, Notification } from "../../styles/BaseStyle";
import { PAGE_PATHS } from "../../config";
import { RoomListResponseDto } from "../../dto/chatting";
import { NavLinkProps } from "react-router-dom";

const StyledLink = styled.div`
  display: inline-block;
  width: 100%;
  &.active {
    pointer-events: none;
    & li {
      color: black;
    }
  }
  & li {
    position: relative;
    & ${Notification} {
      top: 7px;
      left: 55px;
      font-size: 12px;
    }
  }
`;

const Menu: React.FC<NavLinkProps> = (props) => (
  <StyledLink as={NavLink} {...props} />
);

interface Props {
  roomList: Array<RoomListResponseDto>;
  socket: Socket | undefined;
  logout(): void;
  onShowView(view: string): void;
}

const MenuSideBar: React.FC<Props> = (props) => {
  const { roomList, socket, logout, onShowView } = props;
  // 읽지 않은 총 채팅 수를 의미합니다.
  const totalNotReadNum = roomList.reduce((acc, curr) => {
    return acc + curr.not_read_chat;
  }, 0);
  const showNotReadChat =
    totalNotReadNum > 0 ? (
      <Notification>
        {totalNotReadNum <= 300 ? totalNotReadNum : "300+"}
      </Notification>
    ) : null;
  const onLogoutClick = () => {
    const isLogout = window.confirm("로그아웃 하시겠습니까?");
    if (isLogout) {
      if (socket) {
        socket.close();
      }
      logout();
    }
  };
  return (
    <SideBar>
      <ul>
        <li title="친구">
          <i className="fas fa-user" onClick={() => onShowView("Friend")} />
        </li>
        <li title="채팅">
          <i
            className="fas fa-comment"
            onClick={() => onShowView("Chatting")}
          />
          {showNotReadChat}
        </li>
        <li title="로그아웃" onClick={onLogoutClick}>
          <i className="fas fa-sign-out-alt" />
        </li>
      </ul>
    </SideBar>
  );
};

export default MenuSideBar;
