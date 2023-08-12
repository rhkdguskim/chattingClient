import React, {useState, ChangeEvent}  from "react";
import styled from 'styled-components';
import { MainHeader, TitleBlock } from "../../styles/BaseStyle";
import { Link } from 'react-router-dom';
import { PAGE_PATHS } from '../../config';
import FindFriendWindow from './FindFriendWindow'
const Wrapper = styled.header`
  width: 100%;
  height: 200px;
  padding-top: 100px;
  & img {
    display: block;
    margin: 0 auto;
  }
`;

interface Props {
  changeSearch(value: string): void;
}

const Header: React.FC<Props> = ({ changeSearch }) => {
  const [isopenFindFriend, openFindFriend] = useState(false);

  // 친구 찾기 창(modal)
  const showFindFriend = isopenFindFriend ? (
    <FindFriendWindow
      onClose={() => openFindFriend(false)}
      overlayClose={false}
    />
  ) : null;

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    changeSearch(event.target.value);
  };
  return (
    <React.Fragment>
      {showFindFriend}
      <MainHeader>
        <TitleBlock>
          <h2>친구</h2>
          <i
            className="fas fa-user-plus"
            title="친구 추가"
            onClick={() => openFindFriend(true)}
          />
        </TitleBlock>
        <input placeholder="이름 검색" onChange={onSearchChange} />
      </MainHeader>
    </React.Fragment>
  );
};

export default Header;