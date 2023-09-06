import React, { Component } from "react";
import { Main } from "../../styles/BaseStyle";
import { Header, Content } from "../../components/chatting";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { RootState } from "../../store/reducers";
import { ChatActions } from "../../store/actions/chatting";
import { ProfileActions } from "../../store/actions/profile";

interface Props {
  rootState: RootState;
  profileActions: typeof ProfileActions;
  chatActions: typeof ChatActions;
}

class ChattingContainer extends Component<Props> {
  state = {
    search: "",
  };
  constructor(props: Props) {
    super(props);
    const { hideChattingRoom } = props.chatActions;
    hideChattingRoom();
    window.scrollTo(0, 0);
  }
  render() {
    const userState = this.props.rootState.user;
    const { showProfile } = this.props.profileActions;
    const { showChattingRoom } = this.props.chatActions;
    const changeSearch = (param: string) => {
      this.setState({
        ...this.state,
        search: param,
      });
    };
    const search = this.state.search.replace(/ /g, "");
    return (
      <Main>
        <Header
          userState={userState}
          showChattingRoom={showChattingRoom}
          changeSearch={changeSearch}
        />
        <Content
          search={search}
          userState={userState}
          showProfile={showProfile}
          intoRoom={showChattingRoom}
        />
      </Main>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  rootState: state,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  profileActions: bindActionCreators(ProfileActions, dispatch),
  chatActions: bindActionCreators(ChatActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChattingContainer);
