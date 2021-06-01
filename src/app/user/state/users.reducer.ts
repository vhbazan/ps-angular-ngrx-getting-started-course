import { createAction, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store"

interface UserState {
  currentUser: string;
  maskedUserName: boolean;
}

const initialUserState: UserState = {
  currentUser: '',
  maskedUserName: false
}

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getMaskedUserName = createSelector(
  getUserFeatureState,
  state => state.maskedUserName
);

export const getCurrentUser = createSelector(
  getUserFeatureState,
  state => state.currentUser
);

export const usersReducer = createReducer(
  initialUserState,
  on(createAction('[User] Toggle Mask User Name'), state => {

    console.log("🚀 ~ file: users.reducer.ts ~ line 6 ~ on ~ state", state)

    return {
      ...state,
      maskedUserName: !state.maskedUserName
    }
  }));
