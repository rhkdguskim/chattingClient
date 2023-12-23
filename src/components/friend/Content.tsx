import React from "react";
import styled from "styled-components";
import { MainContent } from "../../styles/BaseStyle";
import { BASE_IMG_URL } from "../../config";
import { UserDataDto, UserResponseDto } from "../../dto/user";
import { CreateRoomRequestDto, RoomListResponseDto } from "../../dto/chatting";
import { createRoom } from "../../apis/chatting";

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
    text-align: left;
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

interface Props {
  search: string;
  userData: UserDataDto;
  showProfile(userData: UserResponseDto): void;
  showChattingRoom(param: RoomListResponseDto): void;
}

interface FriendRowProps {
  name: string;
  status_msg: string;
  profile_img_url: string;
  profileImgClick(): void;
  onDoubleClick(): void;
}

// 친구 목록
const FriendRow: React.FC<FriendRowProps> = (props) => {
  const { name, status_msg, profile_img_url } = props;
  const { profileImgClick, onDoubleClick } = props;
  return (
    <li onDoubleClick={onDoubleClick}>
      <img
        src={profile_img_url || BASE_IMG_URL}
        alt="profile Image"
        onClick={profileImgClick}
      />
      <p>
        <b>{name}</b>
      </p>
      <p>{status_msg}</p>
    </li>
  );
};

// 친구 목록
const Content: React.FC<Props> = ({
  search,
  userData,
  showProfile,
  showChattingRoom,
}) => {
  // 검색된 친구들만 보여줍니다. 검색을 안 할 경우 모든 찬구를 보여줍니다.
  const searchRemoveBlank = search.replace(/ /g, "");
  const reg_exp = new RegExp(`^.*${searchRemoveBlank}.*$`);
  const friendsList = userData.friends_list.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  const searchedFriends = friendsList.filter((friend) => {
    return friend.name.replace(/ /g, "").match(reg_exp);
  });
  const renderFriends = searchedFriends.map((friend) => {
    const roomObj: CreateRoomRequestDto = {
      room_name: `${friend.name}`,
      participant: [{id:userData.id}, {id:friend.id }],
    };
    return (
      <FriendRow
        {...friend}
        key={friend.id}
        profileImgClick={() => showProfile(friend)}
        onDoubleClick={async () => {
          const room = await createRoom(roomObj);
          const roomObjChange: RoomListResponseDto = {
            ...room,
            room_name: friend.name,
            participant: [userData, { ...friend }],
          };
          showChattingRoom(roomObjChange);
        }}
      />
    );
  });

  const onMyBlockDoubleClick = async () => {
    const roomObj: CreateRoomRequestDto = {
      room_name: userData.name,
      participant: [{id:userData.id}],
    };
    const room = await createRoom(roomObj);
    const roomObjChange: RoomListResponseDto = {
      ...room,
      participant: [userData],
    };
    showChattingRoom(roomObjChange);
  };
  return (
    <MainContent>
      {search ? null : (
        <MyProfileBlock onDoubleClick={onMyBlockDoubleClick}>
          <img
            src={userData.profile_img_url || BASE_IMG_URL}
            alt="profile Image"
            onClick={() => showProfile(userData)}
          />
          <p>
            <b>{userData.name}</b>
          </p>
          <p>{userData.status_msg}</p>
        </MyProfileBlock>
      )}
      <FriendsBorder>
        <p style={{ textAlign: "left" }}>{`친구 ${renderFriends.length}`}</p>
      </FriendsBorder>
      <ul style={{ textAlign: "left" }}>{renderFriends}</ul>
    </MainContent>
  );
};

export default Content;
