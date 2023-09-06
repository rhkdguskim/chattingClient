import FriendContainer from "../containers/friend/FriendContainer";
import styled from "styled-components";
import { ProfileContainer } from "../containers";
import { MenuContainer } from "../containers";
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: #f5f6f7;
  padding: 25px 0;
`;

const Friend: React.FC = () => {
  return (
    <Wrapper>
      <MenuContainer />
    </Wrapper>
  );
};

export default Friend;
