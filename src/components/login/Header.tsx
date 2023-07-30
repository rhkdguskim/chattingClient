import React, {useState}  from "react";
import styled from 'styled-components';

const Wrapper = styled.header`
  width: 100%;
  height: 200px;
  padding-top: 100px;
  & img {
    display: block;
    margin: 0 auto;
  }
`;

const Header : React.FC  = ()  => {
    return (
       <Wrapper>
        카카오톡 로그인
       </Wrapper>
    )
}

export default Header;