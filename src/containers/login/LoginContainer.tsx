import { Header, Content, Footer } from "../../components/login";
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 360px;
  height: 600px;
  background-color: #ffeb33;
`;


const LoginContainer : React.FC  = () => {
    return (
        <Wrapper>
            <Header/>
            <Content/>
            <Footer/>
        </Wrapper>
    )
}

export default LoginContainer;
