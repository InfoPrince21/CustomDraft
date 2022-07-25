import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { commentsReducer } from '../features/comments/commentsSlice';
import { userReducer } from '../features/user/userSlice';
import { staffReducer } from '../features/staff/staffSlice';
import { teamsReducer } from './teams/TeamSlice';

export const store = configureStore({
    reducer: {
        comments: commentsReducer,
        user: userReducer,
        staff: staffReducer,
        teams: teamsReducer

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([logger])
});

console.log(store.getState())