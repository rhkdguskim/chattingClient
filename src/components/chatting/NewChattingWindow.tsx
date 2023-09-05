import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import Modal from '../../page/Modal';
import { MainContent } from '../../styles/BaseStyle';
import { BASE_IMG_URL } from '../../config';
import { UserDataDto, UserResponseDto } from '../../dto/user';
import { CreateRoomRequestDto, RoomListResponseDto } from '../../dto/chatting';
import { createRoom } from '../../apis/chatting';

// 새로운 채팅창 => 친구 목록에서 대화할 상대를 골라 채팅하도록 하는 컴포넌트입니다.
const Wrapper = styled.div`
  position: relative;
  width: 380px;
  height: 90vh;
  border: 1px solid #969696;
  margin: auto;
  color: #000;
  background: #fff;
`;
const HeaderWrapper = styled.div`
  width: 100%;
  height: 120px;
  & h4 {
    padding: 25px 20px;
    font-size: 18px;
    font-weight: 600;
  }
  & input {
    display: block;
    outline: none;
    border: 1px solid #969696;
    border-radius: 20px;
    background-color: #f6f6f7;
    width: 90%;
    padding: 8px 15px;
    margin: 0 auto;
    &:focus {
      &::placeholder {
        color: #f6f6f7;
      }
    }
  }
`;
const ContentWrapper = styled(MainContent)`
  position: absolute;
  margin: 0;
  top: 120px;
  bottom: 80px;
  left: 0px;
  right: 0px;
  width: 100%;
  overflow: auto;

  & h6 {
    font-size: 12px;
    color: #b4b4b4;
    padding: 10px 20px;
  }
  & li {
    padding-left: 80px;
    & img {
      left: 20px;
      top: 10px;
      cursor: auto;
    }
  }
  & label {
    position: relative;
    display: block;
    width: 100%;
    & input {
      position: absolute;
      top: 25px;
      right: 15px;
    }
    &.selected {
      background-color: #cccccc;
      pointer-events: none;
    }
  }
`;
const FooterWrapper = styled.div`
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 80px;
  border-top: 1px solid #dcdcdc;
  text-align: right;
  & button {
    position: relative;
    transform: translateY(50%);
    border: 1px solid #dcdcdc;
    background: #fff;
    padding: 10px 25px;
    margin-right: 10px;
    cursor: pointer;
    &.confirm {
      background: #fee500;
      &:hover {
        background: #fada0a;
      }
    }
    &.disabled {
      color: #969696;
      background: #e2e2e2;
      pointer-events: none;
    }
    &.cancel {
      &:hover {
        background: #f5f5f5;
      }
    }
  }
`;
const CancelIcon = styled.i`
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 15px;
  color: #000;
  z-index: 100;
  cursor: pointer;
`;

interface Props {
  userState: UserDataDto;
  onClose(): void;
  showChattingRoom(param: RoomListResponseDto): void;
}

interface HeaderProps {
  setSearch(search: string): void;
}

interface ContentProps {
  search: string;
  selectedFriend?: UserResponseDto;
  userState: UserDataDto;
  onSelectedFriendChange(friend: UserResponseDto): void;
}
interface FooterProps {
  isCanSubmit: boolean;
  onSubmit(): void;
  onClose(): void;
}

interface FriendRowProps {
  isSelected: boolean;
  friend: UserResponseDto;
  onSelectedFriendChange(): void;
}

const FriendRow: React.FC<FriendRowProps> = props => {
  const { name, profile_img_url } = props.friend;
  const { isSelected, onSelectedFriendChange } = props;

  return (
    <React.Fragment>
      <label className={isSelected ? 'selected' : ''}>
        <li>
          <img src={profile_img_url || BASE_IMG_URL} alt="profile Image" />
          <p>
            <b>{name}</b>
          </p>
        </li>
        <input
          type="radio"
          name="friend"
          onChange={onSelectedFriendChange}
          checked={isSelected}
        />
      </label>
    </React.Fragment>
  );
};

const Header: React.FC<HeaderProps> = props => {
  const { setSearch } = props;
  // 친구 찾기
  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const searchRemoveBlank = event.target.value.replace(/ /g, '');
    setSearch(searchRemoveBlank);
  };
  return (
    <HeaderWrapper>
      <h4>대화 상대 선택</h4>
      <input placeholder="이름 검색" onChange={onSearchChange} />
    </HeaderWrapper>
  );
};

const Content: React.FC<ContentProps> = props => {
  const { search, userState, selectedFriend } = props;
  const { onSelectedFriendChange } = props;
  const reg_exp = new RegExp(`^.*${search}.*$`);
  const friendsList = userState.friends_list.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  // 검색한 친구만 나타냅니다. 만약 검색한 것이 없다면 모든 친구를 나타냅니다.
  const searchedFriends = friendsList.filter(friend => {
    return friend.name.replace(/ /g, '').match(reg_exp);
  });
  const renderFriends = searchedFriends.map(friend => {
    const isSelected = selectedFriend ? friend.id === selectedFriend.id : false;
    return (
      <FriendRow
        friend={friend}
        isSelected={isSelected}
        key={friend.id}
        onSelectedFriendChange={() => onSelectedFriendChange(friend)}
      />
    );
  });
  return (
    <ContentWrapper>
      <h6>{renderFriends.length > 0 ? `친구 ${renderFriends.length}` : ''}</h6>
      <form>
        <ul>{renderFriends}</ul>
      </form>
    </ContentWrapper>
  );
};

const Footer: React.FC<FooterProps> = props => {
  const { isCanSubmit, onSubmit, onClose } = props;
  const buttonClassName = isCanSubmit ? 'confirm' : 'disabled';
  return (
    <FooterWrapper>
      <button className={buttonClassName} onClick={onSubmit}>
        확인
      </button>
      <button className="cancel" onClick={onClose}>
        취소
      </button>
    </FooterWrapper>
  );
};

const NewChattingWindow: React.FC<Props> = props => {
  const { userState, onClose, showChattingRoom } = props;
  const [search, setSearch] = useState('');
  const [selectedFriend, setSelectedFriend] = useState(
    undefined as undefined | UserResponseDto
  );
  const onSelectedFriendChange = (friend: UserResponseDto) => {
    setSelectedFriend(friend);
  };
  const onSubmit = async () => {
    if (selectedFriend) {
      const confirmChatting = window.confirm(
        `${selectedFriend.name}님과 대화 하시겠습니까?`
      );
      if (confirmChatting) {
        const roomObj: CreateRoomRequestDto = {
          room_name: selectedFriend.name,
          participant: [selectedFriend, userState]
        };

        const room = await createRoom(roomObj)
        const roomObjChanged : RoomListResponseDto = {
          ...room,
          participant: [selectedFriend, userState]
        }
        showChattingRoom(roomObjChanged);
        onClose();
      }
    }
  };
  return (
    <Modal onClose={onClose} overlayClose={false}>
      <Wrapper>
        <CancelIcon className="fas fa-times" title="닫기" onClick={onClose} />
        <Header setSearch={setSearch} />
        <Content
          userState={userState}
          search={search}
          selectedFriend={selectedFriend}
          onSelectedFriendChange={onSelectedFriendChange}
        />
        <Footer
          isCanSubmit={selectedFriend ? true : false}
          onSubmit={onSubmit}
          onClose={onClose}
        />
      </Wrapper>
    </Modal>
  );
};

export default NewChattingWindow;