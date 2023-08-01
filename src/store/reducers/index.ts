import { combineReducers } from 'redux';
import auth, { AuthState } from './auth';

export interface RootState {
    auth: AuthState;
}

const rootReducer = combineReducers({
    auth,
});

export default rootReducer;