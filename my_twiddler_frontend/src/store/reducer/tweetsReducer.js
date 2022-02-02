import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'tweets',
    initialState: {
      tweets: [],
    },
    reducers: {
      setTweets: (state, { payload }) => {
        state.tweet = payload.token;
      },

    },
    extraReducers: {
        [fetchTweets.fulfilled]: (state, action) => {
            state.tweets = action.payload.tweets;
          },
    },
  });
  
  export const { setTweets} = userSlice.actions;