import React from "react";
import {
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import { PAGE_PATHS } from "../config";
import { FriendsContainer, ChattingContainer } from "../containers/";

const MenuRoute: React.FC = () => {
  return (
    <Routes>
      <Route path={PAGE_PATHS.FRIENDS} element={<FriendsContainer />} />
      <Route path={PAGE_PATHS.CHATTING} element={<ChattingContainer />} />
      <Route
        path={PAGE_PATHS.MENU}
        element={<Navigate to={PAGE_PATHS.FRIENDS} />}
      />
    </Routes>
  );
};

export default MenuRoute;
