import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Main } from '../../styles/BaseStyle';
import { Header, Content } from "../../components/friend";
import { RootState } from '../../store/reducers';
import { Dispatch, bindActionCreators } from 'redux';
import { UserActions } from '../../store/actions/user';
import { ProfileActions } from '../../store/actions/profile';
import { ChatActions } from '../../store/actions/chatting';

const Wrapper = styled.div`
  margin: 0 auto;
  width: 50%;
  min-height: 95vh;
  border: 1px solid #dadada;
  @media only screen and (max-width: 800px) {
    width: 95%;
  }
`;
interface Props {
  rootState: RootState;
  userActions: typeof UserActions;
  profileActions: typeof ProfileActions;
  chatActions: typeof ChatActions;
}

const FriendsContainer: React.FC<Props> = ({
  rootState,
  userActions,
  profileActions,
  chatActions
}) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    chatActions.hideChattingRoom();
    window.scrollTo(0, 0);
  }, [chatActions]);

  const userState = rootState.user;

  const changeSearch = (param: string) => {
    setSearch(param);
  };

  return (
    <Main>
      <Header changeSearch={changeSearch} />
      <Content
        search={search}
        userData={userState}
        showProfile={profileActions.showProfile}
        showChattingRoom={chatActions.showChattingRoom}
      />
    </Main>
  );
}

const mapStateToProps = (state: RootState) => ({
  rootState: state
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  userActions: bindActionCreators(UserActions, dispatch),
  profileActions: bindActionCreators(ProfileActions, dispatch),
  chatActions: bindActionCreators(ChatActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendsContainer);