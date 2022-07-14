import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { campsitesReducer } from '../features/campsites/campsitesSlice';
import { commentsReducer } from '../features/comments/commentsSlice';
import { partnersReducer } from '../features/partners/partnersSlice';
import { promotionsReducer } from '../features/promotions/promotionsSlice';
import { userReducer } from '../features/user/userSlice';
import { staffReducer } from '../features/staff/staffSlice';
import { teamsReducer } from './teams/TeamSlice';

export const store = configureStore({
    reducer: {
        campsites: campsitesReducer,
        partners: partnersReducer,
        promotions: promotionsReducer,
        comments: commentsReducer,
        user: userReducer,
        staff: staffReducer,
        teams: teamsReducer

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([logger])
});

console.log(store.getState())