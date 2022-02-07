import { createSlice } from '@reduxjs/toolkit';
// import { fetchFavorites, toggleFavorites } from '../actions/users';

export const userSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user_id: null,
    profilePic: ''

  },
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload.token;
      state.user_id = payload.user_id;
      state.profilePic = payload.profilePic
    },
    logout: (state, { payload }) => {
      state.token = null;
      state.user_id = null;
      state.profilePic = '';
    },
    updateUser: (state,  { payload }) => {
      state.profilePic = payload.profilePic
    },
  }
});

export const { setToken, logout ,updateUser} = userSlice.actions;
