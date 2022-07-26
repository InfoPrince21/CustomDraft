import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { CAMPSITES } from '../../app/shared/CAMPSITES'
import { baseUrl } from '../../app/shared/baseUrl';
import { mapImageURL } from '../../utils/mapImageURL';
import { nanoid } from '@reduxjs/toolkit';
import { customAlphabet } from 'nanoid';

var Airtable = require('airtable');
var base = new Airtable({apiKey: 'key7CvA4nWviUYLcP'}).base('appmqv083cLppisF5');
const table = base('Staff');




export const fetchAirTableStaff = createAsyncThunk(
    'staff/fetchAirTableStaff',
    async () => {
        const records = await table.select({view: 'Grid view'}).firstPage()
        const miniRecords = records.map(record => ({id: record.id, fields: record.fields}))
        // const data = await response.json();
        // console.log(records)
        // dispatch(setAirTableStaff(miniRecords));
        return miniRecords;
    }
);

export const addAirTableStaff = createAsyncThunk(
    'staff/addAirTableStaff',
    async (values, {dispatch}) => {
        const nanoid = customAlphabet('1234567890', 4);
        const records = await table.create([
            {
              "fields": {
                "name": values.name,
                "id": parseInt(nanoid()),
                "image": [{
                    "url": "https://dl.airtable.com/.attachmentThumbnails/f115340ec561085e4744c11dbd3e69e1/bc515143"
                }],
                "featured": "false",
                "quote": "Draft Me!",
                "featureInfo": "#1 Ranked Staff"
              }
            }
          ], function(err, records) {
            if (err) {
              console.error(err);
              return;
            }
            records.forEach(function (record) {
            //   console.log(record.getId());
            });
          });
        dispatch(fetchAirTableStaff());
        dispatch(fetchAirTableStaff());
        return records;
    }
);




// export const fetchAirTableStaff = async () => {
        
//     const records = await table.select().firstPage()
//     // console.log(records);

//     // const recordFields= records.find(record => record.fields.name === 'Prince' )
//     // const recordFields= records.find(record => record.fields.id === 222 )
//     console.log(records)
// }


const initialState = {
    staffArray: [],
    isLoading: true,
    errMsg: ''
};

const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {
        removeStaff: (state, action) => {
            state.staffArray = state.staffArray.filter(staff => staff.id != parseInt(action.payload));
        },
        setAddStaff: (state, action) => {
            state.staffArray = state.staffArray.push(action.payload);
        },
        setAirTableStaff: (state, action) => {
            const airTableRecords = action.payload
            state.staffArray = airTableRecords.map(record => ({id: record.id, fields: record.fields}))
        }
    },
    extraReducers: {
        [fetchAirTableStaff.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchAirTableStaff.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            const airTableRecords = action.payload
            const newArray = airTableRecords.map(record => ({id: record.id, fields: record.fields}))
            state.staffArray = newArray;
        },
        [fetchAirTableStaff.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = action.error ? action.error.message : 'Fetch failed';
        }
    }
});

export const staffReducer = staffSlice.reducer;

export const { setAirTableStaff, setAddStaff, removeStaff} = staffSlice.actions;

export const selectAllStaff = (state) => {
    return state.staff.staffArray;
};

export const selectStaffById = (id) => (state) => {
    return state.staff.staffArray.find((staff) => staff.fields.id === parseInt(id));
};

export const selectFeaturedStaff = (state) => {
    return {
        featuredItem: state.staff.staffArray.find(staff => staff.fields.featured === "true"),
        isLoading: state.teams.isLoading,
        errMsg: state.teams.errMsg
    };
};


