import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (page) => {
    const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
    console.log(response.data);
    return response.data;
});

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        page: 1,
        totalPages: 1,
        status: 'idle',
        error: null
    },
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = action.payload.data;
                state.totalPages = action.payload.total_pages;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { setPage } = postsSlice.actions;
export default postsSlice.reducer;
