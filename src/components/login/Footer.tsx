import React, {useState}  from "react";
import styled from 'styled-components';

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
        Login Footer
       </Wrapper>
    )
}

export default Footer;