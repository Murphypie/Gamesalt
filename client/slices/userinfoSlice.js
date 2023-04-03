import { createSlice } from '@reduxjs/toolkit';

// export const fetchUserData = createAsyncThunk(
//     'user/fetchUserData',
//     async (userId, thunkAPI) => {
//       const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
//       const data = await response.json();
//       return data;
//     }
//   );
  
export const userInfo = createSlice({
    name: "userInfo",
    initialState:{
        userid: "",
        firstName: "",
        lastName:"",
        emailAddress:"",
        steamid:"",
    },
    reducers:{
        loginReducer: (state, action) =>{
            const {userid, firstName, lastName, email, steamid} = action.payload
            state.userid = userid;
            state.firstName = firstName;
            state.lastName = lastName;
            state.emailAddress = email;
            state.steamid = steamid;
        }
    }
});

export const{
    loginReducer
} = userInfo.actions;

export default userInfo.reducer;

export const userInfoState = (state) => state;