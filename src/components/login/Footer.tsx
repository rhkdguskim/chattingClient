import React, {useState}  from "react";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PAGE_PATHS } from '../../config';

const Wrapper = styled.header`
  & ul {
    display: flex;
    justify-content: center;
    & li {
      color: #5a5a5a;
    }
  }
`;

const Footer : React.FC  = ()  => {
    return (
       <Wrapper>
        <ul>
        <li>
        <Link to={PAGE_PATHS.SIGNUP}>회원 가입</Link>
        </li>
        </ul>
       </Wrapper>
    )
}

export default Footer;