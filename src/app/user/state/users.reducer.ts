import { createAction, createReducer, on } from "@ngrx/store"

export const usersReducer = createReducer(
  { maskedUserName:false },
  on(createAction('[User] Toggle Mask User Name'), state => {

    console.log("🚀 ~ file: users.reducer.ts ~ line 6 ~ on ~ state", state)

    return {
      ...state,
      maskedUserName: !state.maskedUserName
    }
  }));
