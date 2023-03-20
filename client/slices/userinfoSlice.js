import { createSlice } from '@reduxjs/toolkit';


export const fetchUserData = createAsyncThunk(
    'user/fetchUserData',
    async (userId, thunkAPI) => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      const data = await response.json();
      return data;
    }
  );


const userInfo = createSlice({
    name:"userInfo",
    initialState: {
        accountName:"",
        email: "",
        firstName: "",
        lastName: "",
        steamProfileId:""
    },
    reducers:{
        setUserInfo:(state,action)=>{

        }
    },
    // extraReducers: (builder) => {
    //     builder
    //       .addCase(fetchUserData.pending, (state) => {
    //         state.status = 'loading';
    //       })
    //       .addCase(fetchUserData.fulfilled, (state, action) => {
    //         state.status = 'succeeded';
    //         state.data = action.payload;
    //       })
    //       .addCase(fetchUserData.rejected, (state, action) => {
    //         state.status = 'failed';
    //         state.error = action.error.message;
    //       });
    // },

})

// export actions
export const{setUserInfo} = userInfo.actions;

// export reducer
export default userInfo.reducer;
