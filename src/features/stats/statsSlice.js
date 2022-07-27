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

export const addStats = createAsyncThunk(
    'stats/addStats',
    async (values, {dispatch}) => {
        const records = await scoreCards.create([
            {
              "fields": {
                "name": "Misty",
                "attendance": 2,
                "knowledge": 2,
                "teamwork": 2,
                "tools": 2,
                "sales": 2,
                "date": "2022-07-25",
                "day": "Monday"
              }
            }
          ], function(err, records) {
            if (err) {
              console.error(err);
              return;
            }
            records.forEach(function (record) {
              console.log(record.getId());
            });
          });
        return records;
    }
);


const initialState = {
    statsArray: [],
    playerTotalsArray: [],
    playerMappedArray: [],
    isLoading: true,
    errMsg: ''
};

const statsSlice = createSlice({
    name: 'stats',
    initialState,
    reducers: {
            addLeaderBoardStats: (state, action) => {

        }
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
            state.playerTotalsArray = state.statsArray.map(record => 
                ({
                    name: record.fields.name,
                    score: record.fields.scoreTotal,
                    location: record.fields.teamId,
                    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
                    dt: record.fields.date
                }))
            const details = state.playerTotalsArray
            const output = Object.values(details.reduce((value, object) => {
                if (value[object.name]) {
                   ['score'].forEach(key => value[object.name][key] = value[object.name][key] + object[key]);
                   } else {
                      value[object.name] = { ...object };
                }
                return value;
             }, {}));
            state.playerMappedArray = output

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
export const {addLeaderBoardStats} = statsSlice.actions

export const selectStats = (state) => {
    return state.stats.statsArray;
};

export const getScoreBoardStats = (state) => {
    return state.stats.playerMappedArray;
};

export const selectStatsByName  = (name) => (state) => {
    const stats = state.stats.statsArray.filter(stat => stat.fields.name === name)
    // console.log(stats)
    return stats
};

