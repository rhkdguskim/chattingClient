import React, {useState}  from "react";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PAGE_PATHS } from '../../config';

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
  logout(): void;
}

const Header : React.FC<Props>  = (props)  => {
  const { logout } = props;
    return (
       <Wrapper>
            <Link to={PAGE_PATHS.LOGIN} onClick={logout}>로그아웃</Link>
       </Wrapper>
    )
}

export default Header;