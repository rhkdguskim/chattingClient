import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import rootReducer from "./reducers";

const sagaMiddleware = createSagaMiddleware({
  onError: (error) => {
    console.error('Saga error:', error);
  },
});

const logger = createLogger({
  collapsed: true
});

// createStore대신 configureStore를 사용한다
function createStore() {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware, logger], // 사용할 미들웨어들을 나열
    devTools: true, // 기본은 true로 설정되어있다. 개발자 도구의 사용 여부를 정한다.
    
  });

  sagaMiddleware.run(rootSaga);

  return store;
} 


export default createStore;