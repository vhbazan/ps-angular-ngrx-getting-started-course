import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store"

import * as UserActions from '../state/users.actions'
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
  on(UserActions.toggleMaskUserName, state => {

    console.log("🚀 ~ file: users.reducer.ts ~ line 6 ~ on ~ state", state)

    return {
      ...state,
      maskedUserName: !state.maskedUserName
    }
  }));
