import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { CAMPSITES } from '../../app/shared/CAMPSITES'
import { baseUrl } from '../../app/shared/baseUrl';
import { mapImageURL } from '../../utils/mapImageURL';



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
        }
    },
    extraReducers: {
        [fetchStaff.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchStaff.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            state.staffArray = mapImageURL(action.payload);
        },
        [fetchStaff.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = action.error ? action.error.message : 'Fetch failed';
        }
    }
});

export const staffReducer = staffSlice.reducer;

export const { removeStaff} = staffSlice.actions;

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