import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchComments = createAsyncThunk('posts/fetchComments', async () => {
    const { data } = await axios.get('/comments');
    console.log('a11111', data);
    return data;
});

export const addComments = createAsyncThunk('posts/addComments', async ({ text, id }) => {
    const { data } = await axios.post(`/posts/comments/${id}`, { text });

    return data;
});


const initialState = {
    items: [],
    status: 'loading'
}


const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchComments.pending]: (state) => {
            state.items = [];
            state.status = 'loading';
        },
        [fetchComments.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = 'loaded';
        },

        [fetchComments.rejected]: (state) => {
            state.items = [];
            state.status = 'error'
        },

        [addComments.pending]: (state) => {
                state.status = 'loading';
        },
        [addComments.fulfilled]: (state, action) => {
            state.items.push(action.payload)
            
        },

        [addComments.rejected]: (state) => {
            state.items = [];
            state.status = 'error'
        },
        //  Получение статей


    }
});

export const commentsReducer = commentsSlice.reducer;