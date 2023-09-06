import React from "react";
import styled from "styled-components";
import { UserResponseDto } from "../../dto/user";
import { BASE_IMG_URL } from "../../config";
import { SeparationBlock } from "./InfoBlock";

// 채팅방에서 채팅을 나타내는 컴포넌트
const ChatWrapper = styled.div`
  position: relative;
  display: inline-block;
  padding: 7px 8px;
  border-radius: 4px;
  margin-bottom: 7px;
  box-shadow: 0px 1px 2px 0px #8fabc7;
  max-width: 70%;
  word-wrap: break-word;
  white-space: pre-wrap;
`;
const RightBlock = styled.div`
  text-align: right;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;

  & ${ChatWrapper} {
    background-color: #ffec42;
    text-align: left;
    & span {
      position: absolute;
      display: inline-block;
      &.time {
        min-width: 65px;
        text-align: right;
        bottom: 0;
        left: -70px;
      }
      &.not-read {
        color: #ffec42;
        min-width: 30px;
        text-align: right;
        bottom: 16px;
        left: -35px;
      }
    }
  }
`;
const LeftBlock = styled.div`
  position: relative;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  padding-left: 50px;
  & ${ChatWrapper} {
    background-color: #fff;
    & span {
      position: absolute;
      &.time {
        min-width: 65px;
        text-align: left;
        bottom: 0;
        right: -70px;
      }
      &.not-read {
        color: #ffec42;
        min-width: 30px;
        text-align: left;
        bottom: 16px;
        right: -35px;
      }
    }
  }
  & img {
    position: absolute;
    top: 3px;
    left: 0;
    height: 45px;
    width: 45px;
    border-radius: 20px;
    float: left;
    cursor: pointer;
  }
`;
const NameBlock = styled.div`
  margin-bottom: 5px;
`;

interface ChatProps {
  msg: string;
  localeTime: string;
  notRead: number;
  content?: string;
}

interface FriendChatProps {
  user: UserResponseDto;
  msg: string;
  localeTime: string;
  notRead: number;
  content?: string;
  onImgClick(): void;
}

export const Chat: React.FC<ChatProps> = ({ msg, localeTime, notRead }) => {
  return (
    <ChatWrapper>
      {msg}
      <span className="time">{localeTime}</span>
      <span className="not-read">{notRead > 0 ? notRead : ""}</span>
    </ChatWrapper>
  );
};

// 내가 보낸 채팅
export const MyChat: React.FC<ChatProps> = (props) => {
  const { content } = props;
  return (
    <React.Fragment>
      {content ? <SeparationBlock content={content} /> : null}
      <RightBlock>
        <div>
          <Chat {...props} />
        </div>
      </RightBlock>
    </React.Fragment>
  );
};

// 다른 사람이 보낸 채팅
export const FriendChat: React.FC<ChatProps> = (props) => {
  return (
    <LeftBlock>
      <div>
        <Chat {...props} />
      </div>
    </LeftBlock>
  );
};

// 다른 사람이 보냈으며, 프로필 사진을 포함하는 채팅
export const FriendChatWithThumbnail: React.FC<FriendChatProps> = (props) => {
  const { user, content, onImgClick } = props;

  if (!user) {
    return null; // 사용자가 없을 때 아무것도 렌더링하지 않음
  }

  return (
    <React.Fragment>
      {content ? <SeparationBlock content={content} /> : null}
      <LeftBlock>
        <img
          src={user.profile_img_url || BASE_IMG_URL}
          alt="thumbnail"
          onClick={onImgClick}
        />
        <NameBlock>{user.name}</NameBlock>
        <div>
          <Chat {...props} />
        </div>
      </LeftBlock>
    </React.Fragment>
  );
};
