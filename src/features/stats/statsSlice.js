import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

var Airtable = require('airtable');
var base = new Airtable({apiKey: 'key7CvA4nWviUYLcP'}).base('appmqv083cLppisF5');
const scoreCards = base('StaffScoreCards');

export const fetchStats = createAsyncThunk(
    'stats/fetchStats',
    async () => {
        const records = await scoreCards.select({view: 'All'}).firstPage()
        const miniRecords = records.map(record => ({id: record.id, fields: record.fields}));
        return miniRecords;
    }
);

export const fetchStatsByName = createAsyncThunk(
    'stats/fetchStatsByName',
    async (name) => {
        const records = await scoreCards.select({view: name}).firstPage()
        const miniRecords = records.map(record => ({id: record.id, fields: record.fields}));
        return miniRecords;
    }
);


const initialState = {
    statsArray: [],
    isLoading: true,
    errMsg: ''
};

const statsSlice = createSlice({
    name: 'stats',
    initialState,
    reducers: {
        
    },
    extraReducers: {
        [fetchStats.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchStats.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            const airTableRecords = action.payload
            const newArray = airTableRecords.map(record => ({id: record.id, fields: record.fields}))
            state.statsArray = newArray;
        },
        [fetchStats.rejected]: (state, action) => {
            state.errMsg = action.error ? action.error.message : 'Fetch failed';
        },
        [fetchStatsByName.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchStatsByName.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            // const id = action.payload[0].fields.Name
            const airTableRecords = action.payload
            const newRecords = airTableRecords.map(record => record.fields)
            // state.id = newRecords
            // state.action.payload.fields.name = newArray;
            // console.log(newRecords)
        },
        [fetchStatsByName.rejected]: (state, action) => {
            state.errMsg = action.error ? action.error.message : 'Fetch failed';
        }
    }
});

export const statsReducer = statsSlice.reducer;

export const selectStats = (state) => {
    return state.stats.statsArray;
};

export const selectStatsByName  = (name) => (state) => {
    const stats = state.stats.statsArray.filter(stat => stat.fields.name === name)
    // console.log(stats)
    return stats
};

