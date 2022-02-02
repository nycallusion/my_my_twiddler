import { createAsyncThunk } from '@reduxjs/toolkit';

// export const fetchFavorites = createAsyncThunk(
//   'fetchFavorites',
//   async (car, thunkAPI) => {
//     const token = thunkAPI.getState().user.token;
//     const fetchUrl = `${process.env.REACT_APP_API_URL}/api/users/fetch-favorites`;
//     const response = await fetch(fetchUrl, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     let jsonData = await response.json();
//     return jsonData;
//   }
// );

// export const toggleFavorites = createAsyncThunk(
//   'toggleFavorites',
//   async (carId, thunkAPI) => {
//     const token = thunkAPI.getState().user.token;
//     const fetchUrl = `${process.env.REACT_APP_API_URL}/api/users/toggle-favorites`;
//     const response = await fetch(fetchUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ carId }),
//     });
//     let jsonData = await response.json();
//     return jsonData;
//   }
// );