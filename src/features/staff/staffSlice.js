import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { CAMPSITES } from '../../app/shared/CAMPSITES'
import { baseUrl } from '../../app/shared/baseUrl';
import { mapImageURL } from '../../utils/mapImageURL';

var Airtable = require('airtable');
var base = new Airtable({apiKey: 'key7CvA4nWviUYLcP'}).base('appmqv083cLppisF5');
const table = base('Staff');


export const addStaff = createAsyncThunk(
    'teams/addStaff',
  async (staffMember, { dispatch }) => {
      const response = await fetch(
          (baseUrl + 'staff'),
          {
            method: 'POST',
            body: JSON.stringify(staffMember),
            headers: { 'Content-Type': 'application/json' }
        }
      );
      if(!response.ok) {
          return Promise.reject('Unable to fetch, status: ' + response.status);
      }
      const data = await response.json();
    //   dispatch(setAddStaff(staffMember))
        dispatch(fetchStaff())
      
  }
);

export const deleteStaff = createAsyncThunk(
    'staff/deleteStaff',
  async (id, { dispatch }) => {
      const response = await fetch(
          (baseUrl + 'staff/' + id),
          {
              method: 'DELETE'
          }
      );
      if(!response.ok) {
          return Promise.reject('Unable to fetch, status: ' + response.status);
      }
      dispatch(removeStaff(id));
  }
);

export const fetchStaff = createAsyncThunk(
    'staff/fetchStaff',
    async () => {
        const response = await fetch(baseUrl + 'staff');
        if (!response.ok) {
            return Promise.reject('Unable to fetch, status: ' + response.status);
        }
        const data = await response.json();
        return data;
    }
);

export const fetchAirTableStaff = createAsyncThunk(
    'staff/fetchAirTableStaff',
    async () => {
        const records = await table.select({view: 'Grid view'}).firstPage()
        // const data = await response.json();
        // console.log(records)
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
        }
    },
    extraReducers: {
        [fetchAirTableStaff.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchAirTableStaff.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            state.staffArray = action.payload;
        },
        [fetchAirTableStaff.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = action.error ? action.error.message : 'Fetch failed';
        },
        [fetchStaff.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchStaff.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            // state.staffArray = mapImageURL(action.payload);
        },
        [fetchStaff.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = action.error ? action.error.message : 'Fetch failed';
        },
        [addStaff.pending]: (state) => {
            state.isLoading = true;
        },
        [addStaff.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            // state.staffArray = state.staffArray.push(action.payload);
        },
        [addStaff.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = action.error ? action.error.message : 'Fetch failed';
        }
    }
});

export const staffReducer = staffSlice.reducer;

export const { setAddStaff, removeStaff} = staffSlice.actions;

export const selectAllStaff = (state) => {
    return state.staff.staffArray;
};

export const selectStaffById = (id) => (state) => {
    return state.staff.staffArray.find((staff) => staff.id === parseInt(id));
};

export const selectFeaturedStaff = (state) => {
    return {
        featuredItem: state.staff.staffArray.find(
            (staff) => staff.featured
            ),
        isLoading: state.staff.isLoading,
        errMsg: state.staff.errMsg
    };
};