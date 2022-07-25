import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../app/shared/baseUrl';
import { mapImageURL } from '../../utils/mapImageURL';

var Airtable = require('airtable');
var base = new Airtable({apiKey: 'key7CvA4nWviUYLcP'}).base('appmqv083cLppisF5');
const table = base('Teams');
const team1draft = base('DraftTeam1');
const team2draft = base('DraftTeam2');
const team3draft = base('DraftTeam3');
const draftRecap = base('DraftRecap');

export const draftRecapList = createAsyncThunk(
    'teams/draftRecapList',
    async (staffData) => {
        const records = await draftRecap.create([
            {
              "fields": {
                "name": staffData.fields.name,
                "id": parseInt(staffData.fields.id)
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
        // const data = await response.json();
        // console.log(records)
        return records;
    }
);

export const draftTeam1AirTable = createAsyncThunk(
    'teams/draftTeam1AirTable',
    async (staffData, {dispatch}) => {
        const records = await team1draft.create([
            {
              "fields": {
                "name": staffData.fields.name,
                "id": parseInt(staffData.fields.id)
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
        // const data = await response.json();
        // console.log(records)
        // dispatch(fetchTeam1Air());
        return records;
    }
);

export const draftTeam3AirTable = createAsyncThunk(
    'teams/draftTeam3AirTable',
    async (staffData) => {
        const records = await team3draft.create([
            {
              "fields": {
                "name": staffData.fields.name,
                "id": parseInt(staffData.fields.id)
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
        // const data = await response.json();
        // console.log(records)
        return records;
    }
);

export const draftTeam2AirTable = createAsyncThunk(
    'teams/draftTeam2AirTable',
    async (staffData) => {
        const records = await team2draft.create([
            {
              "fields": {
                "name": staffData.fields.name,
                "id": parseInt(staffData.fields.id)
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
        // const data = await response.json();
        // console.log(records)
        return records;
    }
);



export const undoDraftedTeams = createAsyncThunk(
    'teams/undoDraftedTeams',
    async (id, { dispatch }) => {
        const records = await draftRecap.destroy([id], function(err, deletedRecords) {
            if (err) {
              console.error(err);
              return;
            }
            console.log('Deleted', deletedRecords.length, 'records');
          });
    //   dispatch(undoLastDraftedTeams(id));
      
  }
);


export const undoTeam1 = createAsyncThunk(
    'teams/undoTeam1',
  async (id, { dispatch }) => {
    const records = await team1draft.destroy([id], function(err, deletedRecords) {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Deleted', deletedRecords.length, 'records');
      });
      dispatch(undoDraftTeam1(id));
      
  }
);

export const undoTeam2 = createAsyncThunk(
    'teams/undoTeam2',
  async (id, { dispatch }) => {
    const records = await team2draft.destroy([id], function(err, deletedRecords) {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Deleted', deletedRecords.length, 'records');
      });
      dispatch(undoDraftTeam2(id));
      
  }
);

export const undoTeam3 = createAsyncThunk(
    'teams/undoTeam3',
  async (id, { dispatch }) => {
    const records = await team3draft.destroy([id], function(err, deletedRecords) {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Deleted', deletedRecords.length, 'records');
      });
      dispatch(undoDraftTeam3(id));
      
  }
);

export const fetchDraftRecap= createAsyncThunk(
    'staff/fetchDraftRecap',
    async () => {
        const records = await draftRecap.select({view: 'Grid view'}).firstPage()
        // const data = await response.json();
        // console.log(records)
        return records;
    }
);


export const fetchAirTableTeams = createAsyncThunk(
    'staff/fetchAirTableTeams',
    async () => {
        const records = await table.select({view: 'Grid view'}).firstPage()
        // const data = await response.json();
        // console.log(records)
        return records;
    }
);

export const fetchTeam1Air = createAsyncThunk(
    'teams/fetchTeam1Air',
    async () => {
        const records = await team1draft.select({view: 'Grid view'}).firstPage()
        // const data = await response.json();
        // console.log(records)
        return records;
    }
);

export const fetchTeam2Air = createAsyncThunk(
    'teams/fetchTeam2Air',
    async () => {
        const records = await team2draft.select({view: 'Grid view'}).firstPage()
        // const data = await response.json();
        // console.log(records)
        return records;
    }
);

export const fetchTeam3Air = createAsyncThunk(
    'teams/fetchTeam3Air',
    async () => {
        const records = await team3draft.select({view: 'Grid view'}).firstPage()
        // const data = await response.json();
        // console.log(records)
        return records;
    }
);




const initialState = {
    teamsArray: [],
    draftTeam1Array: [],
    draftTeam2Array: [],
    draftTeam3Array: [],
    isLoading: true,
    loadingDraft: false,
    playerDrafted: false,
    draftedPlayers: [],
    errMsg: ''
};

const teamsSlice = createSlice({
    name: 'teams',
    initialState,
    reducers: {
        removeTeam: (state, action) => {
            state.teamsArray = state.teamsArray.filter(team => team.id != parseInt(action.payload));
        },
        undoDraftTeam1: (state, action) => {
            state.draftTeam1Array = state.draftTeam1Array.filter(team => team.id != action.payload);
            state.playerDrafted = false;
            // state.dratedPlayers = state.dratedPlayers.filter(team => team != parseInt(action.payload));
        },
        undoDraftTeam2: (state, action) => {
            state.draftTeam2Array = state.draftTeam2Array.filter(team => team.id != action.payload);
            // state.dratedPlayers = state.dratedPlayers.filter(team => team != parseInt(action.payload));
        },
        undoDraftTeam3: (state, action) => {
            state.draftTeam3Array = state.draftTeam3Array.filter(team => team.id != action.payload);
            // state.dratedPlayers = state.dratedPlayers.filter(team => team != parseInt(action.payload));
        },
        undoLastDraftedTeams: (state, action) => {
            state.dratedPlayers = state.dratedPlayers.filter(team => team != action.payload);
        },
        setDraftTeam1: (state, action,) => {
            state.draftTeam1Array.push(action.payload)
            state.dratedPlayers.push(action.payload.id)
            // state.playerDrafted = true;
            
        },
        setDraftTeam2: (state, action) => {
            state.draftTeam2Array.push(action.payload)
            state.dratedPlayers.push(action.payload.id)
            
        },
        setDraftTeam3: (state, action) => {
            state.draftTeam3Array.push(action.payload)
            state.dratedPlayers.push(action.payload.id)
            
        },
        setDraftPlayers: (state, action) => {
            state.dratedPlayers.push(action.payload)
            
        },
    },

    

    extraReducers: {
        [fetchDraftRecap.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchDraftRecap.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            const airTableRecords = action.payload
            const newArray = airTableRecords.map(record => record.fields.id)
            state.draftedPlayers = newArray;
        },
        [fetchDraftRecap.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = action.error ? action.error.message : 'Fetch failed';
        },
        [fetchAirTableTeams.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchAirTableTeams.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            const airTableRecords = action.payload
            const newArray = airTableRecords.map(record => ({id: record.id, fields: record.fields}))
            state.teamsArray = newArray;
        },
        [fetchAirTableTeams.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = action.error ? action.error.message : 'Fetch failed';
        },
        [fetchTeam1Air.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchTeam1Air.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            const airTableRecords = action.payload
            const newArray = airTableRecords.map(record => ({id: record.id, fields: record.fields}))
            state.draftTeam1Array = newArray;
        },
        [fetchTeam1Air.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = action.error ? action.error.message : 'Fetch failed';
        },
        [fetchTeam2Air.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchTeam2Air.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            const airTableRecords = action.payload
            const newArray = airTableRecords.map(record => ({id: record.id, fields: record.fields}))
            state.draftTeam2Array = newArray;
        },
        [fetchTeam2Air.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = action.error ? action.error.message : 'Fetch failed';
        },
        [fetchTeam3Air.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchTeam3Air.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            const airTableRecords = action.payload
            const newArray = airTableRecords.map(record => ({id: record.id, fields: record.fields}))
            state.draftTeam3Array = newArray;
        },
        [fetchTeam3Air.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = action.error ? action.error.message : 'Fetch failed';
        },
        [draftTeam1AirTable.pending]: (state) => {
            // state.loadingDraft= true;
        },
        [draftTeam1AirTable.fulfilled]: (state, action) => {
            state.loadingDraft = false;
            state.errMsg = '';
            // state.teamsArray = mapImageURL(action.payload);
            state.dratedPlayers.push(action.payload.id);
        },
        [draftTeam1AirTable.rejected]: (state, action) => {
            state.loadingDraft = false;
            state.errMsg = action.error ? action.error.message : 'Fetch failed';
        },
        [undoTeam1.pending]: (state) => {
            state.loadingDraft= true;
        },
        [undoTeam1.fulfilled]: (state, action) => {
            state.loadingDraft = false;
            state.errMsg = '';
            // state.teamsArray = mapImageURL(action.payload);
        },
        [undoTeam1.rejected]: (state, action) => {
            state.loadingDraft = false;
            state.errMsg = action.error ? action.error.message : 'Fetch failed';
        },
    }
});





export const {undoLastDraftedTeams, setDraftedPlayers, removeTeam, setDraftTeam1, setDraftTeam2, setDraftTeam3, undoDraftTeam1, undoDraftTeam2, undoDraftTeam3} = teamsSlice.actions;


export const teamsReducer = teamsSlice.reducer;

export const selectAllTeams = (state) => {
    return state.teams.teamsArray;
};

export const selectAllDrafted = (state) => {
    return state.teams.draftedPlayers;
};

export const selectAllTeam1 = (state) => {
    return state.teams.draftTeam1Array;
};


export const selectAllTeam2 = (state) => {
    return state.teams.draftTeam2Array
};

export const selectAllTeam3 = (state) => {
    return state.teams.draftTeam3Array;
};

export const selectTeamById = (id) => (state) => {
    return state.teams.teamsArray.find((team) => team.fields.id === parseInt(id));
};

export const deleteTeamById = (id) => (state) => {
    return state.teams.teamsArray.filter((team) => team.id != parseInt(id));
};

export const removeDraftTeam1ById = (id) => (state) => {
    return state.teams.draftTeam1Array.filter((team) => team.id != parseInt(id));
};

export const selectFeaturedTeam= (state) => {
    return {
        featuredItem: state.teams.teamsArray.find(team => team.fields.featured === "true"),
        isLoading: state.teams.isLoading,
        errMsg: state.teams.errMsg
    };
};