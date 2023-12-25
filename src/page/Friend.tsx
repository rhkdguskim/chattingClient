import styled from "styled-components";
import { MenuContainer } from "../containers";
const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    background-color: #5c9dde;
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
