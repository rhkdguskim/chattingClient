import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { Header, Content } from "../../components/friend";
import { RootState } from '../../store/reducers';
import { AuthState } from "../../store/reducers/auth";
import { AuthActions } from '../../store/actions/auth';
import { Dispatch, bindActionCreators } from 'redux';

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
  authActions: typeof AuthActions;
  authState: AuthState;
}

const FriendContainer: React.FC<Props> = (props) => {
  const { logout, changeMessage } = props.authActions;
  const { token } = props.authState;


  const contentProps = {
    logout,
};

  return (
    <Wrapper>
      <Header {...contentProps} />
      <Content />
    </Wrapper>
  );
};

const mapStateToProps = (state: RootState) => ({
  authState: state.auth,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  authActions: bindActionCreators(AuthActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendContainer);