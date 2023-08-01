import { Header, Content, Footer } from "../../components/login";
import styled from 'styled-components';
import { AuthState } from "../../store/reducers/auth";
import { AuthActions } from "../../store/actions/auth";
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { RootState } from '../../store/reducers';

const Wrapper = styled.div`
  width: 360px;
  height: 600px;
  background-color: #ffeb33;
`;

interface Props {
    authActions: typeof AuthActions;
    authState: AuthState;
  }

const LoginContainer : React.FC<Props>  = (props) => {


    const { login, changeMessage } = props.authActions;
    const { token, loginFailuerMsg, loggingIn } = props.authState;

    const contentProps = {
        login,
        changeMessage,
        loginFailuerMsg,
        loggingIn
    };
    return (
        <Wrapper>
            <Header/>
            <Content {...contentProps}/>
            <Footer/>
        </Wrapper>
    )
}

const mapStateToProps = (state: RootState) => ({
    authState: state.auth,
  });
  
  const mapDispatchToProps = (dispatch: Dispatch) => ({
    authActions: bindActionCreators(AuthActions, dispatch),
  });

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);