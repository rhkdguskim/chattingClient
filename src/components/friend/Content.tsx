import React from 'react';
import styled from 'styled-components';
// import { MainContent } from '~/styles/BaseStyle';
// import { UserData, UserResponseDto } from '../../dto';
// import { CreateRoomRequest } from '~/types/chatting';
import { BASE_IMG_URL } from '../../config';

const MyProfileBlock = styled.div`
  position: relative;
  padding: 25px 10px 25px 185px;
  & img {
    position: absolute;
    top: 18px;
    left: 120px;
    width: 50px;
    height: 50px;
    border-radius: 15px;
    cursor: pointer;
  }
  & p {
    color: #707070;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-height: 19px;
    font-size: 12px;
    & b {
      color: #000;
      font-weight: bold;
      font-size: 14px;
    }
  }
  &:hover {
    background-color: #eaeaeb;
  }
`;

const FriendsBorder = styled.div`
  border-top: 0.5px solid #dcdcdc;
  margin: 10px 20px 0 120px;
  padding-top: 10px;
  & p {
    font-size: 12px;
    color: #b4b4b4;
  }
`;

// 친구 목록
const Content :React.FC  = ()  => {
    return (
    <>
    로그인에 성공하였습니다.
    </>
    )
}

export default Content;