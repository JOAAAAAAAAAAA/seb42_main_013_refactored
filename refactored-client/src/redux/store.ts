import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchReducer";
import concernReducer from "./concernReducer";
// import loginInfoReducer from "./loginInfoReducer";
import dataCreateReducer from "./dataCreateReducer";
import setTargetReducer from "./setTargetReducer";

export const store = configureStore({
  reducer: {
    searchReducer,
    concernReducer,
    loginInfoReducer,
    create: dataCreateReducer,
    target: setTargetReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
//? ReturnType: TypeScript의 유틸리티 타입 중 하나로, 함수의 반환 타입을 추출
//? store.getState: Redux store의 메서드로, 현재 store의 상태를 반환
export type AppDispatch = typeof store.dispatch;
