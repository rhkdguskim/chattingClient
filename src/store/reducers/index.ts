import { combineReducers } from "redux";
import auth, { AuthState } from "./auth";
import user, { UserState } from "./user";
import profile, { ProfileState } from "./profile";
import chat, { ChatState } from "./chat";

export interface RootState {
  auth: AuthState;
  user: UserState;
  profile: ProfileState;
  chat: ChatState;
}

const rootReducer = combineReducers({
  auth,
  user,
  profile,
  chat,
});

export default rootReducer;
