import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/posts";
import { authReduser } from "./slices/auth";
import { commentsReducer } from "./slices/comment";

const store = configureStore({
    reducer: {
        posts: postsReducer,
        auth: authReduser,
        comments: commentsReducer,
    }
});


export default store;