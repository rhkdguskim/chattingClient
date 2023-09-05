import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PAGE_PATHS, API_HOST } from '../../config';
import { setAccessToken, setRefreshToken } from '../../apis/base';

const Wrapper = styled.header`
  text-align: center; /* Center align the child elements */

  ul {
    display: flex;
    justify-content: center;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin: 0 10px;
  }
`;

interface Props {

}

const Footer: React.FC<Props> = (props) => {

  return (
    <Wrapper>
      <ul>
        <li>
        <Link to={PAGE_PATHS.SIGNUP}>회원 가입</Link>
        </li>
      </ul>

      
    </Wrapper>
  );
};

export default Footer;