import { Header, Content, Footer } from "../../components/login";
import styled from 'styled-components';
import { AuthState } from "../../store/reducers/auth";
import { AuthActions } from "../../store/actions/auth";
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { RootState } from '../../store/reducers';
import { PAGE_PATHS } from '../../config';
import { Navigate } from 'react-router-dom';

const Wrapper = styled.div`
  width: 360px;
  height: 800px;
  background-color: #ffeb33;
`;

interface Props {
    authActions: typeof AuthActions;
    authState: AuthState;
  }

const LoginContainer : React.FC<Props>  = (props) => {


    const { access_token, loginFailuerMsg, loggingIn } = props.authState; // store에서 state를 가져옴.
    const { login, Sociallogin, changeMessage } = props.authActions; // store에서 dispatch를 가져옴.

    const contentProps = {
        login,
        changeMessage,
        Sociallogin,
        loginFailuerMsg,
        loggingIn
    };
    
    if (access_token) return <Navigate to={PAGE_PATHS.FRIENDS}></Navigate>;
    return (
        <Wrapper>
            <Header/>
            <Content {...contentProps}/>
            <Footer {...contentProps}/>
        </Wrapper>
    )
}

const mapStateToProps = (state: RootState) => ({ // store로부터 state를 가져와서 컴포넌트에 props로 보내준다.
    authState: state.auth,
  });
  
  const mapDispatchToProps = (dispatch: Dispatch) => ({ // dispacth를 props로 보내준다.
    authActions: bindActionCreators(AuthActions, dispatch),
  });

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);