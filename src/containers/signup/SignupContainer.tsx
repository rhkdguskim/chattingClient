import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Navigate } from "react-router";

import { Header, Content, Footer } from "../../components/signup";
import { RootState } from "../../store/reducers";
import { AuthState } from "../../store/reducers/auth";
import { PAGE_PATHS } from "../../config";
const Wrapper = styled.div`
    width: 360px;
    height: 700px;
    background-color: rgba(255, 255, 255, 0.9);  // 투명도 조절
    border-radius: 15px;  // 둥근 모서리
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);  // 그림자 효과 추가
`;

interface Props {
  authState: AuthState;
}

class SignupContainer extends Component<Props> {
  render() {
    const { access_token } = this.props.authState;
    if (access_token) return <Navigate to={PAGE_PATHS.FRIENDS} />;

    return (
      <Wrapper>
        <Header />
        <Content />
        <Footer />
      </Wrapper>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  authState: state.auth,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer);
