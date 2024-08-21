import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postsSlice'; // تأكد من أنك قمت بإنشاء postsSlice

const store = configureStore({
    reducer: {
        posts: postsReducer
    }
});

export default store;